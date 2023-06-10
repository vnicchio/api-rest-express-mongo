import books from "../models/Book.js";

class BookController {
	static getBooks = async (req, res) => {
		try {
			const result = await books.find().populate("author").exec();

			res.status(200).json(result);
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static getBookById = async (req, res) => {
		try {
			const id = req.params.id;
			let book = await books.findById(id).populate("author", "name").exec();

			if (book !== null) {
				res.status(200).send(book);
			} else {
				res.status(404).send({message: "Author doesn't exist"});
			}
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static getBookByPublisher = async (req, res) => {
		try {
			const publisher = req.query.publisher;

			let result = await books.find({"publisher": publisher}, {});
			res.status(200).send(result);
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static postBook = async (req, res) => {
		try {
			let book = new books(req.body);
			let result = await book.save();

			res.status(201).send(result.toJSON());
		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static putBook = async (req, res) => {
		try {
			const id = req.params.id;
			const result = await books.findByIdAndUpdate(id, req.body);

			res.status(200).json(result);

		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};

	static deleteBook = async (req, res) => {
		try {
			const id = req.params.id;
			await books.findByIdAndDelete(id);

			res.status(200).send({message: "The book has been deleted!"});

		} catch (error) {
			res.status(500).send({message: error.message});
		}
	};
}

export default BookController;