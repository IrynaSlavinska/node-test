import express from "express";
import {
  getBooksList,
  getOneBook,
  addNewBook,
  removeBook,
  updateBook,
  updateFavorite,
} from "../controllers/booksControllers.js";
import validateBody from "../helpers/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  updateBookSchema,
  createBookSchema,
  updateFavoriteSchema,
} from "../models/booksSchemas.js";

const booksRouter = express.Router();

booksRouter.get("/", getBooksList);

booksRouter.get("/:id", isValidId, getOneBook);

booksRouter.post("/", validateBody(createBookSchema), addNewBook);

booksRouter.put("/:id", isValidId, validateBody(updateBookSchema), updateBook);

booksRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

booksRouter.delete("/:id", isValidId, removeBook);

export default booksRouter;
