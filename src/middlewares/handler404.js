import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function handler404(req, res, next) {
	const error = new NotFound();
	next(error);
}

export default handler404;