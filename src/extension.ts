import * as vscode from "vscode";
import Cursor from "./cursor";

export function activate(context: vscode.ExtensionContext) {
  const cursor = new Cursor();

  context.subscriptions.push(cursor);
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "seq.home",
      ([cursorHomeCommand, cursorTopCommand]) => {
        cursor.goHome(cursorHomeCommand, cursorTopCommand);
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "seq.end",
      ([cursorEndCommand, cursorBottomCommand]) => {
        cursor.goEnd(cursorEndCommand, cursorBottomCommand);
      }
    )
  );
}

export function deactivate() {}
