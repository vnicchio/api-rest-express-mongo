import express from "express";
import BookController from "../controllers/booksController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
	.get("/books", BookController.getBooks, paginate)
	.get("/books/get", BookController.getBookByFilter, paginate)
	.get("/books/:id", BookController.getBookById)
	.post("/books", BookController.postBook)
	.put("/books/:id", BookController.putBook)
	.delete("/delete/:id", BookController.deleteBook);

export default router;