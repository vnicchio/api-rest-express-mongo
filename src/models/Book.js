import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		id: {type: String},
		title: {type: String, required: [true, "Field title is required"]},
		author: {type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "Field author is required"]},
		publisher: {
			type: String, 
			required: [true, "Field publisher is required"],
			enum: {
				values: ["Rocco"],
				message: "Publisher {VALUE} isn't allowed"
			}
		},
		pages: {
			type: Number,
			validate: {
				validator: (value) => {
					return value >= 10 && value <= 5000;
				},
				message: "The page number must be between 10 and 5000. Value provided: {VALUE}"
			}
		},
	}
);

const books = mongoose.model("books", bookSchema);

export default books;