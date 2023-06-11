import authors from "../models/Author.js";

class AuthorController {
	static getAuthors = async (req, res, next) => {
		try {
			const result = await authors.find({});

			res.status(200).json(result);
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
				res.status(404).send({message: "Author doesn't exist"});
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

			const author = authors.findByIdAndUpdate(id, req.body);

			res.status(200).json(author);
		} catch (error) {
			next(error);
		}
	};

	static deleteAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;

			await authors.findByIdAndDelete(id);

			res.status(200).send({message: "The author has been deleted!"});
		} catch (error) {
			next(error);
		}
	};
}

export default AuthorController;