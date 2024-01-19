import express from "express";

import books from "../../data/books.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(books);
});

router.get("/:id", async (req, res) => {
  res.json(books[0]);
});

router.post("/", async (req, res) => {
  res.json(books[0]);
});

router.put("/:id", async (req, res) => {
  res.json(books[0]);
});

router.delete("/:id", async (req, res) => {
  res.json(books[0]);
});

export default router;
