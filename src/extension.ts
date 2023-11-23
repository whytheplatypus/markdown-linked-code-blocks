// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";

function match_code_block(position: string, contents: string) {
    const [path, line] = position.split('#');
    //trim off the L
    const lineNumber = parseInt(line.replace(/^(L)/,""));
    const file_contents = fs.readFileSync(path, {encoding: "utf-8"});
    const file_lines = file_contents.split("\n");
    const contents_lines = contents.split("\n");
    contents_lines.pop(); // remove the last line, which is always empty
    for (let i = 0; i < contents_lines.length; i++) {
        const line = contents_lines[i];
        const file_line = file_lines[lineNumber + i - 1];
        if (line !== file_line) {
            return false;
        }
    }
    return true;
}

function render_code_match(matches: boolean) {
    return matches?"✓":"✗";
}

function link_code_block(position: string) {
    // todo: validate position with a regex
    return `<a href="${position}" data-href="${position}" title="${position}">${position}</a>`;
}

function block_link(md: any) {
    const fence = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens: any, idx: any, options: any, env: any, self: any) {
        const result = fence(tokens, idx, options, env, self);
        const { info, content } = tokens[idx];
        const [_lang, position, ..._rest] = info.split(' ');
        if (!position) {
            return result;
        }
        return `${link_code_block(position)}<span>${render_code_match(match_code_block(position, content))}</span>${result}`;
    };
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	return {
		extendMarkdownIt(md: any) {
			return md.use(block_link);
		}
	};
}

// This method is called when your extension is deactivated
export function deactivate() {}
