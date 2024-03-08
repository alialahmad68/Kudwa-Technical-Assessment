const fs = require("fs");

const readFileContent = () => {
  const fileData = fs.readFileSync("wordlist.txt", "utf8");
  return fileData
    .split("\n")
    .filter((word) => word.length > 0 && word.length <= 6);
};

const run = () => {
  const fileContent = readFileContent();
  for (let i = 0; i < fileContent.length; i++) {
    for (let j = 0; j < fileContent.length; j++) {
      if (i != j) {
        const concatinatedString = fileContent[i] + fileContent[j];
        if (
          concatinatedString.length == 6 &&
          fileContent.includes(concatinatedString)
        ) {
          console.log(
            `${fileContent[i]} + ${fileContent[j]} => ${concatinatedString}`
          );
        }
      }
    }
  }
};

run();
