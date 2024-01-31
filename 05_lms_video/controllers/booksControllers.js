// import booksServices from "../services/booksServices.js";
import HttpError from "../helpers/HttpError.js";
import { Book } from "../models/bookModel.js";
import catchAsync from "../helpers/catchAsync.js";

export const getBooksList = catchAsync(async (req, res) => {
  // const result = await Book.find();
  const result = await Book.find({}, "title");
  res.status(200).json(result);
});

export const getOneBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  // const result = await Book.findOne({ _id: id });
  const result = await Book.findById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
});

export const addNewBook = catchAsync(async (req, res) => {
  const result = await Book.create(req.body);
  res.status(201).json(result);
});

export const removeBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const removedBook = await Book.findByIdAndDelete(id);
  if (!removedBook) {
    throw HttpError(404);
  }
  res.status(200).json(removedBook);
});

export const updateBook = catchAsync(async (req, res) => {
  const keys = Object.keys(req.body);
  if (keys.length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { id } = req.params;
  const bookToUpdate = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!bookToUpdate) {
    throw HttpError(404);
  }
  res.status(201).json(bookToUpdate);
});

export const updateFavorite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bookToUpdate = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!bookToUpdate) {
    throw HttpError(404);
  }
  res.status(201).json({ message: "Delete success" });
});
