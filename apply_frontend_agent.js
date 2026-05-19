const fs = require('fs');

// INDEX.HTML
let html = fs.readFileSync('index.html', 'utf8');

// 1. CLS Fix: Add explicit width and height to images
// Hero Image (LCP)
html = html.replace(
  /<img src="hero\.png" alt="SMILES By Dr\. Annu Dental Clinic Sambalpur">/,
  '<img src="hero.png" alt="SMILES By Dr. Annu Dental Clinic Sambalpur" width="800" height="600" fetchpriority="high" decoding="sync">'
);

// About Image (Below fold)
html = html.replace(
  /<img src="hero\.png" alt="Dr\. Annu - Dental Specialist Sambalpur">/,
  '<img src="hero.png" alt="Dr. Annu - Dental Specialist Sambalpur" width="800" height="600" loading="lazy" decoding="async">'
);

// 2. Accessibility Fix: Decorative SVGs should be hidden from screen readers
html = html.replace(/<svg\b(?![^>]*aria-hidden)/g, '<svg aria-hidden="true" focusable="false"');

// 3. Accessibility Fix: Hamburger Menu should have ARIA roles and labels
html = html.replace(
  /<div class="nav-hamburger" id="hamburger">/,
  '<button class="nav-hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">'
);
html = html.replace(
  /<\/div>\s*<\/div>\s*<\/nav>/,
  '</button>\n        </div>\n    </nav>'
);

fs.writeFileSync('index.html', html);

// STYLE.CSS (update .nav-hamburger since we changed it to a <button>)
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('border:none;background:none')) {
    css = css.replace(
        /\.nav-hamburger\{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px\}/,
        '.nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;border:none;background:none}'
    );
    fs.writeFileSync('style.css', css);
}

// SCRIPT.JS (update aria-expanded logic for the hamburger menu)
let js = fs.readFileSync('script.js', 'utf8');
if (!js.includes('aria-expanded')) {
    js = js.replace(
        /hamburger\.addEventListener\('click', \(\) => mobileMenu\.classList\.toggle\('open'\)\);/,
        `hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});`
    );
    js = js.replace(
        /document\.querySelectorAll\('\.mobile-menu a'\)\.forEach\(a => a\.addEventListener\('click', \(\) => mobileMenu\.classList\.remove\('open'\)\)\);/,
        `document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}));`
    );
    fs.writeFileSync('script.js', js);
}
