import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const booksPath = path.resolve("./books/books.json");

const getAll = async () => {
  const data = await fs.readFile(booksPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const books = await getAll();
  const result = books.find((book) => book.id === id);
  return result || null;
};

const addBook = async (title, author) => {
  const books = await getAll();
  const newBook = {
    title,
    author,
    id: nanoid(),
  };
  books.push(newBook);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return newBook;
};

const updateById = async (id, title, author) => {
  const books = await getAll();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  books[index] = { id, title, author };

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[index];
};

const removeBook = async (id) => {
  const books = await getAll();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

export default {
  getAll,
  getById,
  addBook,
  updateById,
  removeBook,
};
