
function link_code_block(info) {
    const [_lang, position, ..._rest] = info.split(' ');
    // todo: validate position with a regex
    return `<a href="${position}">${position}</a>`
}

module.exports = function block_link(md) {
    const block = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const result = block(tokens, idx, options, env, self);
        return `${link_code_block(tokens[idx].info)}${result}`;
        
    };
};