import NotFound from "../errors/NotFound.js";
import books from "../models/Book.js";

class BookController {
	static getBooks = async (req, res, next) => {
		try {
			const result = await books.find().populate("author").exec();

			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};

	static getBookById = async (req, res, next) => {
		try {
			const id = req.params.id;
			let book = await books.findById(id).populate("author", "name").exec();

			if (book !== null) {
				res.status(200).send(book);
			} else {
				next(new NotFound("Book doesn't exists"));
			}
		} catch (error) {
			next(error);
		}
	};

	static getBookByPublisher = async (req, res, next) => {
		try {
			const publisher = req.query.publisher;

			let result = await books.find({"publisher": publisher}, {});
			res.status(200).send(result);
		} catch (error) {
			next(error);
		}
	};

	static postBook = async (req, res, next) => {
		try {
			let book = new books(req.body);
			let result = await book.save();

			res.status(201).send(result.toJSON());
		} catch (error) {
			next(error);
		}
	};

	static putBook = async (req, res, next) => {
		try {
			const id = req.params.id;
			const book = await books.findByIdAndUpdate(id, req.body);

			if (book !== null) {
				res.status(200).json(book);
			} else {
				next(new NotFound("Book doesn't exists"));
			}

		} catch (error) {
			next(error);
		}
	};

	static deleteBook = async (req, res, next) => {
		try {
			const id = req.params.id;
			const book = await books.findByIdAndDelete(id);

			if (book !== null) {
				res.status(200).send({message: "The book has been deleted!"});
			} else {
				next(new NotFound("Book doesn't exists"));
			}

		} catch (error) {
			next(error);
		}
	};
}

export default BookController;