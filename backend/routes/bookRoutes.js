const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Author = require("../models/Author");
const Borrower = require("../models/Borrower");

router.post("/", async (req, res) => {
  try {
    const { title, authorName, category, price } = req.body;

    let author = await Author.findOne({ authorName });
    if (!author) {
      author = await Author.create({
        authorName,
        authorEmail: "",
        authorPhone: "",
        books: [],
      });
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

    res
      .status(201)
      .json({ message: "Book created successfully", data: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  const { bookId: deleteBookId, authorId } = req.body;

  try {
    const deletedBook = await Book.findByIdAndDelete(deleteBookId);

    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { $pull: { books: deleteBookId } },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).send("Author not found");
    }

    res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.put("/checkin", async (req, res) => {
  try {
    const { bookId, borrowerId } = req.body;
    // console.log(bookId, borrowerId);
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { borrower: null },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }
    const updateBorrower = await Borrower.findByIdAndUpdate(borrowerId, {
      $pull: { books: bookId },
    });
    if (!updateBorrower) {
      return res.status(404).send("Borrower not found");
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/checkout", async (req, res) => {
  try {
    const { bookId, borrowerId } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: { borrower: borrowerId } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    const updateBorrower = await Borrower.findByIdAndUpdate(
      borrowerId,
      { $push: { books: bookId } },
      { new: true }
    );

    if (!updateBorrower) {
      return res.status(404).send("Borrower not found");
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/searchout", async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(query, "i");
    const books = await Book.find({
      $and: [
        { $or: [{ title: regex }, { category: regex }] },
        { borrower: null },
      ],
    }).populate("author").populate("borrower");
    // console.log('Books:', books);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/searchin", async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(query, "i");
    // console.log('Regex:', regex);

    const books = await Book.find({
      $and: [
        { $or: [{ title: regex }, { category: regex }] },
        { borrower: { $ne: null } },
      ],
    }).populate("borrower").populate("author");

    // console.log('Books:', books);

    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(query, "i");
    const books = await Book.find({
      $or: [{ title: regex }, { category: regex }],
    }).populate("author").populate("borrower");
    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { bookId, title, authorName, category, price, preAuthorID } = req.body;

    // Find the previous author using preAuthorID
    const oldAuthor = await Author.findById(preAuthorID);

    // Find the new author using authorName
    let newAuthor = await Author.findOne({ authorName });

    // If newAuthor doesn't exist, create a new one
    if (!newAuthor) {
      newAuthor = await Author.create({
        authorName,
        authorEmail: "",
        authorPhone: "",
        books: [bookId],
      });
    } else if (newAuthor._id.toString() !== preAuthorID) {
      // If newAuthor is different from the old author, update both authors
      newAuthor.books.push(bookId);
      await newAuthor.save();

      if (oldAuthor) {
        // Remove the book from the old author's books list
        oldAuthor.books.pull(bookId);
        await oldAuthor.save();
      }
    }

    // Update the book with new information and the new author's ID
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author: newAuthor._id, category, price },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
