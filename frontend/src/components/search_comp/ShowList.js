import React, { useState } from 'react';

const ShowList = ({ items, onSelectItem, itemType, isVisible }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const handleItemClick = (index) => {
    if (index === selectedItemIndex) {
      setSelectedItemIndex(-1); // Collapse details if clicking on the same item
    } else {
      setSelectedItemIndex(index);
    }
  };

  return (
    <div className={`mb-4 ${isVisible ? 'block' : 'hidden'}`}>
      {items.map((item, index) => (
        <div
          key={item._id}
          className="bg-gray-700 p-2 rounded-lg mb-2 w-screen max-w-md cursor-pointer text-gray-400 hover:bg-opacity-50"
          onClick={() => handleItemClick(index)}
        >
          {itemType === 'book' ? (
            <>
              Title: {item.title}  {item.author.authorName} - {item.category} - {item.price}
            </>
          ) : itemType === 'borrower' ? (
            <>
              {item.borrowerName} - {item.borrowerEmail}
            </>
          ) : itemType === 'author' ? (
            <>
              {item.authorName} - {item.authorEmail}
            </>
          ) : null }
        </div>
      ))}

      {selectedItemIndex !== -1 && (
        <div className="bg-gray-700 p-2 rounded-lg mb-2 w-screen max-w-md cursor-pointer text-gray-400 hover:bg-opacity-50">
          <p className="text-gray-300">Name: {formData.borrowerName}</p>
            <p className="text-gray-300">Email: {formData.borrowerEmail}</p>
            <p className="text-gray-300">Phone: {formData.borrowerPhone}</p>
            <p className="text-gray-300">Address: {formData.borrowerAddress}</p>
          <p>{items[selectedItemIndex].details}</p>
        </div>
      )}
    </div>
  );
};

export default ShowList;
