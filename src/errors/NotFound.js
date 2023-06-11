import ErrorBase from "./ErrorBase.js";

class NotFound extends ErrorBase {
	constructor(message = "Page not found") {
		super(message, 404);
	}
}

export default NotFound;