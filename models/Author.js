const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorEmail: String,
  authorPhone: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
