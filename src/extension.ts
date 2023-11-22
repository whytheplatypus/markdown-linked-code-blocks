// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function link_code_block(info: string, renderer: any) {
    const [_lang, position, ..._rest] = info.split(' ');
    if (!position) {
        return '';
    }
    // todo: validate position with a regex
    return `<a href="${position}" data-href="${position}" title="${position}">${position}</a>`;
}

function block_link(md: any) {
    const block = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens: any, idx: any, options: any, env: any, self: any) {
        const result = block(tokens, idx, options, env, self);
        return `${link_code_block(tokens[idx].info, md.renderer)}${result}`;
        
    };
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-linked-code-blocks" is now active!');

	return {
		extendMarkdownIt(md: any) {
			return md.use(block_link);
		}
	};
}

// This method is called when your extension is deactivated
export function deactivate() {}
