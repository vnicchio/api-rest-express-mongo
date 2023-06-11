import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/VallidationError.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
	// console.log(Object.values(error.errors));
	if (error instanceof mongoose.Error.CastError) {
		new IncorrectRequest().sendResponse(res);
	} else if (error instanceof mongoose.Error.ValidationError) {
		new ValidationError(error).sendResponse(res);
	} else {
		new ErrorBase().sendResponse(res);
	}
}

export default errorHandler;