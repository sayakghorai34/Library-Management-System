import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search borrower..."
        className="border bg-gray-200 border-gray-300 rounded-lg p-2 w-64 mr-2 text-gray-500"
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

const BorrowerList = ({ borrowers, onSelectBorrower }) => {
  return (
    <div className="mb-4">
      {borrowers && borrowers.length > 0 ? (
        borrowers.map((borrower) => (
          <div
            key={borrower._id}
            className="bg-gray-700 p-2 rounded-lg mb-2 cursor-pointer"
            onClick={() => onSelectBorrower(borrower)}
          >
            {borrower.borrowerName} - {borrower.borrowerEmail} - {borrower.borrowerPhone} - {borrower.borrowerAddress && borrower.borrowerAddress}
          </div>
        ))
      ) : (
        <div>No borrowers found</div>
      )}
    </div>
  );
};

const DeleteBorrower = ({ onGoHomeClick }) => {
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState('');

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/search?query=${query}`);
      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  };

  const handleSelectBorrower = async (borrower) => {
    setSelectedBorrower(borrower);
  };

  const handleGoHome = () => {
    setSelectedBorrower(null);
    setBorrowers([]);
    setConfirmDelete('');
    onGoHomeClick(); // Call the onGoHomeClick function passed from the parent component
  };

  const handleDelete = async () => {
    if (confirmDelete === 'delete' && selectedBorrower) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/${selectedBorrower._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          alert('Borrower deleted successfully');
          console.log('Borrower deleted successfully!');
          setConfirmDelete('');
          setSelectedBorrower(null);
          setBorrowers([]); // Clear search results after deletion
        }
      } catch (error) {
        console.error('Error deleting borrower:', error);
      }
    } else {
      alert('Please type "delete" in the confirmation box to delete the borrower.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Delete Borrower</h1>
      <SearchBar onSearch={handleSearch} />
      <BorrowerList borrowers={borrowers} onSelectBorrower={handleSelectBorrower} />
      {selectedBorrower && (
        <form onSubmit={(e) => e.preventDefault()} className='w-screen max-w-md'>
          <div className="bg-gray-700 rounded-lg p-4 mt-4">
            <div className="mb-4">
              <label htmlFor="borrower_name" className="block">Name</label>
              <input
                type="text"
                name="borrowerName"
                id="borrower_name"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={selectedBorrower.borrowerName}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm_delete" className="block">Confirm Delete</label>
              <input
                type="text"
                name="confirmDelete"
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

export default DeleteBorrower;
