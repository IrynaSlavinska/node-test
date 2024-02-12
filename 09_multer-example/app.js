const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const books = [];

app.get("/api/books", (req, res) => {
  res.json(books);
});

// upload.array("cover", 8) - для передачі декількох файлів Ж перший аргумент - назва поля, а другим - максимальна кількість файлів
// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCоunt: }]) - якщо очікуємо файли з різних полів: масив полів з назвою поля і максимальною кількістю очікуваних файлів

const booksDir = path.join(__dirname, "public", "books");

app.post("/api/books", upload.single("cover"), async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(booksDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const cover = path.join("public", "books", originalname);
  const NewBook = {
    id: nanoid(),
    ...req.body,
    cover,
  };
  books.push(NewBook);
  res.status(201).json(NewBook);
});

app.listen(6666);
