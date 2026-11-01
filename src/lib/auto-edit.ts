export interface StoreProduct {
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
}

export interface StoreData {
  storeName: string;
  industry: string;
  tagline: string;
  subheadline: string;
  primaryColor: string;
  logoUrl?: string;
  heroImageUrl?: string;
  contactEmail: string;
  contactPhone: string;
  physicalAddress: string;
  products: StoreProduct[];
}

export const DEFAULT_STORE_DATA: StoreData = {
  storeName: 'AeroCraft Precision Labs',
  industry: 'Industrial Design & Prototyping',
  tagline: 'High-Tolerance Aerospace Components & Custom Robotics',
  subheadline: 'Sub-micron CNC machining, additive titanium printing, and rapid prototype turnarounds for frontier engineering teams.',
  primaryColor: '#6366f1',
  contactEmail: 'engineering@aerocraftlabs.com',
  contactPhone: '+1 (800) 452-9901',
  physicalAddress: '104 Innovation Way, Suite 400, Austin, TX',
  products: [
    {
      name: 'Titanium Lattice Bracket',
      price: '$450.00',
      description: 'Generatively designed DMLS titanium load-bearing bracket with 40% weight reduction.',
    },
    {
      name: 'Ceramic Turbine Nozzle',
      price: '$1,200.00',
      description: 'Silicon carbide refractory component rated for 1,650°C continuous combustion environments.',
    },
    {
      name: 'Precision Harmonic Drive',
      price: '$850.00',
      description: 'Zero-backlash robotic joint actuator with integrated 19-bit optical absolute encoder.',
    },
  ],
};

/**
 * Injects user's custom store metadata and pictures into raw template HTML
 */
export function injectStoreDataIntoHtml(rawHtml: string, data: StoreData): string {
  let html = rawHtml;

  // 1. Update <title>
  if (data.storeName && data.tagline) {
    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(data.storeName)} — ${escapeHtml(data.tagline)}</title>`
    );
  }

  // 2. Inject Brand Styles into <head>
  const customStyles = `
  <!-- TemplateHub Auto-Edit Engine Override -->
  <style id="templatehub-brand-override">
    :root {
      --primary: ${data.primaryColor} !important;
      --gold: ${data.primaryColor} !important;
      --cyan: ${data.primaryColor} !important;
      --teal: ${data.primaryColor} !important;
      --magenta: ${data.primaryColor} !important;
      --red: ${data.primaryColor} !important;
      --accent: ${data.primaryColor} !important;
    }
    .btn-gold, .btn-race, .btn-teal, .btn-neon, .btn-magenta, .btn-primary, .btn-minimal, button.btn {
      background: ${data.primaryColor} !important;
      border-color: ${data.primaryColor} !important;
      color: #ffffff !important;
    }
    ${data.heroImageUrl ? `
    .hero, section.hero {
      background-image: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('${data.heroImageUrl}') !important;
      background-size: cover !important;
      background-position: center !important;
    }
    ` : ''}
  </style>
  `;

  if (html.includes('</head>')) {
    html = html.replace('</head>', `${customStyles}\n</head>`);
  } else {
    html = customStyles + html;
  }

  // 3. Replace First Headline <h1>
  if (data.tagline) {
    html = html.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/i, (match) => {
      // Preserve h1 attributes
      const openTag = match.match(/<h1[^>]*>/i)?.[0] || '<h1>';
      return `${openTag}${escapeHtml(data.tagline)}</h1>`;
    });
  }

  // 4. Replace Primary Hero Subtitle
  if (data.subheadline) {
    // Replace the first paragraph inside hero or first significant paragraph
    let replacedSub = false;
    html = html.replace(/(<section[^>]*hero[^>]*>[\s\S]*?)(<p[^>]*>)([\s\S]*?)(<\/p>)/i, (match, before, pOpen, oldText, pClose) => {
      replacedSub = true;
      return `${before}${pOpen}${escapeHtml(data.subheadline)}${pClose}`;
    });

    if (!replacedSub) {
      html = html.replace(/<p[^>]*class="[^"]*(?:hero-p|hero-desc|sub|section-subtitle)[^"]*"[^>]*>([\s\S]*?)<\/p>/i, (match) => {
        const pOpen = match.match(/<p[^>]*>/i)?.[0] || '<p>';
        return `${pOpen}${escapeHtml(data.subheadline)}</p>`;
      });
    }
  }

  // 5. Replace Brand Logo Text in Nav
  if (data.storeName) {
    html = html.replace(/(class="[^"]*(?:logo|brand)[^"]*"[^>]*>)([\s\S]*?)(<\/a>)/i, (match, openTag, oldLogo, closeTag) => {
      let logoContent = escapeHtml(data.storeName);
      if (data.logoUrl) {
        logoContent = `<img src="${data.logoUrl}" alt="${escapeHtml(data.storeName)}" style="height: 32px; vertical-align: middle; margin-right: 8px; border-radius: 6px;"> ${logoContent}`;
      }
      return `${openTag}${logoContent}${closeTag}`;
    });
  }

  // 6. Replace Products / Cards (if template contains cards)
  if (data.products && data.products.length > 0) {
    let productIndex = 0;
    html = html.replace(/<h3[^>]*class="[^"]*(?:title|name|card-title|product-name|mission-title|spec-title)[^"]*"[^>]*>([\s\S]*?)<\/h3>/gi, (match) => {
      if (productIndex < data.products.length) {
        const prod = data.products[productIndex];
        productIndex++;
        const openTag = match.match(/<h3[^>]*>/i)?.[0] || '<h3>';
        return `${openTag}${escapeHtml(prod.name)}</h3>`;
      }
      return match;
    });

    // Replace prices if available
    let priceIndex = 0;
    html = html.replace(/<(?:span|div)[^>]*class="[^"]*(?:price|price-tag|product-price|cost)[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div)>/gi, (match) => {
      if (priceIndex < data.products.length) {
        const prod = data.products[priceIndex];
        priceIndex++;
        const openTag = match.match(/<(?:span|div)[^>]*>/i)?.[0] || '<span>';
        const closeTag = match.startsWith('<div') ? '</div>' : '</span>';
        return `${openTag}${escapeHtml(prod.price)}${closeTag}`;
      }
      return match;
    });
  }

  // 7. Inject Contact Info into Footer
  if (data.contactEmail || data.physicalAddress || data.contactPhone) {
    const contactBlock = `
    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; opacity: 0.8; font-family: sans-serif;">
      ${data.storeName ? `<strong>${escapeHtml(data.storeName)}</strong><br>` : ''}
      ${data.physicalAddress ? `📍 ${escapeHtml(data.physicalAddress)}<br>` : ''}
      ${data.contactEmail ? `✉️ ${escapeHtml(data.contactEmail)} &nbsp;·&nbsp; ` : ''}
      ${data.contactPhone ? `📞 ${escapeHtml(data.contactPhone)}` : ''}
    </div>
    `;

    if (html.includes('</footer>')) {
      html = html.replace('</footer>', `${contactBlock}</footer>`);
    }
  }

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
