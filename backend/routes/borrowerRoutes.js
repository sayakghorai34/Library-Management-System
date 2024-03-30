const express = require('express');
const router = express.Router();
const Borrower = require('../models/Borrower');
const Books = require('../models/Book');
const { route } = require('./bookRoutes');

router.post('/', async (req, res) => {
  try {
    const { borrowerName, borrowerEmail, borrowerPhone, borrowerAddress } = req.body;

    const newBorrower = await Borrower.create({
      borrowerName,
      borrowerEmail,
      borrowerPhone,
      borrowerAddress,
      books: [],
    });

    res.status(201).json({ message: 'Borrower created successfully', data: newBorrower });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // console.log(req.params.id, req.body)
    const borrowerId = req.params.id;
    const updatedData = req.body;
    const updatedBorrower = await Borrower.findByIdAndUpdate(borrowerId, updatedData, { new: true });
    res.status(200).json(updatedBorrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(query, 'i'); 
    const borrowers = await Borrower.find({
      $or: [
        { borrowerName: { $regex: regex } }, 
        { borrowerEmail: { $regex: regex } }, 
        { borrowerPhone: { $regex: regex } }, 
        { borrowerAddress: { $regex: regex } }, 
      ],
    });
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/searchdel', async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(query, 'i'); 
    const borrowers = await Borrower.find({
      $and :[{$or: [
        { borrowerName: { $regex: regex } }, 
        { borrowerEmail: { $regex: regex } }, 
        { borrowerPhone: { $regex: regex } }, 
        { borrowerAddress: { $regex: regex } }, 
      ]},
      {books: []}
    ]});
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const borrower = await Borrower.findById(borrowerId);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const borrower = await Borrower.findById(borrowerId);

    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    const bookIds = borrower.books;
    
    for (const bookId of bookIds) {
      const book = await Books.findById(bookId);

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      book.borrower = 'none';
      await book.save();
    }

    await Borrower.findByIdAndDelete(borrowerId);

    res.status(200).json({ message: 'Borrower deleted successfully' });
  } catch (error) {
    console.error('Error deleting borrower:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
