import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * Form endpoint for sites built with TemplateHub templates.
 *
 *   <form action="https://www.templatehub.website/api/forms/submit?to=you@example.com" method="POST">
 *
 * Submissions are emailed to `to` with Resend. To stop the endpoint being used
 * to spam strangers, `to` must be the email address of a TemplateHub account.
 *
 * Env: RESEND_API_KEY (required to send), FORMS_FROM_EMAIL (a sender on a
 * domain verified in Resend, e.g. "TemplateHub Forms <forms@templatehub.website>").
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_FIELDS = 30;
const MAX_FIELD_LENGTH = 5000;
const RATE_LIMIT = 5; // submissions per IP…
const RATE_WINDOW_MS = 60_000; // …per minute
const HONEYPOT_FIELDS = ['_gotcha', '_honeypot', 'website_url'];

// Best-effort per-instance rate limiting (serverless instances don't share memory).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

// Cache of addresses we've confirmed belong to a TemplateHub account.
const verifiedRecipients = new Map<string, number>();
async function isRegisteredEmail(email: string): Promise<boolean> {
  const cached = verifiedRecipients.get(email);
  if (cached && Date.now() - cached < 10 * 60_000) return true;
  try {
    const clerk = await clerkClient();
    const res = await clerk.users.getUserList({ emailAddress: [email], limit: 1 });
    if (res.data.length > 0) {
      verifiedRecipients.set(email, Date.now());
      return true;
    }
  } catch (err) {
    console.error('[forms] recipient lookup failed:', err);
  }
  return false;
}

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function safeRedirect(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function wantsHtml(req: Request): boolean {
  const accept = req.headers.get('accept') || '';
  return accept.includes('text/html') && !accept.includes('application/json');
}

function respond(req: Request, status: number, message: string, redirect: string | null, ok: boolean) {
  if (ok && redirect) {
    return NextResponse.redirect(redirect, { status: 303, headers: CORS });
  }
  if (wantsHtml(req)) {
    const back = req.headers.get('referer');
    const page = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${ok ? 'Message sent' : 'Message not sent'}</title>
<style>body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f7f7fb;color:#18181b}main{max-width:420px;padding:32px;text-align:center}h1{font-size:1.5rem;margin:0 0 .5rem}p{color:#52525b;line-height:1.6}a{color:#7c3aed}</style></head>
<body><main><h1>${ok ? 'Thanks — your message was sent.' : 'Sorry, your message could not be sent.'}</h1><p>${escapeHtml(message)}</p>${back && safeRedirect(back) ? `<p><a href="${escapeHtml(back)}">← Go back</a></p>` : ''}</main></body></html>`;
    return new NextResponse(page, { status, headers: { ...CORS, 'Content-Type': 'text/html; charset=utf-8' } });
  }
  return NextResponse.json(ok ? { success: true, message } : { success: false, error: message }, { status, headers: CORS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const to = (url.searchParams.get('to') || '').trim().toLowerCase();
  const redirect = safeRedirect(url.searchParams.get('redirect'));
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';

  if (rateLimited(ip)) {
    return respond(req, 429, 'Too many messages. Please wait a minute and try again.', null, false);
  }

  if (!EMAIL_RE.test(to)) {
    return respond(req, 400, 'This form has no valid recipient address.', null, false);
  }

  // Parse the submission.
  const fields: Record<string, string> = {};
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      for (const [k, v] of Object.entries(body ?? {})) fields[k] = String(v ?? '');
    } else {
      const data = await req.formData();
      data.forEach((v, k) => {
        if (typeof v === 'string') fields[k] = v;
      });
    }
  } catch {
    return respond(req, 400, 'The form data could not be read.', null, false);
  }

  // Bots fill hidden honeypot fields; pretend it worked so they move on.
  if (HONEYPOT_FIELDS.some((f) => fields[f])) {
    return respond(req, 200, 'Message received.', redirect, true);
  }
  HONEYPOT_FIELDS.forEach((f) => delete fields[f]);

  const entries = Object.entries(fields).slice(0, MAX_FIELDS);
  if (entries.length === 0) {
    return respond(req, 400, 'The form was empty.', null, false);
  }
  if (entries.some(([, v]) => v.length > MAX_FIELD_LENGTH)) {
    return respond(req, 413, 'One of the fields is too long.', null, false);
  }

  if (!(await isRegisteredEmail(to))) {
    return respond(
      req,
      403,
      `This form isn't connected yet. The site owner needs a free ${SITE_NAME} account using this email address.`,
      null,
      false
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORMS_FROM_EMAIL || `${SITE_NAME} Forms <forms@templatehub.website>`;
  if (!apiKey) {
    console.error('[forms] RESEND_API_KEY is not set — submission not delivered.');
    return respond(req, 503, 'The form service is temporarily unavailable. Please try again later.', null, false);
  }

  const origin = req.headers.get('origin') || req.headers.get('referer') || 'unknown site';
  const replyTo = Object.entries(fields).find(([k, v]) => /e-?mail/i.test(k) && EMAIL_RE.test(v.trim()))?.[1].trim();
  const subjectField = fields.subject || fields._subject;
  const subject = (subjectField ? `New message: ${subjectField}` : `New form submission from ${origin}`).slice(0, 150);

  const rows = entries
    .filter(([k]) => !k.startsWith('_'))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e4e4e7;font-weight:600;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 12px;border:1px solid #e4e4e7;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
    )
    .join('');
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#18181b">
<p>You have a new form submission from <strong>${escapeHtml(origin)}</strong>.</p>
<table style="border-collapse:collapse;font-size:14px">${rows}</table>
<p style="color:#71717a;font-size:12px;margin-top:24px">Sent by ${SITE_NAME} Forms · <a href="${SITE_URL}">${SITE_URL.replace('https://', '')}</a>${replyTo ? ' · Reply to this email to answer the sender.' : ''}</p>
</div>`;
  const text = entries
    .filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) {
      console.error('[forms] Resend error:', res.status, await res.text());
      return respond(req, 502, 'The message could not be delivered. Please try again later.', null, false);
    }
  } catch (err) {
    console.error('[forms] Resend request failed:', err);
    return respond(req, 502, 'The message could not be delivered. Please try again later.', null, false);
  }

  return respond(req, 200, 'The site owner will get back to you soon.', redirect, true);
}
