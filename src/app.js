import express from "express";

const app = express();
app.use(express.json());

const books = [
    {id: 1, title: 'The Lord of the Rings'},
    {id: 2, title: 'Harry Potter'}
]

app.get('/', (req, res) => {
    res.status(200).send('Node course');
})

app.get('/books', (req, res) => {
    res.status(200).json(books);
})

app.put('/books/:id', (req, res) => {
    let index = getBook(req.params.id);
    res.json(books[index]);
})

app.post('/books', (req, res) => {
    books.push(req.body);
    res.status(201).send('Book has been added successfully')
})

app.put('/books/:id', (req, res) => {
    let index = getBook(req.params.id);
    books[index].title = req.body.title;
    res.json(books);
})

function getBook(id) {
    return books.findIndex(book => book.id == id);
}

export default app;