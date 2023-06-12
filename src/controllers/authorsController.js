import NotFound from "../errors/NotFound.js";
import {authors} from "../models/index.js";

class AuthorController {
	static getAuthors = async (req, res, next) => {
		try {
			const result = authors.find();

			req.parameter = result;

			next();
		} catch (error) {
			next(error);
		}
	};

	static getAuthorById = async (req, res, next) => {
		try {
			const id = req.params.id;
			const author = await authors.findById(id);

			if (author !== null) {
				res.status(200).send(author);
			} else {
				next(new NotFound("Author doesn't exists"));
			}
		} catch (error) {
			next(error);
		}
	};

	static postAuthor = async (req, res, next) => {
		let author = new authors(req.body);

		author.save().then(result => {
			res.status(201).send(result.toJSON());
		}).catch(error => {
			next(error);
		});
	};

	static putAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;

			const author = await authors.findByIdAndUpdate(id, req.body);
			if (author !== null) {
				res.status(200).send(author);
			} else {
				next(new NotFound("Author doesn't exists"));
			}

		} catch (error) {
			next(error);
		}
	};

	static deleteAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;

			const author = await authors.findByIdAndDelete(id);

			if (author !== null) {
				res.status(200).send({message: "The author has been deleted!"});
			} else {
				next(new NotFound("Author doesn't exists"));
			}

			
		} catch (error) {
			next(error);
		}
	};
}

export default AuthorController;