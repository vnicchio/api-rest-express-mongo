import express from "express";
import db from "./config/dbConnect.js"
import books from "./models/Book.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, "Connection db error"));
db.once("open", () => {
    console.log("DB Connection has been successfully");
})

const app = express();
app.use(express.json());

routes(app);

app.delete('/books/:id', (req, res) => {
    let {id} = req.params;
    let index = getBook(id);
    books.splice(index, 1);
    res.send(`Book ${id} has been removed successfully`);
})

function getBook(id) {
    return books.findIndex(book => book.id == id);
}

export default app;