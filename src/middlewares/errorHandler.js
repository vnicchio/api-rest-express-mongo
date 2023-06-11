import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/VallidationError.js";
import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
	console.log(Object.values(error));
	if (error instanceof mongoose.Error.CastError) {
		new IncorrectRequest().sendResponse(res);
	} else if (error instanceof mongoose.Error.ValidationError) {
		new ValidationError(error).sendResponse(res);
	} else if (error instanceof NotFound) {
		error.sendResponse(res);
	} else {
		new ErrorBase().sendResponse(res);
	}
}

export default errorHandler;