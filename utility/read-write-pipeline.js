const vscode = require("vscode");
const readSelectedText = require("./01_read");
const writeToEditor = require("./03_write");
const generate = require("./02_generate");
let text = "";

module.exports = async function pipeline() {
  const delay = 10;
  const read_values = await readSelectedText();
  if (!read_values) return;
  const { selection, document, selectedText, position, fileType } = read_values;

  if (selection.isEmpty) {
    vscode.window.showWarningMessage("No text selected.");
    return;
  }

  vscode.window
    .withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Just a sec...",
        cancellable: false,
      },
      async (progress) => {
        text = await generate(selectedText, fileType);
        await writeToEditor(document, position, delay, text);
        progress.report({ increment: 100 });
        return "Task completed!";
      }
    )
    .then((result) => {
      vscode.window.showInformationMessage(result);
    });
};
