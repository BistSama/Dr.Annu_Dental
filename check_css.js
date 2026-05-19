const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');

let openBraces = 0;
let closeBraces = 0;
let lineNum = 1;
let openBraceLines = [];

for (let i = 0; i < css.length; i++) {
  const char = css[i];
  if (char === '\n') {
    lineNum++;
  }
  if (char === '{') {
    openBraces++;
    openBraceLines.push(lineNum);
  } else if (char === '}') {
    closeBraces++;
    openBraceLines.pop();
  }
}

console.log(`Open braces: ${openBraces}, Close braces: ${closeBraces}`);
if (openBraces !== closeBraces) {
  console.error("Syntax Error! Unmatched braces found.");
  console.log("Unclosed brace lines remaining:", openBraceLines);
} else {
  console.log("All braces match perfectly!");
}
