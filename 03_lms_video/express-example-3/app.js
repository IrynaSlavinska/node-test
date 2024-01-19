import express from "express";
import moment from "moment";
import fs from "fs/promises";
import cors from "cors";

import books from "./books.js";

const app = express();
app.use(cors());

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YYYY_hh:mm:ss");

//   await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("first middleware");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("second middleware");
//   next();
// });

app.get("/products", async (req, res) => {
  res.json([]);
});

app.get("/books", async (req, res) => {
  res.json(books);
});

app.listen(3001);

app.use(async (req, res) => {
  res.status(404).json({
    msg: "Not found",
  });
});
