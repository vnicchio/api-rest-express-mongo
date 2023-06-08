import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BookController.getBooks)
  .post("/books", BookController.postBook)
  .put("/books/:id", BookController.putBook);

export default router;