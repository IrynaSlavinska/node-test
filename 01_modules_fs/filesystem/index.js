const fs = require("fs").promises;
const path = require("path");

(async () => {
  try {
    //   --------------------------------------------------------------
    // const pathToFile = path.join("files", "texts", "example.txt");
    // const readResult = await fs.readFile(pathToFile);
    // const text = readResult.toString();
    // console.log(pathToFile);
    // console.log(readResult);
    // console.log(text);

    // const filesDir = "files";
    // const listDirectoryContent = await fs.readdir(filesDir);
    // console.log("listDirectoryContent:", listDirectoryContent);

    // const stat = await fs.lstat(filesDir);
    // console.log(stat);
    // console.log(stat.isDirectory()); // true or false

    // await fs.appendFile(pathToFile, "\nrandom text on computer");

    //   --------------------------------------------------------------
    const pathToJSON = path.join("files", "data.json");
    // console.log(pathToJSON);

    const readJSON = await fs.readFile(pathToJSON);
    console.log(readJSON);

    const dataArr = JSON.parse(readJSON);
    console.log(dataArr);

    dataArr.push({ name: "Kate", year: 1988 });

    await fs.writeFile(pathToJSON, JSON.stringify(dataArr));
  } catch (err) {
    console.log(err);
  }
})();
