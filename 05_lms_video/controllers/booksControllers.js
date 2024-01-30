import booksServices from "../services/booksServices.js";
import HttpError from "../helpers/HttpError.js";

export const getBooksList = async (req, res, next) => {
  try {
    const books = await booksServices.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getOneBook = async (req, res, next) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const book = await booksServices.getBookById(id);
    if (!book) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const addNewBook = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { title, author } = req.body;
    const newBook = await booksServices.addBook(title, author);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const removeBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedBook = await booksServices.removeBook(id);
    if (!removedBook) {
      throw HttpError(404);
    }
    res.status(200).json(removedBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;
    const bookToUpdate = await booksServices.updateBook(id, req.body);
    if (!bookToUpdate) {
      throw HttpError(404);
    }
    res.status(201).json(bookToUpdate);
  } catch (error) {
    next(error);
  }
};
