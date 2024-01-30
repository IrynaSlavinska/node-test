import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const booksPath = path.resolve("./db/books.json");

const getAllBooks = async () => {
  const books = await fs.readFile(booksPath);
  return JSON.parse(books);
};

const getBookById = async (id) => {
  const books = await getAllBooks();
  const result = books.find((book) => book.id === id);
  return result || null;
};

const addBook = async (title, author) => {
  const books = await getAllBooks();
  const newBook = {
    id: nanoid(),
    title,
    author,
  };
  books.push(newBook);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return newBook;
};

const updateBook = async (id, data) => {
  const books = await getAllBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  const updatedBook = books.find((book) => book.id === id);
  books[index] = { id, ...updatedBook, ...data };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[index];
};

const removeBook = async (id) => {
  const books = await getAllBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

const booksServices = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  removeBook,
};

export default booksServices;
