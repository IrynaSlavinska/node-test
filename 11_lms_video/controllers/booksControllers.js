import { Book } from "../models/bookModel.js";
import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";

export const getBooksList = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  // console.log(req.query);
  const { page = 1, limit = 10 } = req.query;
  // візьми номер сторінки, відніми 1 і помнож на ліміт
  const skip = (page - 1) * limit;
  // третім параметром у find передаємо опції для пагінації (монгуз)
  const result = await Book.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.status(200).json(result);
});

export const getOneBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Book.findById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
});

export const addNewBook = catchAsync(async (req, res) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Book.create({ ...req.body, owner });
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
