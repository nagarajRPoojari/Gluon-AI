const generatedDocumentation = require("../API/LLMChain");
module.exports = async function generate(text, fileType) {
  let output = await generatedDocumentation(text);
  output = postProcessing(output, fileType);
  output = output + "\n";
  return output;
};

const postProcessing = (text, fileType) => {
  let processedText = text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");

  console.log(fileType);
  if (fileType == "python") {
    processedText = '"""' + processedText + '"""';
  } else {
    processedText = "/*" + processedText + "*/";
  }
  return processedText;
};
