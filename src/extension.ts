'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "taskrepro" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', async () => {
        // The code you place here will be executed every time your command is executed
        try {
            const shell = new vscode.ShellExecution("echo hello");

            if (process.platform === 'win32') {
                shell.commandLine = 'echo "hello"';
                if (shell.options !== undefined) {
                shell.options.executable = 'cmd.exe';
                shell.options.shellArgs = ['/d', '/c'];
                }
            }

            const task = new vscode.Task({ type: 'wpilibgradle' }, vscode.workspace.workspaceFolders![0], 'Test', 'testing', shell);
            await vscode.tasks.executeTask(task);
        } catch (err) {
            console.log(err);
        }
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
