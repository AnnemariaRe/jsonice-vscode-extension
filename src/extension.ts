// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jsonice" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('jsonice.format', () => {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		let doc = editor.document;
		let text = doc.getText();
		let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g, "");
		let tabSize = editor.options.tabSize;

		if (typeof JSON.parse(trimmedText) === "object") {
			var formattedJson = String(JSON.stringify(JSON.parse(trimmedText), null, editor.options.insertSpaces ? tabSize : "\t"));
		} else {
			var formattedJson = trimmedText;
		};

		if (formattedJson !== trimmedText) {
			editor.edit(builder => {
				const lastLine = doc.lineAt(doc.lineCount - 1);
				let start = new vscode.Position(0, 0);
				let end = new vscode.Position(doc.lineCount - 1, lastLine.text.length);

				builder.replace(new vscode.Range(start, end), formattedJson);
				editor.selection = new vscode.Selection(start, end);
			});
		}

		vscode.window.showInformationMessage('Formatted successfully!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('jsonice.lineFormat', () => {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		let doc = editor.document;
		let text = doc.getText();
		let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g, "");

		if (typeof JSON.parse(trimmedText) === "object") {
			var formattedJson = String(JSON.stringify(JSON.parse(trimmedText), null, 0));
		} else {
			var formattedJson = trimmedText;
		};

		if (formattedJson !== trimmedText) {
			editor.edit(builder => {
				const lastLine = doc.lineAt(doc.lineCount - 1);
				let start = new vscode.Position(0, 0);
				let end = new vscode.Position(doc.lineCount - 1, lastLine.text.length);

				builder.replace(new vscode.Range(start, end), formattedJson);
				editor.selection = new vscode.Selection(start, end);
			});
		}

		vscode.window.showInformationMessage('Formatted successfully!');
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }