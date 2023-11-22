const linked_block = require('./highlight.js');
// node.js, "classic" way:
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
md.use(linked_block);
const result = md.render(`
\`\`\`javascript test#L1-L3
var x = 1;
console.log(x);
\`\`\`
`);

console.log(result);