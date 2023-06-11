import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest {
	constructor(error) {
		const message = Object.values(error.errors).map(err => err.message).join("; ");
    
		super(`Data validation error: ${message}`);
	}
}

export default ValidationError;