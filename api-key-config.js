// @ts-nocheck
const vscode = require("vscode");
const axios = require("axios");
const apiKeyConfigKey = "gluon-ai.apiKey";

async function validateApiKey(apiKey) {
  try {
    const instance = axios.create({
      baseURL: "https://api.openai.com/v1/",
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const response = await instance.get("models");
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function promptForApiKey() {
  const apiKey = await vscode.window.showInputBox({
    prompt: "Please enter your OpenAI API key",
    ignoreFocusOut: true,
  });

  if (apiKey) {
    const isValidApiKey = await validateApiKey(apiKey);

    if (isValidApiKey) {
      await vscode.workspace
        .getConfiguration()
        .update(apiKeyConfigKey, apiKey, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage("API key has been saved.");
    } else {
      vscode.window.showErrorMessage("Invalid API key.");
      promptForApiKey();
    }
  }
}

module.exports = {
  apiKeyConfigKey,
  promptForApiKey,
};
