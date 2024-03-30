import React, { useState } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';

const CheckinBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmCheckin, setConfirmCheckin] = useState('');
  const [showBookList, setShowBookList] = useState(true);
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
      console.log(data);
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
      setSelectedBook(book)
      setShowBookList(false);
      setFormData({
        title: book.title,
        borrowerName: book.borrower.borrowerName || '', 
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

  const handleReset = () => {
    setSelectedBook(null);
    setShowBookList(true);
    setBooks([]);
    setConfirmCheckin('');
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
          setShowBookList(true);
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
      {!selectedBook? (<>
      <SearchBar onSearch={handleSearch} selectedItem={selectedBook} placeholder="Search Books..." />
      <ItemList items={books} onSelectItem={handleSelectBook} itemType="book" isVisible={showBookList} />
      </>): (
        <>
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
              className="bg-blue-700 text-white py-4 mb-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500"
              onClick={handleCheckin}
            >
              Checkin
            </button>
          </div>
        </form>
        <div className="mt-2">
          <button
            type="button"
            className="bg-red-100 text-red-500 py-4 mb-4 w-full rounded font-semibold hover:bg-red-200 ring-2 ring-red-300 focus:ring-4 focus:ring-red-500"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </>
      )}
    </div>
  );
};

export default CheckinBook;
