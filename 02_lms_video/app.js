import { program } from "commander";

import books from "./books/index.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "book id")
  .option("-t, --title <type>", "book title")
  .option("-h, --author <type>", "book author")
  .option("-u, --update <type>", "book update")
  .option("-r, --remove <type>", "book remove");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "read":
      const allBooks = await books.getAll();
      console.log(allBooks);
      // node app.js -a read
      return;
    case "get":
      const oneBook = await books.getById(id);
      console.log(oneBook);
      // node app.js -a get -i e1Tpn_I3wBkLREY6wG0lb
      // node app.js -a get -i e1Tpn_I3wBkLREY6wG055
      return;
    case "add":
      const newBook = await books.addBook(title, author);
      console.log(newBook);
      // node app.js -a add -h "Robert Jordan" -t "The Eye of the World"
      return;
    case "update":
      const updatedBook = await books.updateById(id, title, author);
      console.log(updatedBook);
      // node app.js -a update -h "Robert Jordan" -t "The Great Hunt" -i 9XV2EAzEeUotE6DwTmkfZ
      return;
    case "remove":
      const removedBook = await books.removeBook(id);
      console.log(removedBook);
      // node app.js -a get -i 9XV2EAzEeUotE6DwTmkfZ
      // node app.js -a get -i "1"
      return;

    default:
      console.log("Unknown action");
      return;
  }
};

invokeAction(options);
