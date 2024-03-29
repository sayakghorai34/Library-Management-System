import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SelectedItemsDisplay = ({ selectedBook, selectedBorrower }) => {
  const handleSaveAsPDF = () => {
    const pdfDoc = new jsPDF();

    pdfDoc.setFont('helvetica');
    pdfDoc.setFontSize(12);

    pdfDoc.text(`Selected Book`, 10, 10);
    pdfDoc.text(`Title: ${selectedBook.title}`, 15, 20);
    pdfDoc.text(`Author: ${selectedBook.authorName}`, 15, 30);

    pdfDoc.text(`Selected Borrower`, 10, 50);
    pdfDoc.text(`Name: ${selectedBorrower.borrowerName}`, 15, 60);
    pdfDoc.text(`Email: ${selectedBorrower.borrowerEmail}`, 15, 70);
    pdfDoc.text(`Phone Number: ${selectedBorrower.borrowerPhone}`, 15, 80);
    pdfDoc.text(`Address: ${selectedBorrower.borrowerAddress}`, 15, 90);

    pdfDoc.save(`CheckoutReceipt-${selectedBook.title}.pdf`);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Selected Book</h3>
      <p>
        <span className="font-semibold">Title: </span>
        <span className="font-light">{selectedBook.title}</span>
      </p>
      <p>
        <span className="font-semibold">Author: </span>
        <span className="font-light">{selectedBook.authorName}</span>
      </p>
      <h3 className="text-lg font-bold mt-4 mb-4">Selected Borrower</h3>
      <p className="mt-2 mb-2">
        <span className="font-semibold">Name: </span>
        <span className="font-light">{selectedBorrower.borrowerName}</span>
      </p>
      <p className="mt-2 mb-2">
        <span className="font-semibold">Email: </span>
        <span className="font-light">{selectedBorrower.borrowerEmail}</span>
      </p>
      <p className="mt-2 mb-2">
        <span className="font-semibold">Phone Number: </span>
        <span className="font-light">{selectedBorrower.borrowerPhone}</span>
      </p>
      <p className="mt-2 mb-4">
        <span className="font-semibold">Address: </span>
        <span className="font-light">{selectedBorrower.borrowerAddress}</span>
      </p>
      <button
        className="bg-blue-700 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500"
        onClick={handleSaveAsPDF}
      >
        Save as PDF
      </button>
    </div>
  );
};

const SearchBar = ({ placeholder, onSearch, selectedItem }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center mb-4">
      {selectedItem ? (
        <div className="border text-gray-500 bg-gray-200 border-gray-300 rounded-lg p-2 w-64 mr-2">
          {selectedItem.title ? `Selected Book: ${selectedItem.title}` : `Selected Borrower: ${selectedItem.borrowerName}`}
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="border text-gray-500 bg-gray-200 border-gray-300 rounded-lg p-2 w-64 mr-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
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

const BookList = ({ items, onSelectItem, itemType, isVisible }) => {
  return (
    <div className={`mb-4 ${isVisible ? 'block' : 'hidden'}`}>
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-gray-700 p-2 rounded-lg mb-2 cursor-pointer"
          onClick={() => onSelectItem(item)}
        >
          {itemType === 'book' ? (
            <>
              {item.title} - {item.authorName} - {item.category} - {item.price}
            </>
          ) : itemType === 'borrower' ? (
            <>
              {item.borrowerName} - {item.borrowerEmail}
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

const BookCheckout = () => {
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [searchedBook, setSearchedBook] = useState(null);
  const [searchedBorrower, setSearchedBorrower] = useState(null);
  const [confirmCheckout, setConfirmCheckout] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [showBookList, setShowBookList] = useState(true);
  const [showBorrowerList, setShowBorrowerList] = useState(true);

  const handleBookSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/searchout?query=${query}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleBorrowerSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/search?query=${query}`);
      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  };

  const handleItemSelect = (item, itemType) => {
    if (itemType === 'book') {
      setSearchedBook(item);
      setSelectedBook(item);
      setShowBookList(false); // Collapse book list
    } else if (itemType === 'borrower') {
      setSearchedBorrower(item);
      setSelectedBorrower(item);
      setShowBorrowerList(false); // Collapse borrower list
    }
  };

  const handleCheckout = () => {
    if (confirmCheckout === 'checkout' && searchedBook && searchedBorrower) {
      const bookId = searchedBook._id;
      const borrowerId = searchedBorrower._id;

      fetch(`${process.env.REACT_APP_API_URI}/books/checkout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId,borrowerId }),
      })
        .then((response) => {
          if (response.ok) {
            alert('Book checked out successfully!');
            // Reset state and form data
            setSearchedBook(null);
            setSearchedBorrower(null);
            setConfirmCheckout('');
            setSelectedBook(null);
            setSelectedBorrower(null);
            setShowBookList(true); // Show book list again
            setShowBorrowerList(true); // Show borrower list again
          } else {
            throw new Error('Failed to checkout book');
          }
        })
        .catch((error) => {
          console.error('Error checking out book:', error);
          alert('Error checking out book. Please try again.');
        });
    } else {
      alert('Please type "checkout" in the confirmation box and select both a book and a borrower.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Book Checkout</h1>
      <SearchBar
        placeholder="Search book..."
        onSearch={handleBookSearch}
        selectedItem={selectedBook}
      />
      <BookList
        items={books}
        onSelectItem={(item) => handleItemSelect(item, 'book')}
        itemType="book"
        isVisible={showBookList}
      />
      <SearchBar
        placeholder="Search borrower..."
        onSearch={handleBorrowerSearch}
        selectedItem={selectedBorrower}
      />
      <BookList
        items={borrowers}
        onSelectItem={(item) => handleItemSelect(item, 'borrower')}
        itemType="borrower"
        isVisible={showBorrowerList}
      />
      {selectedBook && selectedBorrower && (
        <>
          <SelectedItemsDisplay selectedBook={selectedBook} selectedBorrower={selectedBorrower} />
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="bg-gray-700 rounded-lg p-4 mt-4">
              <div className="mb-4">
                <label htmlFor="confirmation" className="block">Confirmation</label>
                <input
                  type="text"
                  id="confirmation"
                  placeholder="Type 'checkout' to confirm"
                  className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                  value={confirmCheckout}
                  onChange={(e) => setConfirmCheckout(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="bg-blue-700 text-white py-4 mb-4 w-full rounded font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-500"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default BookCheckout;
