// Generates the static Rilux site into ./public. Run: node build.js
// Edit SITE below, re-run, then redeploy.
const fs = require("fs");
const path = require("path");

const SITE = {
  brand: "Rilux",
  legalName: "Rilux Pvt Ltd",
  email: "[SUPPORT_EMAIL]",
  phone: "[SUPPORT_PHONE]",
  address: "[REGISTERED_ADDRESS, City, State - PIN]",
  hours: "Monday to Saturday, 10:00 AM – 6:00 PM IST",
  grievanceOfficer: "[GRIEVANCE_OFFICER_NAME]",
  lastUpdated: "14 October 2026",
  returnDays: 7,
  freeShippingAbove: 999,
  shippingFee: 79,
};

const PRODUCTS = [
  { name: "Classic Cotton Crew Tee", cat: "Men", price: 599, mrp: 899, shape: "tee", color: "#e8e1d6" },
  { name: "Oversized Graphic Tee", cat: "Unisex", price: 799, mrp: 1199, shape: "tee", color: "#2f3a4a" },
  { name: "Linen Casual Shirt", cat: "Men", price: 1299, mrp: 1799, shape: "shirt", color: "#c9d6c3" },
  { name: "Everyday Pullover Hoodie", cat: "Unisex", price: 1799, mrp: 2499, shape: "hoodie", color: "#8a6f5a" },
  { name: "Women's Ribbed Top", cat: "Women", price: 699, mrp: 999, shape: "tee", color: "#e7c6c0" },
  { name: "Slim Fit Chinos", cat: "Men", price: 1499, mrp: 1999, shape: "pants", color: "#b9a58a" },
  { name: "Relaxed Denim Jeans", cat: "Women", price: 1999, mrp: 2699, shape: "pants", color: "#5b7193" },
  { name: "Cotton Straight Kurta", cat: "Women", price: 1199, mrp: 1599, shape: "shirt", color: "#d9b77a" },
];

const SHAPES = {
  tee: '<path d="M38 18 L22 26 L12 44 L24 50 L30 42 L30 92 L70 92 L70 42 L76 50 L88 44 L78 26 L62 18 Q50 28 38 18 Z"/>',
  shirt: '<path d="M38 16 L22 24 L14 60 L26 62 L30 40 L30 94 L70 94 L70 40 L74 62 L86 60 L78 24 L62 16 L50 30 Z"/><path d="M50 30 L50 94" stroke="rgba(0,0,0,.18)" stroke-width="1.5" fill="none"/>',
  hoodie: '<path d="M36 22 Q50 4 64 22 L80 30 L90 70 L78 72 L72 46 L72 94 L28 94 L28 46 L22 72 L10 70 L20 30 Z"/><rect x="38" y="66" width="24" height="12" rx="3" fill="rgba(0,0,0,.15)"/>',
  pants: '<path d="M30 10 L70 10 L76 94 L56 94 L50 40 L44 94 L24 94 Z"/>',
};

const inr = (n) => "₹" + n.toLocaleString("en-IN");

