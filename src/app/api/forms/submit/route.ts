import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const toEmail = url.searchParams.get('to') || 'notifications@templatehub.website';
    const redirectUrl = url.searchParams.get('redirect');

    let formData: Record<string, any> = {};

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      formData = await req.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const data = await req.formData();
      data.forEach((val, key) => {
        formData[key] = val.toString();
      });
    } else {
      // Fallback text parser
      const text = await req.text();
      try {
        formData = JSON.parse(text);
      } catch {
        formData = { raw: text };
      }
    }

    // Capture submission metadata
    const submission = {
      timestamp: new Date().toISOString(),
      recipient: toEmail,
      fields: formData,
      origin: req.headers.get('origin') || 'direct',
      userAgent: req.headers.get('user-agent') || 'unknown',
    };

    console.log('[TemplateHub Form Gateway] Submission received:', JSON.stringify(submission));

    // If a redirect URL is specified by the form creator, redirect back
    // Only follow absolute http(s) redirects so the endpoint can't be abused
    // to bounce visitors to javascript: or other schemes.
    let safeRedirect: string | null = null;
    if (redirectUrl) {
      try {
        const parsed = new URL(redirectUrl);
        if (parsed.protocol === 'https:' || parsed.protocol === 'http:') safeRedirect = parsed.toString();
      } catch {
        safeRedirect = null;
      }
    }

    if (safeRedirect) {
      return NextResponse.redirect(safeRedirect, {
        status: 303,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Submission successfully received by TemplateHub Sovereign Form Gateway',
        recipient: toEmail,
        receivedFields: Object.keys(formData),
        timestamp: submission.timestamp,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    console.error('[TemplateHub Form Gateway] Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to process form submission' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
