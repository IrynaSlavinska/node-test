import express from "express";
import {
  getBooksList,
  // getOneBook,
  addNewBook,
  // removeBook,
  // updateBook,
} from "../controllers/booksControllers.js";
import validateBody from "../helpers/validateBody.js";
import { updateBookSchema, createBookSchema } from "../models/booksSchemas.js";

const booksRouter = express.Router();

booksRouter.get("/", getBooksList);

// booksRouter.get("/:id", getOneBook);

booksRouter.post("/", validateBody(createBookSchema), addNewBook);

// booksRouter.put("/:id", validateBody(updateBookSchema), updateBook);

// booksRouter.delete("/:id", removeBook);

export default booksRouter;
