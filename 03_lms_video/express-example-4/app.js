import express from "express";
import cors from "cors";

import booksRouter from "./routes/api/books.js";

const app = express();

app.use(cors());
app.use("/api/books", booksRouter);

app.listen(3001);
