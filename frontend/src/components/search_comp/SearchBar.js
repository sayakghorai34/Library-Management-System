import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch, selectedItem }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(searchQuery);
    };
  
    return (
      <div className="flex justify-center mb-4">
        {selectedItem ? (
          <div className="border text-gray-500 bg-gray-200 border-gray-300 rounded-md p-2 w-64 mr-2">
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

export default SearchBar;