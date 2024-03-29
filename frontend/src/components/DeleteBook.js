import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search book..."
        className="border text-gray-500 bg-gray-200 border-gray-300 rounded-lg p-2 w-64 mr-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        className="bg-blue-700 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

const BookList = ({ books, onSelectBook }) => {
  return (
    <div className="mb-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-gray-700 p-2 rounded-lg mb-2 cursor-pointer"
          onClick={() => onSelectBook(book)}
        >
          {book.title} - {book.authorName} - {book.category} - {book.price}
        </div>
      ))}
    </div>
  );
};

const DeleteBook = ({ onGoHomeClick }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    price: '',
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/search?query=${query}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleSelectBook = async (book) => {
    setSelectedBook(book);
    try {
      const authorId = book.author?._id; 
      if (!authorId) {
        throw new Error('Author ID not found');
      }
  
      const authorResponse = await fetch(`${process.env.REACT_APP_API_URI}/authors/${authorId}`);
      if (!authorResponse.ok) {
        throw new Error('Error fetching author details');
      }
      
      const authorData = await authorResponse.json();
      setFormData({
        title: book.title,
        authorName: authorData?.authorName || '', 
        category: book.category || '', 
        price: book.price ? book.price.toString() : '', 
      });
    } catch (error) {
      console.error('Error fetching author details:', error);
      setFormData({
        title: book.title,
        authorName: '', 
        category: '', 
        price: '', 
      });
    }
  };

  const handleGoHome = () => {
    setSelectedBook(null);
    setBooks([]);
    setConfirmDelete('');
    onGoHomeClick();
  };

  const handleDelete = async () => {
    if (confirmDelete === 'delete' && selectedBook) {
      const { _id: bookId, author } = selectedBook;
      if (!author?._id) {
        console.error('Author ID not found in selected book.');
        return;
      }

      const requestBody = {
        bookId,
        authorId: author._id,
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          alert('Book deleted successfully');
          console.log('Book deleted successfully!');
          setConfirmDelete('');
          setSelectedBook(null);
          setBooks([]);
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    } else {
      alert('Please type "delete" in the confirmation box to delete the book.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Delete Book</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onSelectBook={handleSelectBook} />
      {selectedBook && (
        <form onSubmit={(e) => e.preventDefault()} className='w-screen max-w-md'>
          <div className="bg-gray-700 rounded-lg p-4 mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block">Title</label>
              <input
                type="text"
                id="title"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.title}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="authorName" className="block">Author Name</label>
              <input
                type="text"
                id="authorName"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.authorName}
                readOnly
                />
            </div>
            <div className="mb-4">
            <label htmlFor="category" className="block">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.category}
              readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                required
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
                value={formData.price}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm_delete" className="block">Confirm Delete</label>
              <input
                type="text"
                id="confirm_delete"
                placeholder="Type 'delete' to confirm"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-blue-700 text-white py-4 mb-4 w-full rounded font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-500"
              onClick={handleGoHome}
            >
              Go Home
            </button>
            <button
              type="button"
              className="bg-red-100 text-red-700 py-4 w-full rounded font-semibold hover:bg-red-300 ring-4 ring-red-400 focus:ring-4 focus:ring-red-600"
              onClick={handleDelete}
            >
              Confirm Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeleteBook;
