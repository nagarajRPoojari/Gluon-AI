const vscode = require("vscode");

module.exports = async function readSelectedText() {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    vscode.window.showWarningMessage("No active editor.");
    return;
  }

  const selection = activeEditor.selection;

  const document = activeEditor.document;
  const startPosition = activeEditor.selection.start;
  const selectedText = document.getText(selection);
  let position = startPosition;
  const fileType = document.languageId;

  return {
    selection: selection,
    document: document,
    selectedText: selectedText,
    position: position,
    fileType: fileType,
  };
};
