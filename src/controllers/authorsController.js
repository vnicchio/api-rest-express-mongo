import authors from "../models/Author.js"

class AuthorController {
  static getAuthors = (req, res) => {
    authors.find({}).then(result => {
      res.status(200).json(result);
    })
  }

  static getAuthorById = (req, res) => {
    const id = req.params.id;

    authors.findById(id).then(author => {
      res.status(200).json(author);
    }).catch(err => {
      res.status(500).send({message: err.message})
    });
  }

  static postAuthor = (req, res) => {
    let author = new authors(req.body)

    author.save().then(result => {
      res.status(201).send(result.toJSON())
    }).catch(err => {
      res.status(500).send({message: err.message})
    });
  }

  static putAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndUpdate(id, req.body).then(author => {
      res.status(200).json(author);
    }).catch(err => {
      res.status(500).send({message: err.message})
    });
  }

  static deleteAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndDelete(id).then(() => {
      res.status(200).send({message: 'The author has been deleted!'});
    }).catch(err => {
      res.status(500).send({message: err.message})
    });
  }
}

export default AuthorController;