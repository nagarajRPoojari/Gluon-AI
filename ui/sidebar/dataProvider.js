// @ts-nocheck
const vscode = require("vscode");

class ButtonTreeItem extends vscode.TreeItem {
  constructor(label) {
    super(label, vscode.TreeItemCollapsibleState.None);

    this.description = "Click to generate documentation";

    this.iconPath = new vscode.ThemeIcon("file-code");

    this.contextValue = "buttonTreeItem";

    this.command = {
      command: "extension.generateDocumentation",
      title: "Generate Documentation",
    };
  }
}

class MyTreeDataProvider {
  constructor() {}

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!element) {
      return [new ButtonTreeItem("Generate Documentation")];
    }
    return [];
  }
}

module.exports = MyTreeDataProvider;
