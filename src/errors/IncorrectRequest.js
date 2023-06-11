import ErrorBase from "./ErrorBase.js";

class IncorrectRequest extends ErrorBase {
	constructor(message = "Data provided is incorrect ") {
		super(message, 400);
	}
}

export default IncorrectRequest;