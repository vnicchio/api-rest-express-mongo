import express from "express";
import AuthorController from "../controllers/authorsController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
	.get("/authors", AuthorController.getAuthors, paginate)
	.get("/authors/:id", AuthorController.getAuthorById)
	.post("/authors", AuthorController.postAuthor)
	.put("/authors/:id", AuthorController.putAuthor)
	.delete("/delete/:id", AuthorController.deleteAuthor);

export default router;