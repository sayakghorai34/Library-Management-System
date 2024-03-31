import React, { useState } from "react";

import Home from "./components/Home.js";
import Header from "./components/Header.js";

import AddBook from "./components/new/AddBook.js";
import AddAuthor from "./components/new/AddAuthor.js";
import AddBorrower from "./components/new/AddBorrower.js";

import BookCheckin from "./components/checkin_checkout/BookCheckin.js";
import BookCheckout from "./components/checkin_checkout/BookCheckout.js";

import UpdateBorrower from "./components/update/UpdateBorrower.js";
import UpdateAuthor from "./components/update/UpdateAuthor.js";
import UpdateBook from "./components/update/UpdateBook.js";

import DeleteBorrower from "./components/delete/DeleteBorrower.js";
import DeleteBook from "./components/delete/DeleteBook.js";

import ShowBorrowers from "./components/show/ShowBorrowers.js";
import ShowBooks from "./components/show/ShowBooks.js";
import ShowAuthors from "./components/show/ShowAuthors.js";

function App() {
  const [activeForm, setActiveForm] = useState("goToHome");

  const handleButtonClick = (formName) => {
    setActiveForm(formName);
  };

  const handleGoHomeClick = () => {
    setActiveForm("goToHome");
  };

  return (
    <div className="App">
      <Header
        onAddBookClick={() => handleButtonClick("addBook")}
        onAddBorrowerClick={() => handleButtonClick("addBorrower")}
        onAddAuthorClick={() => handleButtonClick("addAuthor")}
        onUpdateBookClick={() => handleButtonClick("updateBook")}
        onUpdateBorrowerClick={() => handleButtonClick("updateBorrower")}
        onUpdateAuthorClick={() => handleButtonClick("updateAuthor")}
        onDeleteBookClick={() => handleButtonClick("deleteBook")}
        onDeleteBorrowerClick={() => handleButtonClick("deleteBorrower")}
        onCheckinClick={() => handleButtonClick("checkinBook")}
        onCheckoutClick={() => handleButtonClick("checkoutBook")}
        goHome={handleGoHomeClick}
      />
      <div
        className="min-h-screen text-white flex justify-center items-center"
        align="center"
      >
        <div className="bg-gray-800 rounded-lg shadow-gray-700 justify-center shadow-2xl max-w-fit">
          {activeForm === "addBook" && <AddBook />}
          {activeForm === "addBorrower" && <AddBorrower />}
          {activeForm === "addAuthor" && <AddAuthor />}
          {activeForm === "updateBook" && <UpdateBook />}
          {activeForm === "updateAuthor" && <UpdateAuthor />}
          {activeForm === "updateBorrower" && <UpdateBorrower />}
          {activeForm === "deleteBorrower" && <DeleteBorrower />}
          {activeForm === "deleteBook" && <DeleteBook />}
          {activeForm === "checkinBook" && <BookCheckin />}
          {activeForm === "checkoutBook" && <BookCheckout />}
          {activeForm === "goToHome" && (
            <Home
              showBooks={() => handleButtonClick("totalBooks")}
              showAuthors={() => handleButtonClick("totalAuthors")}
              showBorrowers={() => handleButtonClick("totalBorrowers")}
              showBorrowersWithoutBook={() => handleButtonClick("borrowersWithoutBook")}
              showCheckoutBooks={() => handleButtonClick("chckoutBook")}
              showRemainingBooks={() => handleButtonClick("remainingBooks")}
            />
          )}
          {activeForm === "totalBorrowers" && <ShowBorrowers type="all"/>}
          {activeForm === "borrowersWithoutBook" && <ShowBorrowers type="withoutbooks"/>}
          {activeForm === "totalBooks" && <ShowBooks type="all"/>}
          {activeForm === "chckoutBook" && <ShowBooks type="borrowed"/>}
          {activeForm === "remainingBooks" && <ShowBooks type="available"/>}
          {activeForm === "totalAuthors" && <ShowAuthors/>}
        </div>
      </div>
    </div>
  );
}

export default App;
