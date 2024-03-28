import React, { useState } from 'react';
import Header from './components/Header.js';
import AddBook from './components/AddBook.js';
import AddBorrower from './components/AddBorrower.js';
import BookCheckin from './components/BookCheckin.js';
import BookCheckout from './components/BookCheckout.js';
import UpdateBorrower from './components/UpdateBorrower.js';
import UpdateAuthor from './components/UpdateAuthor.js';
import UpdateBook from './components/UpdateBook.js';
import DeleteBorrower from './components/DeleteBorrower.js';
import DeleteBook from './components/DeleteBook.js';
import Home from './components/Home.js';
import AddAuthor from './components/AddAuthor.js';

function App() {
  const [activeForm, setActiveForm] = useState('goToHome'); // Track the currently active form
  // const [showHomePage, setShowHomePage] = useState(false); // Track if the homepage should be shown

  const handleButtonClick = (formName) => {
    setActiveForm(formName);
  };

  const handleGoHomeClick = () => {
    // setShowHomePage(true); // Show the homepage
    setActiveForm('goToHome'); // Set the active form to 'goToHome'
  };

  return (
    <div className="App">
      <Header
        onAddBookClick={() => handleButtonClick('addBook')}
        onAddBorrowerClick={() => handleButtonClick('addBorrower')}
        onAddAuthorClick={() => handleButtonClick('addAuthor')}
        onUpdateBookClick={() => handleButtonClick('updateBook')}
        onUpdateBorrowerClick={() => handleButtonClick('updateBorrower')}
        onUpdateAuthorClick={() => handleButtonClick('updateAuthor')}
        onDeleteBookClick={() => handleButtonClick('deleteBook')}
        onDeleteBorrowerClick={() => handleButtonClick('deleteBorrower')}
        onCheckinClick={() => handleButtonClick('checkinBook')}
        onCheckoutClick={() => handleButtonClick('checkoutBook')}
        onGoHomeClick={handleGoHomeClick} 
        goHome={handleGoHomeClick}
      />
      <div className="min-h-screen text-white flex justify-center items-center">
        <div className="bg-gray-800 rounded-lg shadow-gray-700 shadow-2xl max-w-md">
          {activeForm === 'addBook' && <AddBook />}
          {activeForm === 'addBorrower' && <AddBorrower />}
          {activeForm === 'addAuthor' && <AddAuthor />}
          {activeForm === 'updateBook' && <UpdateBook />}
          {activeForm === 'updateAuthor' && <UpdateAuthor />}
          {activeForm === 'updateBorrower' && <UpdateBorrower />}
          {activeForm === 'deleteBorrower' && <DeleteBorrower onGoHomeClick={handleGoHomeClick} />} 
          {activeForm === 'deleteBook' && <DeleteBook onGoHomeClick={handleGoHomeClick} />}
          {activeForm === 'checkinBook' && <BookCheckin onGoHomeClick={handleGoHomeClick} />}
          {activeForm === 'checkoutBook' && <BookCheckout />}
          {activeForm === 'goToHome' && <Home />}
        </div>
      </div>
    </div>
  );
}

export default App;
