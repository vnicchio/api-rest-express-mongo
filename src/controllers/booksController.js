import books from "../models/Book.js"

class BookController {
  static getBooks = async (req, res) => {
    let result = await books.find({})
    res.status(200).json(result);
  }
}

export default BookController;