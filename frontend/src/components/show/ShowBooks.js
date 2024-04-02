import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../search_comp/SearchBar";

const ShowItemList = ({ items, openItems, toggleItem, type }) => {
  return (
    <div className="mb-4">
      {items.map((item, index) => (
        <div
          key={item._id}
          className="bg-gray-700 p-2 rounded-lg mb-2 w-screen max-w-md cursor-pointer text-gray-400 hover:bg-opacity-55"
          onClick={() => toggleItem(index)}
        >
          {(type === "all" || type === "available" )? (
            <>
              {openItems.includes(index) ? (
                <div className="bg-gray-700 p-2 text-left rounded-lg cursor-pointer text-gray-400 hover:bg-opacity-50">
                  <p className="text-gray-300">Title: {item.title}</p>
                  {item.author && (
                    <>
                    <p className="text-gray-300">Author: {item.author.authorName}</p>
                    <p className="text-gray-300">Author Email: {item.author.authorEmail}</p>
                    </>
                  )}
                  <p className="text-gray-300">Category: {item.category}</p>
                  <p className="text-gray-300">Price: {item.price}</p>
                </div>
              ) : (
                <>
                  {item.title} - {item.author && item.author.authorName} - {item.category}
                </>
              )}
            </>
          ) : type ==="borrowed"? (
            <>
              {openItems.includes(index) ? (
                <div className="bg-gray-700 p-2 text-left rounded-lg cursor-pointer text-gray-400 hover:bg-opacity-50">
                  <p className="text-gray-300">Title: {item.title}</p>
                  {item.author && (
                    <p className="text-gray-300">Author: {item.author.authorName}</p>
                  )}
                  <p className="text-gray-300">Category: {item.category}</p>
                  <p className="text-gray-300">Price: {item.price}</p>
                  {item.borrower && (
                    <>
                      <p className="text-gray-300">Borrower: {item.borrower.borrowerName}</p>
                      <p className="text-gray-300">Borrower Email: {item.borrower.borrowerEmail}</p>
                      <p className="text-gray-300">Borrower Phone: {item.borrower.borrowerPhone}</p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {item.title} - {item.author && item.author.authorName} - Borrower- {item.borrower && item.borrower.borrowerName}
                </>
              )}
            </>
          ):(<></>)}
        </div>
      ))}
    </div>
  );
};


const ShowBooks = ({ type }) => {
  const initialBoooksState = [];
  const [books, setBooks] = useState(initialBoooksState);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = useCallback(
    async (query) => {
      try {
        let response = null;
        if (type === "all") {
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/books/search?query=${query}`
          );
        } else if (type === "borrowed") {
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/books/searchin?query=${query}`
          );
        } else if (type === "available") {
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/books/searchout?query=${query}`
          );
        }

        const data = await response.json();
        // console.log("Response:", data);
        setBooks(data);
      } catch (error) {
        console.error("Error fetching borrowers:", error);
        setBooks([]);
      }
    },
    [type]
  );

  const handleClearSearch = () => {
    setSearchQuery("");
    handleSearch("");
    setBooks(initialBoooksState);
    setOpenItems([]);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Book List</h1>
      <div className="text-gray-500">
        <div
          className="flex justify-center mb-4 w-full max-w-md"
          align="center"
        >
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={"Search Books..."}
            value={searchQuery}
            className="mb-0"
          />
          <button
            onClick={handleClearSearch}
            className="ml-1 mb-4 px-4 py-2 rounded-full font-bold bg-red-100 text-red-700 hover:bg-red-300 focus:ring-2 focus:ring-red-300"
          >
            X
          </button>
        </div>
        <div className="w-full max-w-md">
          <ShowItemList
            items={books}
            openItems={openItems}
            toggleItem={toggleItem}
            type={type}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
