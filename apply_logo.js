const fs = require('fs');

// UPDATE CSS VARIABLES
let css = fs.readFileSync('style.css', 'utf8');

// Replace the entire :root block
const newRoot = `:root{
  --primary:#74CBE8; /* Logo Light Cyan */
  --primary-light:#9ADDF5;
  --primary-dark:#53ADC9;
  --accent:#0A3143; /* Logo Deep Navy for strong accents */
  --accent-light:#3D5A6C;
  --white:#FFFFFF;
  --bg:#F2EFE8; /* Logo Cream (Tooth color) */
  --bg2:#E3DFD5; /* Slightly darker cream for gradient */
  --text:#0A3143; /* Logo Deep Navy for text */
  --text-muted:#3D5A6C; /* Lighter navy */
  --text-light:#7E97A6;
  --border:#D8D3C8;
  --shadow:0 12px 32px rgba(10,49,67,0.06);
  --shadow-lg:0 24px 64px rgba(10,49,67,0.12);
  --radius:16px;
  --radius-lg:24px;
  --spring: cubic-bezier(0.175, 0.885, 0.32, 1.05); /* Spring-like easing */
  --smooth: cubic-bezier(0.16, 1, 0.3, 1); /* Smooth easing */
}`;

css = css.replace(/:root\{[\s\S]*?--smooth:[^}]*\}/, newRoot);

// Update nav logo img styles
if (!css.includes('.nav-logo-img')) {
    css = css.replace(
        /\.nav-logo-icon\{[^\}]*\}/,
        '.nav-logo-icon{display:none}\n.nav-logo-img{height:44px;width:auto;display:block;}'
    );
}

// Ensure the hero gradient glow uses the cyan or navy
css = css.replace(/rgba\(243,211,139,0\.3\)/, 'rgba(116,203,232,0.15)'); // Glow cyan instead of gold

fs.writeFileSync('style.css', css);

// UPDATE HTML
let html = fs.readFileSync('index.html', 'utf8');

// Replace nav logo SVG with IMG
html = html.replace(
  /<div class="nav-logo-icon">[\s\S]*?<\/div>\s*<div class="logo-text">/,
  '<img src="logo.png" alt="SMILES By Dr. Annu Logo" class="nav-logo-img">\n                <div class="logo-text">'
);

// Replace Footer SVG with IMG
html = html.replace(
  /<div class="nav-logo-icon"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="white">[\s\S]*?<\/div>/,
  '<img src="logo.png" alt="SMILES By Dr. Annu Logo" class="nav-logo-img" style="filter: brightness(0) invert(1);">' // Invert to white for dark footer
);

fs.writeFileSync('index.html', html);
