import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import booksRouter from "./routes/booksRouter.js";

dotenv.config();
export const app = express();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

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
