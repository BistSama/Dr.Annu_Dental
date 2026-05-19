const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Schema
html = html.replace(
  /"image":"","url":""/,
  '"image":"https://smilesbydranu.com/hero.png","url":"https://smilesbydranu.com/"'
);

// 2. Fix H1 Tag
html = html.replace(
  /<h1 class="hero-title">Sambalpur&apos;s Most <span>Trusted Smile<\/span> Specialists<\/h1>/,
  '<h1 class="hero-title">Sambalpur&apos;s Premium <span>Dental Clinic</span> &amp; Implant Center</h1>'
);

// 3. Fix Canonical URL
html = html.replace(
  /<link rel="canonical" href="https:\/\/smilesbydranu\.com">/,
  '<link rel="canonical" href="https://smilesbydranu.com/">'
);

// 4. Update the hero sub-text slightly to make sure "dentist" is mentioned
html = html.replace(
  /Personalized dental care, painless treatment &amp; trusted results backed by/,
  'Personalized dental care from the best dentist in Sambalpur, offering painless treatments backed by'
);

fs.writeFileSync('index.html', html);
