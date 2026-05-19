const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
let out = '';
for (let i = 0; i < c.length; i++) {
  if (c.charCodeAt(i) > 127) {
    out += '-';
  } else {
    out += c[i];
  }
}
// Collapse multiple hyphens into a single hyphen, except if it's part of a comment or something
// Wait, if it replaces a 3-byte utf-8 character, it will replace it with 1 hyphen if it decodes as 1 character in utf8.
// But if it's raw bytes, readFileSync('utf8') might decode it as \uFFFD.
c = c.replace(/\uFFFD/g, '-'); // The Replacement Character
// Also let's just do a regex replace for anything > 127
c = c.replace(/[^\x00-\x7F]/g, '-');
// Let's clean up multiple hyphens where they look ugly like " - " instead of " - "
c = c.replace(/ - /g, ' - ');
fs.writeFileSync('index.html', c);
