const fs = require("fs");

const readFileContentWithSet = () => {
  const set = new Set();
  const fileData = fs.readFileSync("wordlist.txt", "utf8");
  const data = fileData.split("\n").filter(word => {
      if(word.length == 6) {
          set.add(word);
      }
      return word.length > 0 && word.length <= 6;
  });
  
  return [data, set];
};

const run = () => {
  const [fileContent, set] = readFileContentWithSet();
  for (let i = 0; i < fileContent.length; i++) {
    for (let j = 0; j < fileContent.length; j++) {
      if (i != j) {
        const concatinatedString = fileContent[i].trim() + fileContent[j].trim();
        if (set.has(concatinatedString)) {
          console.log(
            `${fileContent[i]} + ${fileContent[j]} => ${concatinatedString}`
          );
        }
      }
    }
  }
};

run();

// I have optimized this solution by using hashmap set which much better and faster than arrays where I
// have store all the words which have the length of 6 letters and so when i want to compare if the concatination
// of the two words of filecontent[i] and filecontent[j] is equal to length of 6 and also exists in the hashmap wich
// has an O(1) alot better thant iterating over all the array again to see if it includes the 6 letters word;
// also I first stored them by doing a for loop and checking where the length equals 6 but then I found that
// I can store them directly while reading the file and this also made the process faster;
// I tried both solutions and found that the optimized on is too much faster;
