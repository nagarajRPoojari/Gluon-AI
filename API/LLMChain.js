const openaiapi = require("openai");
const vscode = require("vscode");

function readApiKey() {
  const configuration = vscode.workspace.getConfiguration("gluon-ai");
  const apiKey = configuration.get("apiKey");
  return apiKey;
}

const apiKey = readApiKey();

const openai = new openaiapi.OpenAI({
  apiKey: apiKey,
});

async function generateDocumentation(inputCode) {
  const prompt = `Now you are a assistant to give info about for following code.\n 
  ${inputCode}\n
  give very concise 3-4 points in total 
  example
  job : of the code,
  ERROR : any error
  input : 
  output :
  allways give in above format 
  give each point .
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    vscode.window.showErrorMessage("Your API usage limit reached.");
  }
}

module.exports = generateDocumentation;
