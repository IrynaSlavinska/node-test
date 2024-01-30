import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import booksRouter from "./routes/booksRouter.js";

dotenv.config();
export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(4000, () => {
  console.log("Server running. Use our API on port: 4000");
});
