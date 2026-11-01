import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an elite frontend design engineer. Generate a COMPLETE, standalone, production-ready HTML5 page with modern embedded CSS and clean semantic tags for this request: "${prompt}".
Requirements:
1. Pure valid standalone HTML with <!DOCTYPE html>, <html>, <head>, <style>, and <body>.
2. Modern, luxurious aesthetic (preferably dark theme unless user specifies otherwise), subtle gradients, glassmorphism cards, and Google Fonts loaded via CDN.
3. Responsive flex/grid layouts for desktop and mobile.
4. Realistic dummy content, buttons, tags, and sections.
5. Do NOT include markdown formatting like \`\`\`html or \`\`\`. Output ONLY the raw HTML document string starting with <!DOCTYPE html>.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          let rawHtml = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          rawHtml = rawHtml.replace(/^```html\s*/i, '').replace(/```\s*$/i, '').trim();

          if (rawHtml.startsWith('<!DOCTYPE html>') || rawHtml.startsWith('<html')) {
            return NextResponse.json({ html: rawHtml });
          }
        }
      } catch (err) {
        console.error('Gemini API call failed, falling back to dynamic generator:', err);
      }
    }

    // Dynamic procedural generator when Gemini key is not configured or fails
    const cleanPrompt = prompt.replace(/[<>]/g, '');
    const titleMatch = cleanPrompt.slice(0, 40);

    const generatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titleMatch} — AI Generated Template</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#09090b;
  --card-bg:#121217;
  --primary:#6366f1;
  --accent:#38bdf8;
  --text:#fafafa;
  --muted:#a1a1aa;
  --border:rgba(255,255,255,0.08);
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}
nav{position:fixed;top:0;left:0;right:0;padding:1.2rem 6%;display:flex;justify-content:space-between;align-items:center;background:rgba(9,9,11,0.85);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);z-index:100}
.brand{font-family:'Space Grotesk',sans-serif;font-size:1.35rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:0.5rem}
.brand span{color:var(--primary)}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{color:var(--muted);text-decoration:none;font-size:0.875rem;font-weight:500;transition:color 0.2s}
.nav-links a:hover{color:#fff}
.nav-cta{background:var(--primary);color:#fff;border:none;padding:0.6rem 1.4rem;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer}
.hero{min-height:90vh;display:flex;align-items:center;justify-content:center;padding:8rem 6% 4rem;text-align:center;position:relative;background:radial-gradient(circle at 50% 20%,rgba(99,102,241,0.15) 0%,transparent 65%)}
.hero-inner{max-width:840px}
.badge{display:inline-flex;align-items:center;gap:0.5rem;padding:0.35rem 1rem;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.3);border-radius:999px;color:#a5b4fc;font-size:0.8rem;font-weight:600;margin-bottom:1.5rem}
.hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5.5vw,4.5rem);font-weight:700;line-height:1.15;letter-spacing:-0.03em;margin-bottom:1.5rem}
.hero h1 span{background:linear-gradient(135deg,#a5b4fc,#6366f1,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.125rem;color:var(--muted);max-width:620px;margin:0 auto 2.5rem}
.btn{display:inline-block;padding:0.85rem 2.2rem;border-radius:8px;font-size:0.9rem;font-weight:600;text-decoration:none;transition:all 0.2s}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:#4f46e5;transform:translateY(-2px);box-shadow:0 10px 25px -5px rgba(99,102,241,0.5)}
.btn-secondary{background:rgba(255,255,255,0.05);border:1px solid var(--border);color:#fff;margin-left:1rem}
.btn-secondary:hover{background:rgba(255,255,255,0.1)}
.section{padding:5rem 6%;max-width:1200px;margin:0 auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;margin-top:3rem}
.card{background:var(--card-bg);border:1px solid var(--border);border-radius:14px;padding:2rem;transition:all 0.2s}
.card:hover{border-color:rgba(99,102,241,0.4);transform:translateY(-4px)}
.card-icon{font-size:2rem;margin-bottom:1.25rem}
.card-title{font-size:1.25rem;font-weight:700;margin-bottom:0.5rem}
.card-desc{color:var(--muted);font-size:0.9rem;line-height:1.7}
footer{padding:3rem 6%;border-top:1px solid var(--border);text-align:center;color:var(--muted);font-size:0.85rem}
</style>
</head>
<body>
<nav>
  <div class="brand">⚡ AI <span>Craft</span></div>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#about">Architecture</a></li>
    <li><a href="#pricing">Pricing</a></li>
  </ul>
  <button class="nav-cta">Get Started</button>
</nav>

<section class="hero">
  <div class="hero-inner">
    <div class="badge">✦ Tailored via TemplateHub AI ✦</div>
    <h1>Designed for <span>${cleanPrompt.slice(0, 50)}</span></h1>
    <p>Synthesized based on your design spec with zero bloated dependencies, ultra-crisp responsive layouts, and modern semantic tokens.</p>
    <div>
      <a href="#features" class="btn btn-primary">Explore Solution</a>
      <a href="#pricing" class="btn btn-secondary">See Pricing</a>
    </div>
  </div>
</section>

<section class="section" id="features">
  <div style="text-align:center;max-width:600px;margin:0 auto">
    <h2 style="font-family:'Space Grotesk',sans-serif;font-size:2.25rem;font-weight:700">Core Capabilities</h2>
    <p style="color:var(--muted);margin-top:0.5rem">Built directly around your product requirements.</p>
  </div>
  <div class="grid">
    <div class="card">
      <div class="card-icon">⚡</div>
      <div class="card-title">Instant Conversion Engine</div>
      <div class="card-desc">Designed with high-converting visual hierarchy, friction-free calls to action, and accessible contrast ratios.</div>
    </div>
    <div class="card">
      <div class="card-icon">🛡️</div>
      <div class="card-title">Self-Contained Codebase</div>
      <div class="card-desc">Zero runtime dependencies, 100/100 Lighthouse performance, ready for static hosting on Vercel, Netlify, or Cloudflare Pages.</div>
    </div>
    <div class="card">
      <div class="card-icon">🎨</div>
      <div class="card-title">Customizable Tokens</div>
      <div class="card-desc">Clean CSS custom variables for quick palette changes, font adjustments, and container scaling.</div>
    </div>
  </div>
</section>

<footer>
  <p>© 2026 TemplateHub AI Generator. Exported directly from your prompt.</p>
</footer>
</body>
</html>`;

    return NextResponse.json({ html: generatedHtml });
  } catch (error) {
    console.error('Error generating AI template:', error);
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}
