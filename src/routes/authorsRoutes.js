import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/authors", AuthorController.getAuthors)
  .get("/authors/:id", AuthorController.getAuthorById)
  .post("/authors", AuthorController.postAuthor)
  .put("/authors/:id", AuthorController.putAuthor)
  .delete("/delete/:id", AuthorController.deleteAuthor);

export default router;