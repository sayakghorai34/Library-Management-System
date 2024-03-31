import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../search_comp/SearchBar';

const ShowItemList = ({ items, openItems, toggleItem }) => {
  return (
    <div className="mb-4">
      {items.map((item, index) => (
        <div
          key={item._id}
          className="bg-gray-700 p-2 rounded-lg mb-2 w-screen max-w-md cursor-pointer text-gray-400 hover:bg-opacity-55"
          onClick={() => toggleItem(index)}
        >
          {openItems.includes(index) ? (
            <div className="bg-gray-700 p-2 text-left rounded-lg cursor-pointer text-gray-400 hover:bg-opacity-50">
              <p className="text-gray-300">Name: {item.borrowerName}</p>
              <p className="text-gray-300">Email: {item.borrowerEmail}</p>
              <p className="text-gray-300">Phone: {item.borrowerPhone}</p>
              <p className="text-gray-300">Address: {item.borrowerAddress}</p>
            </div>
          ) : (
            <>{item.borrowerName} - {item.borrowerEmail}</>
          )}
        </div>
      ))}
    </div>
  );
};

const ShowBorrowers = ({ type }) => {
  const initialBorrowersState = [];
  const [borrowers, setBorrowers] = useState(initialBorrowersState);
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(index)) {
        return prevOpenItems.filter((itemIndex) => itemIndex !== index);
      } else {
        return [...prevOpenItems, index];
      }
    });
  };

  const handleSearch = useCallback(async (query) => {
    try {
      let response = null;
      if (type === 'all') {
        response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/search?query=${query}`);
      } else if (type === 'withoutbooks') {
        response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/searchdel?query=${query}`);
      }

      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  }, [type]);

  const handleClearSearch = () => {
    setSearchQuery('');
    handleSearch('');
    setBorrowers(initialBorrowersState);
    setOpenItems([]);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]); 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Borrower List</h1>
      <div className='text-gray-500'>
        <div className="flex justify-center mb-4 w-full max-w-md" align="center">
          <SearchBar onSearch={setSearchQuery} placeholder={"Search Borrower..."} value={searchQuery} className='mb-0'/>
          <button onClick={handleClearSearch} className="ml-1 mb-4 px-4 py-2 rounded-full font-bold bg-red-100 text-red-700 hover:bg-red-300 focus:ring-2 focus:ring-red-300">X</button>
        </div>
        <div className="w-full max-w-md">
          <ShowItemList items={borrowers} openItems={openItems} toggleItem={toggleItem} />
        </div>
      </div>
    </div>
  );
};

export default ShowBorrowers;