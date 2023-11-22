
function highlightLinkedCodeBlock(str, lang, position) {
  // todo: validate position with a regex
  return `<a href="${position}">${position}</a>${str}`
}

module.exports = highlightLinkedCodeBlock;