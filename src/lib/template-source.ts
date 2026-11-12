import fs from 'fs/promises';
import path from 'path';
import { templates } from '@/data/templates';

/**
 * Template source files live in /templates-src, outside /public, so they are
 * never served directly. Visitors see a watermarked preview (/preview/[id]);
 * members with the right plan get the clean file via /api/template-source.
 */
const SOURCE_DIR = path.join(process.cwd(), 'templates-src');

export function findTemplate(id: string | null | undefined) {
  if (!id) return undefined;
  return templates.find((t) => t.id === id);
}

export async function readTemplateHtml(id: string): Promise<string | null> {
  // Only ids from our own catalogue are allowed, so no path traversal is possible.
  if (!findTemplate(id)) return null;
  try {
    return await fs.readFile(path.join(SOURCE_DIR, id, 'index.html'), 'utf8');
  } catch {
    return null;
  }
}

/** Adds a noindex tag, a licence notice and a small "Preview" ribbon. */
export function watermarkPreview(html: string, id: string, siteUrl: string): string {
  const notice = `<!--
  ${id} — TemplateHub preview copy. Not licensed for use.
  Get the licensed source at ${siteUrl}/templates/${id}
-->\n`;
  const head = `<meta name="robots" content="noindex, nofollow">`;
  const ribbon = `
<a id="th-preview-ribbon" href="${siteUrl}/templates/${id}" target="_top" rel="noopener"
   style="position:fixed;right:12px;bottom:12px;z-index:2147483647;display:none;align-items:center;gap:6px;min-height:44px;padding:8px 14px;border-radius:999px;background:rgba(17,8,40,.92);color:#fff;font:600 12px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;text-decoration:none;border:1px solid rgba(168,85,247,.6);box-shadow:0 4px 18px rgba(0,0,0,.35)">
  Preview · Get this template on TemplateHub →
</a>
<script>
  // Hidden inside our own site's preview frames; shown when the file is opened on its own.
  (function(){var r=document.getElementById('th-preview-ribbon');if(!r)return;var framed=false;try{framed=window.top!==window.self}catch(e){framed=true}if(!framed)r.style.display='inline-flex';})();
</script>\n`;

  // Notice goes inside <head>: a comment before <!DOCTYPE> can trigger quirks mode in old browsers.
  let out = /<head[^>]*>/i.test(html)
    ? html.replace(/<head([^>]*)>/i, (m) => `${m}\n${notice}${head}`)
    : notice + html;
  out = /<\/body>/i.test(out) ? out.replace(/<\/body>/i, `${ribbon}</body>`) : out + ribbon;
  return out;
}
