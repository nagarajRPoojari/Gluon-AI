const vscode = require("vscode");
const { apiKeyConfigKey, promptForApiKey } = require("./api-key-config");
const MyTreeDataProvider = require("./ui/sidebar/dataProvider");
const pipeline = require("./utility/read-write-pipeline");

async function activate() {
  console.log('Congratulations, your extension "gluon-ai" is now active!');

  const myTreeDataProvider = new MyTreeDataProvider();
  vscode.window.createTreeView("myTreeView", {
    treeDataProvider: myTreeDataProvider,
  });
  const apiKey = vscode.workspace.getConfiguration().get(apiKeyConfigKey);
  if (!apiKey) {
    promptForApiKey();
  }
  vscode.commands.registerCommand(
    "extension.generateDocumentation",
    async () => {
      console.log("button clicked");
      await pipeline();
    }
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
