import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vnicchio:saddam84867@cluster0.wn4uqov.mongodb.net/node-bookstore");

let db = mongoose.connection;

export default db;