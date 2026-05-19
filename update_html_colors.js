const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace avatar gradients
html = html.replace(/#F59E0B/g, 'var(--accent)');
html = html.replace(/#EF4444/g, 'var(--text-muted)');
html = html.replace(/#10B981/g, 'var(--text-light)');
html = html.replace(/#3B82F6/g, 'var(--primary)');

fs.writeFileSync('index.html', html);
