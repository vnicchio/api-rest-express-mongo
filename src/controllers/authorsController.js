import authors from "../models/Author.js";

class AuthorController {
	static getAuthors = async (req, res) => {
		try {
			const result = await authors.find({});

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	};

	static getAuthorById = async (req, res) => {
		try {
			const id = req.params.id;
			const author = await authors.findById(id);

			if (author !== null) {
				res.status(200).send(author);
			} else {
				res.status(404).send({message: "Author doesn't exist"});
			}
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static postAuthor = async (req, res) => {
		let author = new authors(req.body);

		author.save().then(result => {
			res.status(201).send(result.toJSON());
		}).catch(err => {
			res.status(500).send({message: err.message});
		});
	};

	static putAuthor = async (req, res) => {
		try {
			const id = req.params.id;

			const author = authors.findByIdAndUpdate(id, req.body);

			res.status(200).json(author);
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static deleteAuthor = async (req, res) => {
		try {
			const id = req.params.id;

			await authors.findByIdAndDelete(id);

			res.status(200).send({message: "The author has been deleted!"});
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};
}

export default AuthorController;