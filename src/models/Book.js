import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		id: {type: String},
		title: {type: String, required: [true, "Field title is required"]},
		author: {type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "Field author is required"]},
		publisher: {type: String, required: [true, "Field publisher is required"]},
		pages: {type: Number},
	}
);

const books = mongoose.model("books", bookSchema);

export default books;