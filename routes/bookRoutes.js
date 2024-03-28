const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Borrower = require('../models/Borrower');

// Route to create a new book
router.post('/', async (req, res) => {
  try {
    const { title, authorName, category, price } = req.body;

    let author = await Author.findOne({ authorName });
    if (!author) {
      author = await Author.create({ authorName, authorEmail: '', authorPhone: '', books: [] });
    }

    const newBook = await Book.create({
      title,
      author: author._id,
      category,
      price,
      borrower: null,
    });

    author.books.push(newBook._id);
    await author.save();

    res.status(201).json({ message: 'Book created successfully', data: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a book
router.put('/checkin', async (req, res) => {
  try {
    const { bookId, borrowerId } = req.body;
    console.log(bookId, borrowerId);
    const updatedBook = await Book.findByIdAndUpdate(bookId, { borrower: null }, { new: true });
    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }
    const updateBorrower = await Borrower.findByIdAndUpdate(borrowerId, { $pull: { books: bookId } });
    if (!updateBorrower) {
      return res.status(404).send('Borrower not found');
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.delete('/', async (req, res) => {
  const { bookId: deleteBookId, authorId } = req.body;

  try {
    const deletedBook = await Book.findByIdAndDelete(deleteBookId);

    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { $pull: { books: deleteBookId } },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).send('Author not found');
    }

    res.status(200).send('Book deleted successfully');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
