const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The replacement character is \uFFFD
html = html.replace(/\uFFFD/g, '-');
// Also let's clean up any weird spaces around hyphens
html = html.replace(/ - /g, ' - ');
html = html.replace(/Mon-Sat/g, 'Mon - Sat');

fs.writeFileSync('index.html', html);
