import express from "express";
import books from "./books.js";

const app = express();

app.get("/books", (req, res) => {
  //   const databaseResponse = null;
  // res.send(databaseResponse) - метод send не вміє правильно опрацьовувати відповідь nullб приходить порожня відповідь
  //   res.json(databaseResponse); - метод json - повертає null
  //   res.json(books);
  //   res.send(books);
});

app.listen(3001, () => {
  console.log("Server is running");
});