const NAV = [
  ["index.html", "Home"],
  ["shop.html", "Shop"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

const POLICIES = [
  ["privacy-policy.html", "Privacy Policy"],
  ["terms.html", "Terms & Conditions"],
  ["refund-policy.html", "Refund & Cancellation"],
  ["shipping-policy.html", "Shipping & Delivery"],
];

function layout(file, title, body) {
  const nav = NAV.map(([h, t]) => `<a href="${h}"${h === file ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  const pol = POLICIES.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | ${SITE.brand}</title>
<meta name="description" content="${SITE.brand} – everyday clothing for men and women, made in India.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="logo" href="index.html">RILUX</a>
    <nav class="nav">${nav}</nav>
  </div>
</header>
<main>
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <div class="logo">RILUX</div>
      <p class="muted">Everyday clothing, thoughtfully made.<br>Operated by ${SITE.legalName}.</p>
    </div>
    <div>
      <h4>Shop</h4>
      <ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h4>Policies</h4>
      <ul>${pol}</ul>
    </div>
    <div>
      <h4>Contact</h4>
      <ul class="muted">
        <li>${SITE.email}</li>
        <li>${SITE.phone}</li>
        <li>${SITE.address}</li>
      </ul>
    </div>
  </div>
  <div class="wrap copyright muted">© 2026 ${SITE.legalName}. All rights reserved.</div>
</footer>
</body>
</html>
`;
}

function productCard(p) {
  return `<article class="card">
  <div class="card-img" style="--tile:${p.color}">
    <svg viewBox="0 0 100 100" aria-hidden="true" fill="${p.color}">${SHAPES[p.shape]}</svg>
  </div>
  <div class="card-body">
    <span class="tag">${p.cat}</span>
    <h3>${p.name}</h3>
    <div class="price"><strong>${inr(p.price)}</strong> <s>${inr(p.mrp)}</s></div>
    <button class="btn btn-block" type="button">Buy Now</button>
  </div>
</article>`;
}

function policyPage(title, sections) {
  const body = sections
    .map(([h, html]) => `<h2>${h}</h2>\n${html}`)
    .join("\n");
  return `<section class="page-head"><div class="wrap"><h1>${title}</h1><p class="muted">Last updated: ${SITE.lastUpdated}</p></div></section>
<section class="wrap prose">
${body}
</section>`;
}

const contactBlock = `<ul>
<li><strong>Business name:</strong> ${SITE.legalName}</li>
<li><strong>Email:</strong> ${SITE.email}</li>
<li><strong>Phone:</strong> ${SITE.phone}</li>
<li><strong>Address:</strong> ${SITE.address}</li>
</ul>`;

const pages = {
  "index.html": [
    "Everyday Clothing",
    `<section class="hero">
  <div class="wrap hero-inner">
    <div>
      <p class="eyebrow">New Season Collection</p>
      <h1>Comfort you can wear every day.</h1>
      <p class="lead">Breathable cotton tees, easy shirts and relaxed bottoms for men and women. Designed and sold in India.</p>
      <a class="btn" href="shop.html">Shop the collection</a>
    </div>
    <div class="hero-art">
      ${PRODUCTS.slice(0, 4).map((p) => `<div class="hero-tile" style="--tile:${p.color}"><svg viewBox="0 0 100 100" fill="${p.color}">${SHAPES[p.shape]}</svg></div>`).join("")}
    </div>
  </div>
</section>
<section class="wrap perks">
  <div><strong>Free shipping</strong><span class="muted">On orders above ${inr(SITE.freeShippingAbove)}</span></div>
  <div><strong>${SITE.returnDays}-day returns</strong><span class="muted">Easy, no-questions returns</span></div>
  <div><strong>Secure payments</strong><span class="muted">UPI, cards, net banking</span></div>
</section>
<section class="wrap section">
  <div class="section-head"><h2>Bestsellers</h2><a href="shop.html">View all →</a></div>
  <div class="grid">${PRODUCTS.slice(0, 4).map(productCard).join("")}</div>
</section>`,
  ],

  "shop.html": [
    "Shop",
    `<section class="page-head"><div class="wrap"><h1>Shop All</h1><p class="muted">${PRODUCTS.length} products · Prices inclusive of GST</p></div></section>
<section class="wrap section">
  <div class="grid">${PRODUCTS.map(productCard).join("")}</div>
</section>`,
  ],

  "about.html": [
    "About Us",
    `<section class="page-head"><div class="wrap"><h1>About Rilux</h1></div></section>
<section class="wrap prose">
<p>${SITE.brand} is an Indian clothing brand operated by <strong>${SITE.legalName}</strong>. We make everyday essentials — t-shirts, shirts, hoodies, kurtas, chinos and denim — for men and women who want clothes that feel good and last.</p>
<h2>What we believe</h2>
<p>Good basics shouldn't be complicated or expensive. We focus on comfortable fabrics, honest pricing and fits that work for real people.</p>
<h2>How we work</h2>
<p>We sell directly to customers through this website, which lets us keep prices fair. Every order is checked before dispatch, and our support team is available ${SITE.hours} to help with sizing, orders and returns.</p>
<h2>Get in touch</h2>
<p>Questions or feedback? Visit our <a href="contact.html">Contact page</a> — we'd love to hear from you.</p>
</section>`,
  ],

  "contact.html": [
    "Contact Us",
    `<section class="page-head"><div class="wrap"><h1>Contact Us</h1><p class="muted">We usually reply within 24 hours on working days.</p></div></section>
<section class="wrap contact-grid">
  <div class="prose">
    <h2>Customer Support</h2>
    ${contactBlock}
    <p><strong>Support hours:</strong> ${SITE.hours}</p>
  </div>
  <form class="contact-form" onsubmit="event.preventDefault(); this.querySelector('.form-note').hidden = false; this.reset();">
    <label>Name<input name="name" required></label>
    <label>Email<input name="email" type="email" required></label>
    <label>Order ID (optional)<input name="order"></label>
    <label>Message<textarea name="message" rows="5" required></textarea></label>
    <button class="btn" type="submit">Send message</button>
    <p class="form-note muted" hidden>Thanks! We'll get back to you soon.</p>
  </form>
</section>`,
  ],

  "privacy-policy.html": [
    "Privacy Policy",
    policyPage("Privacy Policy", [
      ["Introduction", `<p>This Privacy Policy explains how ${SITE.legalName} ("${SITE.brand}", "we", "us") collects, uses and protects your information when you visit or make a purchase from this website. By using the website, you agree to this policy.</p>`],
      ["Information we collect", `<ul>
<li><strong>Personal details:</strong> name, email address, phone number, shipping and billing address when you place an order or contact us.</li>
<li><strong>Order information:</strong> products purchased, order value and transaction references.</li>
<li><strong>Technical data:</strong> IP address, browser type, device information and pages visited, collected through cookies and similar technologies.</li>
</ul>`],
      ["Payment information", `<p>Payments are processed by our payment partner, Razorpay. We do not store your card, UPI or net banking credentials on our servers. Payment data is handled by Razorpay in accordance with PCI-DSS standards and its own privacy policy.</p>`],
      ["How we use your information", `<ul>
<li>To process, ship and deliver your orders</li>
<li>To send order confirmations, updates and respond to support requests</li>
<li>To process refunds and returns</li>
<li>To prevent fraud and keep the website secure</li>
<li>To send promotional messages, only if you opt in (you can unsubscribe anytime)</li>
</ul>`],
      ["Sharing of information", `<p>We do not sell your personal data. We share it only with trusted partners who help us run the business — payment gateways, courier and logistics partners, and IT service providers — and only to the extent needed. We may also disclose information when required by law.</p>`],
      ["Cookies", `<p>We use cookies to keep the site working, remember your preferences and understand how visitors use the site. You can disable cookies in your browser settings, though some features may not work properly.</p>`],
      ["Data security & retention", `<p>We use reasonable security practices to protect your information as required under the Information Technology Act, 2000 and applicable rules. We keep your data only as long as needed for the purposes above or as required by law.</p>`],
      ["Your rights", `<p>You can request access to, correction of, or deletion of your personal data by writing to us at ${SITE.email}.</p>`],
      ["Grievance Officer", `<p>In accordance with the Information Technology Act, 2000 and rules made thereunder, the Grievance Officer is:</p>
<ul><li><strong>Name:</strong> ${SITE.grievanceOfficer}</li><li><strong>Email:</strong> ${SITE.email}</li><li><strong>Address:</strong> ${SITE.address}</li></ul>`],
      ["Changes to this policy", `<p>We may update this policy from time to time. Changes will be posted on this page with a revised "Last updated" date.</p>`],
    ]),
  ],

  "terms.html": [
    "Terms & Conditions",
    policyPage("Terms & Conditions", [
      ["Overview", `<p>This website is operated by ${SITE.legalName}. By accessing the website or purchasing from us, you agree to these Terms & Conditions. If you do not agree, please do not use the website.</p>`],
      ["Eligibility", `<p>You must be at least 18 years old, or use the website under the supervision of a parent or guardian, to place an order.</p>`],
      ["Products & pricing", `<p>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We try to display product colours and details accurately, but actual colours may vary slightly depending on your screen. We reserve the right to change prices or discontinue products without prior notice.</p>`],
      ["Orders", `<p>An order is confirmed only once payment is successfully received. We may cancel or refuse any order due to stock unavailability, pricing errors or suspected fraud; in such cases, any amount paid will be refunded in full.</p>`],
      ["Payments", `<p>Payments are processed securely through Razorpay. We accept UPI, credit/debit cards, net banking and wallets as supported by our payment partner.</p>`],
      ["Shipping, returns & refunds", `<p>Please refer to our <a href="shipping-policy.html">Shipping & Delivery Policy</a> and <a href="refund-policy.html">Refund & Cancellation Policy</a>, which form part of these terms.</p>`],
      ["Intellectual property", `<p>All content on this website — including logos, text, images and designs — belongs to ${SITE.legalName} and may not be copied or used without our written permission.</p>`],
      ["Limitation of liability", `<p>${SITE.legalName} shall not be liable for any indirect or consequential loss arising from the use of this website or products purchased. Our maximum liability for any order is limited to the amount paid for that order.</p>`],
      ["Governing law", `<p>These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in the city of our registered office.</p>`],
      ["Contact", contactBlock],
    ]),
  ],

  "refund-policy.html": [
    "Refund & Cancellation Policy",
    policyPage("Refund & Cancellation Policy", [
      ["Returns", `<p>We want you to love what you ordered. If you're not satisfied, you can request a return within <strong>${SITE.returnDays} days of delivery</strong>.</p>
<ul>
<li>Items must be unused, unwashed and in original condition with all tags attached.</li>
<li>Innerwear, socks and items marked "non-returnable" cannot be returned for hygiene reasons.</li>
<li>To start a return, email us at ${SITE.email} with your order ID and reason for return.</li>
</ul>`],
      ["Exchanges", `<p>Size exchanges are available within ${SITE.returnDays} days of delivery, subject to stock availability.</p>`],
      ["Refunds", `<p>Once we receive and inspect the returned item, we will notify you of approval. Approved refunds are processed to the <strong>original payment method within 5–7 business days</strong>. The time for the amount to reflect in your account may vary depending on your bank.</p>`],
      ["Damaged or wrong items", `<p>If you receive a damaged, defective or incorrect item, please contact us within 48 hours of delivery with photos. We will arrange a free replacement or full refund, including shipping charges.</p>`],
      ["Cancellations", `<p>Orders can be cancelled before they are dispatched by contacting us at ${SITE.email} or ${SITE.phone}. A full refund will be issued to the original payment method within 5–7 business days. Orders that have already been shipped cannot be cancelled but may be returned after delivery as per the return policy above.</p>`],
      ["Contact", contactBlock],
    ]),
  ],

  "shipping-policy.html": [
    "Shipping & Delivery Policy",
    policyPage("Shipping & Delivery Policy", [
      ["Shipping coverage", `<p>We currently ship to serviceable pin codes across India. We do not ship internationally at this time.</p>`],
      ["Processing time", `<p>Orders are processed and dispatched within <strong>1–2 business days</strong> of successful payment. Orders placed on Sundays or public holidays are processed the next business day.</p>`],
      ["Delivery time", `<p>Delivery usually takes <strong>5–7 business days</strong> from dispatch, depending on your location. Remote areas may take longer.</p>`],
      ["Shipping charges", `<ul><li>Free shipping on orders above ${inr(SITE.freeShippingAbove)}.</li><li>A flat fee of ${inr(SITE.shippingFee)} applies to orders below ${inr(SITE.freeShippingAbove)}.</li></ul>`],
      ["Order tracking", `<p>Once your order is shipped, you will receive a tracking link by email/SMS to follow your delivery.</p>`],
      ["Delays", `<p>Delivery timelines are estimates. Delays caused by courier partners, weather, strikes or other events beyond our control may occur. We will keep you informed if your order is delayed.</p>`],
      ["Contact", contactBlock],
    ]),
  ],
};

const out = path.join(__dirname, "public");
fs.mkdirSync(out, { recursive: true });
for (const [file, [title, body]] of Object.entries(pages)) {
  fs.writeFileSync(path.join(out, file), layout(file, title, body));
}
fs.copyFileSync(path.join(__dirname, "styles.css"), path.join(out, "styles.css"));
console.log(`Built ${Object.keys(pages).length} pages into ./public`);
