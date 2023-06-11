import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
	// console.log(Object.values(error.errors));
	if (error instanceof mongoose.Error.CastError) {
		res.status(400).send({message: "Invalid data provided!"});
	} else if (error instanceof mongoose.Error.ValidationError) {
		const message = Object.values(error.errors).map(err => err.message).join("; ");
		res.status(400).send({message: `Data validation error: ${message}`});
	} else {
		res.status(500).send({message: "Internal Server Error"});
	}
}

export default errorHandler;