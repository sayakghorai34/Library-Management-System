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
          {book.title} - {book.borrowerName} - {book.price}
        </div>
      ))}
    </div>
  );
};

const CheckinBook = ({ onGoHomeClick }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmCheckin, setConfirmCheckin] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    borrowerName: '',
    category: '',
    price: '',
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/searchin?query=${query}`);
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
      const borrowerId = book.borrower; 
      if (!borrowerId) {
        throw new Error('Borrower ID not found');
      }
  
      const borrowerResponse = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/${borrowerId}`);
      if (!borrowerResponse.ok) {
        throw new Error('Error fetching borrower details');
      }
      else{
        console.log('Borrower details fetched successfully');
      }
      
      const borrowerData = await borrowerResponse.json();
      console.log(borrowerData);
      setSelectedBook(book)
      setFormData({
        title: book.title,
        borrowerName: borrowerData?.borrowerName || '', 
        category: book.category || '', 
        price: book.price ? book.price.toString() : '', 
      });
    } catch (error) {
      console.error('Error fetching borrower details:', error);
      setFormData({
        title: book.title,
        borrowerName: '', 
        category: book.category || '', 
        price: book.price||'', 
      });
    }
  };

  const handleGoHome = () => {
    setSelectedBook(null);
    setBooks([]);
    setConfirmCheckin('');
    onGoHomeClick();
  };

  const handleCheckin = async () => {
    if (confirmCheckin === 'checkin' && selectedBook) {
      const { _id: bookId, borrower } = selectedBook;
  
      const requestBody = {
        bookId,
        borrowerId: borrower || null,
      };
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/books/checkin`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          alert('Book checked in successfully');
          console.log('Book checked in successfully!');
          setConfirmCheckin('');
          setSelectedBook(null);
          setBooks([]);
        } else {
          throw new Error('Failed to check in book');
        }
      } catch (error) {
        console.error('Error checking in book:', error);
      }
    } else {
      alert('Please type "checkin" in the confirmation box to check in the book.');
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Book Checkin</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onSelectBook={handleSelectBook} />
      {selectedBook && (
        <form onSubmit={(e) => e.preventDefault()}>
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
              <label htmlFor="borrowerName" className="block">Borrower Name</label>
              <input
                type="text"
                id="borrowerName"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.borrowerName}
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
              <label htmlFor="confirm_checkin" className="block">Confirm Checkin</label>
              <input
                type="text"
                id="confirm_checkin"
                placeholder="Type 'checkin' to confirm"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={confirmCheckin}
                onChange={(e) => setConfirmCheckin(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-blue-700 text-white py-4 mb-4 w-full rounded font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-500"
              onClick={handleCheckin}
            >
              Checkin
            </button>
            <button
              type="button"
              className="bg-blue-100 text-blue-700 py-4 w-full rounded font-semibold hover:bg-blue-300 ring-4 ring-blue-400 focus:ring-4 focus:ring-blue-600"
              onClick={handleGoHome}
            >
              Go to Home
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckinBook;
