import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BookController.getBooks)
  .get("/books/:id", BookController.getBookById)
  .post("/books", BookController.postBook)
  .put("/books/:id", BookController.putBook)
  .delete("/delete/:id", BookController.deleteBook);

export default router;