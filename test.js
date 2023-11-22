const highlightLinkedCodeBlock = require('./highlight.js');
const hljs = require('highlight.js');
// node.js, "classic" way:
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
md.set({
    highlight: function (str, lang, location) {
        console.log(arguments);
        return highlightLinkedCodeBlock(str, lang, location, hljs);
    }
})
const result = md.render(`
\`\`\`javascript test#L1-L3
var x = 1;
console.log(x);
\`\`\`
`);

console.log(result);