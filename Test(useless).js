const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Book, Borrower, Author } = require('./Schemas'); // Import your schemas/models

const app = express();
app.use(express.json());
app.use(cors());  
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Library_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;







app.post('/api/books', async (req, res) => {
  try {
    const { title, authorName, category, price } = req.body;

    let author = await Author.findOne({ authorName });
    if (!author) {
      author = await Author.create({ authorName:authorName, authorEmail: '', authorPhone: '', books: []});
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


app.post('/api/authors', async (req, res) => {
  console.log(req.body);
  try {
    const { authorName, authorEmail, authorPhone, books } = req.body;
    console.log(req.body);
    const bookIds = [];
    for (const bookName of books) {
      // Trim each book name to remove leading and trailing whitespace
      const trimmedBookName = bookName.trim();

      let book = await Book.findOne({ title: trimmedBookName });
      if (!book) {
        book = await Book.create({ title: trimmedBookName, author: null, category: '', price: 0, borrower: null });
        bookIds.push(book._id);
      } else {
        // If the book already exists, just push its ID to bookIds
        bookIds.push(book._id);
      }
    }

    // Create the author
    const newAuthor = await Author.create({
      authorName,
      authorEmail,
      authorPhone,
      books: bookIds,
    });

    // Update each book's author property with the author's ID
    for (const bookId of bookIds) {
      let book = await Book.findById(bookId);
      book.author = newAuthor._id;
      await book.save();
    }

    res.status(201).json({ message: 'Author and books created successfully', data: newAuthor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Route to create a new borrower
app.post('/api/borrowers', async (req, res) => {
  try {
    const { borrowerName, borrowerEmail, borrowerPhone, borrowerAddress } = req.body;

    // Create the borrower
    const newBorrower = await Borrower.create({
      borrowerName,
      borrowerEmail,
      borrowerPhone,
      borrowerAddress,
      books: [], // Leave the books reference empty initially
    });

    res.status(201).json({ message: 'Borrower created successfully', data: newBorrower });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/books/search', async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(query, 'i'); // Case-insensitive search
    const books = await Book.find({ $or: [{ title: regex }, { authorName: regex }] }).populate('author');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true }).populate('author');

    if (updatedData.authorName && updatedBook.author.authorName !== updatedData.authorName) {
      const newAuthor = await Author.create({ authorName: updatedData.authorName, books: [bookId] });

      const oldAuthor = await Author.findById(updatedBook.author._id);
      oldAuthor.books = oldAuthor.books.filter((id) => id.toString() !== bookId);
      await oldAuthor.save();

      updatedBook.author = newAuthor;
      await updatedBook.save();
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/authors/:id', async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/borrowers/search', async (req, res) => {
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

app.put('/api/borrowers/:id', async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const updatedData = req.body;
    const updatedBorrower = await Borrower.findByIdAndUpdate(borrowerId, updatedData, { new: true });
    res.status(200).json(updatedBorrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/borrowers/search', async (req, res) => {
  try {
    const query = req.query.query;
    console.log('Search Query:', query); // Log the received search query

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid search query' });
    }
    else{
      console.log('valid');
    }

    const regex = new RegExp(query, 'i'); 
    console.log('Regex:', regex); // Log the regex used for search

    const authors = await Borrower.find({
      $or: [
        { authorName: { $regex: regex } }, 
        { authorEmail: { $regex: regex } }
      ],
    });

    console.log('Authors found:', authors); // Log the authors found
    res.json(authors);
  } catch (error) {
    console.error('Error searching authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/authors/:id', async (req, res) => {
  try {
    const authorId = req.params.id;
    const updatedData = req.body;
    const updatedAuthor = await Borrower.findByIdAndUpdate(authorId, updatedData, { new: true });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
