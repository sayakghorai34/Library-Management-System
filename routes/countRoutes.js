const express = require('express');
const router = express.Router();
const Borrower = require('../models/Borrower');
const Book = require('../models/Book');
const Author = require('../models/Author');

router.get('/', async (req, res) => {
    try {
        const bookCount = await Book.countDocuments();
        const authorCount = await Author.countDocuments();
        const borrowerCount = await Borrower.countDocuments();
        const booksWithBorrower = await Book.countDocuments({ borrower: { $ne: null } });
        const borrowersWithEmptyBooks = await Borrower.countDocuments({ books: { $size: 0 } });
    
        res.status(200).json({
          books: bookCount,
          authors: authorCount,
          borrowers: borrowerCount,
          booksWithBorrower: booksWithBorrower,
          borrowersWithoutBook: borrowersWithEmptyBooks,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});
  

module.exports = router;
