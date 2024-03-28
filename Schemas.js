const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Borrower',
  },
});

// Define Borrower Schema
const BorrowerSchema = new mongoose.Schema({
  borrowerName: {
    type: String,
    required: true,
  },
  borrowerEmail: {
    type: String,
  },
  borrowerPhone: {
    type: String,
  },
  borrowerAddress: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

// Define Author Schema
const AuthorSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

// Create models based on the schemas
const Book = mongoose.model('Book', BookSchema);
const Borrower = mongoose.model('Borrower', BorrowerSchema);
const Author = mongoose.model('Author', AuthorSchema);

module.exports = { Book, Borrower, Author };
