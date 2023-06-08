import books from "../models/Book.js"

class BookController {
  static getBooks = (req, res) => {
    books.find({}).then(result => {
      res.status(200).json(result);
    })
  }

  static postBook = (req, res) => {
    let book = new books(req.body)

    book.save().then(result => {
      res.status(201).send(book.toJSON())
    }).catch(err => {
      res.status(500).send({message: err.message})
    });

    
  }

  static putBook = (req, res) => {
    const id = req.params.id;

    books.findByIdAndUpdate(id, req.body).then(book => {
      res.status(200).json(book);
    }).catch(err => {
      res.status(500).send({message: err.message})
    });

    
  }
}

export default BookController;