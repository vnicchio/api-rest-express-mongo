import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
	id: {type: String},
	name: {type: String, required: [true, "Field name is required"]}
}, {
	versionKey: false
});

const authors = mongoose.model("authors", authorSchema);

export default authors;