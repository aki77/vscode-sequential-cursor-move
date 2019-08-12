import * as vscode from "vscode";
import {
  window,
  TextEditor,
  TextEditorRevealType,
  Position,
  Selection,
  Disposable
} from "vscode";

export default class Cursor {
  private startPositions: Position[] = [];
  private ignore: boolean = false;
  private subscriptions: Disposable[] = [];

  constructor() {}

  public dispose() {
    this.exitSeqMode();
  }

  public goHome(cursorHomeCommand: string, cursorTopCommand: string) {
    const firstPosition = this.getPositions()[0];

    if (!this.isActive) {
      this.enterSeqMode();
    }

    if (firstPosition.isEqual(new Position(0, 0))) {
      return this.goReturn();
    }

    if (firstPosition.character === 0) {
      return this.executeCursorMoveCommand(cursorTopCommand);
    }

    return this.executeCursorMoveCommand(cursorHomeCommand);
  }

  public goEnd(cursorEndCommand: string, cursorBottomCommand: string) {
    const firstPosition = this.getPositions()[0];

    if (this.isActive) {
      if (this.isBottom(firstPosition)) {
        return this.goReturn();
      }

      return this.executeCursorMoveCommand(cursorBottomCommand);
    }

    this.enterSeqMode();
    return this.executeCursorMoveCommand(cursorEndCommand);
  }

  public goReturn(): void {
    if (this.startPositions.length === 0) {
      return;
    }

    this.activeTextEditor.selections = this.startPositions.map(
      position => new Selection(position, position)
    );
    this.activeTextEditor.revealRange(
      this.activeTextEditor.selection,
      TextEditorRevealType.InCenter
    );
  }

  private executeCursorMoveCommand(command: string) {
    return this.withoutReset(vscode.commands.executeCommand(command));
  }

  private async withoutReset(promise: Thenable<any>) {
    this.ignore = true;
    await promise;
    this.ignore = false;
  }

  private get isActive() {
    return this.startPositions.length > 0;
  }

  private isBottom(position: Position): boolean {
    const document = this.activeTextEditor.document;
    const lastLine = document.lineAt(document.lineCount - 1);
    return position.isEqual(lastLine.range.end);
  }

  private getPositions() {
    return this.activeTextEditor.selections.map(({ active }) => active);
  }

  private reset = () => {
    if (this.ignore) {
      return;
    }

    this.exitSeqMode();
  };

  private get activeTextEditor() {
    return window.activeTextEditor as TextEditor;
  }

  private enterSeqMode() {
    this.startPositions = this.getPositions();
    this.subscriptions.push(window.onDidChangeTextEditorSelection(this.reset));
    this.subscriptions.push(window.onDidChangeActiveTextEditor(this.reset));
  }

  private exitSeqMode() {
    this.subscriptions.forEach(subscription => {
      subscription.dispose();
    });
    this.subscriptions = [];
    this.startPositions = [];
  }
}
