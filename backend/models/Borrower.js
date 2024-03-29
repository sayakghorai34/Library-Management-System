const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  borrowerName: { type: String, required: true },
  borrowerEmail: String,
  borrowerPhone: String,
  borrowerAddress: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

module.exports = Borrower;
