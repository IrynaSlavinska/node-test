// const fs = require("fs");

// fs.readFile("./file.txt", (error, data) => {
//   console.log(error);
//   console.log(data);
// });

const fs = require("fs/promises");

const readFile = async () => {
  const text = await fs.readFile("./file.txt", "utf-8");
  console.log(text);
};
readFile();
// readFile - щоб прочитати існуючий файл.

// const readFile = async () => {
//   const buffer = await fs.readFile("./file.txt"); // повертає закодований файл
//   console.log(buffer);
//   const text = buffer.toString();
// };

// fs.readFile("./file.txt")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

const addText = async () => {
  const result = await fs.appendFile("./file.txt", "\nIt`s a demon");
  console.log(result);
};
addText();
// appendFile - щоб додати текст в кінець файлу

const replaceText = async () => {
  const newText = await fs.writeFile("./file.txt", "New text in this file");
  console.log(newText);
};
replaceText();
// writeFile - щоб перезаписати дані в файлі. перший аргумент - шлях до файлу, другий - що треба написати замість всього існуючого

// якщо файлу не знайдено, то нода створить його
