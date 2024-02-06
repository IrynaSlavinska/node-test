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
import { authenticate } from "../middlewares/authenticate.js";
import {
  updateBookSchema,
  createBookSchema,
  updateFavoriteSchema,
} from "../models/booksSchemas.js";

const booksRouter = express.Router();

booksRouter.get("/", authenticate, getBooksList);

booksRouter.get("/:id", authenticate, isValidId, getOneBook);

booksRouter.post("/", authenticate, validateBody(createBookSchema), addNewBook);

booksRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateBookSchema),
  updateBook
);

booksRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

booksRouter.delete("/:id", authenticate, isValidId, removeBook);

export default booksRouter;
