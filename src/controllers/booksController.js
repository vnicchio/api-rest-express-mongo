import books from "../models/Book.js"

class BookController {
  static getBooks = async (req, res) => {
    let result = await books.find({})
    res.status(200).json(result);
  }

  static postBook = async (req, res) => {
    let book = new books(req.body)

    let response = await book.save();

    res.status(201).send(book.toJSON())
  }
}

export default BookController;