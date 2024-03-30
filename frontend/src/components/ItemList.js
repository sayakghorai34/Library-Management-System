import React, { useState } from 'react';


const ItemList = ({ items, onSelectItem, itemType, isVisible }) => {
    return (
      <div className={`mb-4 ${isVisible ? 'block' : 'hidden'}`}>
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-gray-700 p-2 rounded-lg mb-2 w-screen max-w-22 cursor-pointer"
            onClick={() => onSelectItem(item)}
          >
            {itemType === 'book' ? (
              <>
                {item.title} - {item.author.authorName} - {item.category} - {item.price}
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
export default ItemList;