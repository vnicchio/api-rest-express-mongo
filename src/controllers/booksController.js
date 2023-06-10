import books from "../models/Book.js";

class BookController {
	static getBooks = (req, res) => {
		books.find().populate("author").exec().then(result => {
			res.status(200).json(result);
		});
	};

	static getBookById = (req, res) => {
		const id = req.params.id;

		books.findById(id).populate("author", "name").exec().then(book => {
			res.status(200).json(book);
		}).catch(err => {
			res.status(500).send({message: err.message});
		});
	};

	static getBookByPublisher = (req, res) => {
		const publisher = req.query.publisher;

		books.find({"publisher": publisher}, {}).then(books => {
			res.status(200).send(books);
		}).catch(err => {
			res.status(500).send({message: err.message});
		});
	};

	static postBook = (req, res) => {
		let book = new books(req.body);

		book.save().then(result => {
			res.status(201).send(result.toJSON());
		}).catch(err => {
			res.status(500).send({message: err.message});
		});
	};

	static putBook = (req, res) => {
		const id = req.params.id;

		books.findByIdAndUpdate(id, req.body).then(book => {
			res.status(200).json(book);
		}).catch(err => {
			res.status(500).send({message: err.message});
		});
	};

	static deleteBook = (req, res) => {
		const id = req.params.id;

		books.findByIdAndDelete(id).then(() => {
			res.status(200).send({message: "The book has been deleted!"});
		}).catch(err => {
			res.status(500).send({message: err.message});
		});
	};
}

export default BookController;