const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  category: String,
  price: Number,
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', default: null },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
