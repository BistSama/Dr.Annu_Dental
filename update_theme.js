const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Colors
css = css.replace(/rgba\(14,165,233/g, 'rgba(91,70,60');
css = css.replace(/rgba\(20,184,166/g, 'rgba(243,211,139');
css = css.replace(/#E0F2FE/g, 'var(--bg2)');
css = css.replace(/#FBBF24/g, 'var(--accent)');

// Typography weight thinning
css = css.replace(/font-weight:700/g, 'font-weight:500');
css = css.replace(/font-weight:800/g, 'font-weight:500');
css = css.replace(/font-weight:600/g, 'font-weight:400');

// The google fonts import
css = css.replace(/family=Inter:wght@300;400;500;600;700;800&family=Playfair\+Display:wght@600;700/g, 'family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;500');

fs.writeFileSync('style.css', css);

let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(/rgba\(14,165,233/g, 'rgba(91,70,60');
fs.writeFileSync('script.js', js);
