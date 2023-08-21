const vscode = require("vscode");
async function insertCharacter(document, position, char) {
  const edit = new vscode.WorkspaceEdit();
  edit.insert(document.uri, position, char);
  await vscode.workspace.applyEdit(edit);
}

/**
 * @param {any} document
 * @param {vscode.Position} position
 * @param {number} delay
 * @param {string} text
 */
module.exports = async function writeToEditor(document, position, delay, text) {
  let line = position.line - 1;
  if (line < 0) line = 0;
  let character = position.character;

  for (const char of text) {
    if (char === "\n") {
      await insertCharacter(
        document,
        new vscode.Position(line, character),
        char
      );
      line++;
      character = 0;
    } else {
      await insertCharacter(
        document,
        new vscode.Position(line, character),
        char
      );
      character++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
// Call the writeToEditor function
