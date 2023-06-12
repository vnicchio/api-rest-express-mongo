import NotFound from "../errors/NotFound.js";
import {authors, books} from "../models/index.js";

class BookController {
	static getBooks = async (req, res, next) => {
		try {
			let {limit = 5, page = 1} = req.query;

			limit = parseInt(limit);
			page = parseInt(page);
      
			const result = await books.find().populate("author").skip((page-1) * limit).limit(limit).exec();

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

	static getBookByFilter = async (req, res, next) => {
		try {
			const filter = await processSearch(req.query);

			if (filter !== null) {
				let result = await books.find(filter).populate("author");
				res.status(200).send(result);
			} else {
				res.status(200).send([]);
			}
			
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

async function processSearch(params) {
	const {publisher, title, minPages, maxPages, author} = params;

	let filter = {};

	if (publisher) {
		filter.publisher = publisher;
	}

	if (title) {
		filter.title = {$regex: title, $options: "i"};
	}

	if (minPages || maxPages) {
		filter.pages = {};
	}

	if (minPages) {
		filter.pages.$gte = minPages;
	}

	if (maxPages) {
		filter.pages.$lte = maxPages;
	}

	if (author) {
		const targetAuthor = await authors.findOne({name: author});

		if (targetAuthor !== null) {
			const authorId = targetAuthor._id;
			filter.author = authorId;
		} else {
			filter = null;
		}
	}

	return filter;
}

export default BookController;