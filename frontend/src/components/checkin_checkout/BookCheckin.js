import React, {lazy,useState,startTransition } from "react";

const SearchBar = lazy(() => import("../search_comp/SearchBar"));
const ItemList = lazy(() => import("../search_comp/ItemList"));
const FormComp = lazy(() => import("../search_comp/FormComp"));

const CheckinBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmCheckin, setConfirmCheckin] = useState("");
  const [showBookList, setShowBookList] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    borrowerName: "",
    category: "",
    price: "",
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/books/searchin?query=${query}`
      );
      const data = await response.json();
      // console.log(data);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  const handleSelectBook = async (book) => {
    startTransition(() => {
      setSelectedBook(book);
      setShowBookList(false);
      setFormData({
        title: book.title,
        borrowerName: book.borrower.borrowerName || "",
        category: book.category || "",
        price: book.price ? book.price.toString() : "",
      });
    });
    try {
      const borrowerId = book.borrower;
      if (!borrowerId) {
        throw new Error("Borrower ID not found");
      }
    } catch (error) {
      console.error("Error fetching borrower details:", error);
      setFormData({
        title: book.title,
        borrowerName: "",
        category: book.category || "",
        price: book.price || "",
      });
    }
  };

  const handleReset = () => {
    startTransition(() => {
      setSelectedBook(null);
      setShowBookList(true);
      setBooks([]);
      setConfirmCheckin("");
    });
  };

  const handleCheckin = async () => {
    if (confirmCheckin === "checkin" && selectedBook) {
      const { _id: bookId, borrower } = selectedBook;

      const requestBody = {
        bookId,
        borrowerId: borrower || null,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/books/checkin`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.ok) {
          alert("Book checked in successfully");
          console.log("Book checked in successfully!");
          setConfirmCheckin("");
          setSelectedBook(null);
          setShowBookList(true);
          setBooks([]);
        } else {
          throw new Error("Failed to check in book");
        }
      } catch (error) {
        console.error("Error checking in book:", error);
      }
    } else {
      alert(
        'Please type "checkin" in the confirmation box to check in the book.'
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Book Checkin</h1>
      {!selectedBook ? (
        <>
          <SearchBar
            onSearch={handleSearch}
            selectedItem={selectedBook}
            placeholder="Search Books..."
          />
          <ItemList
            items={books}
            onSelectItem={handleSelectBook}
            itemType="bookcheckin"
            isVisible={showBookList}
          />
        </>
      ) : (
        <>
          <FormComp
            form_data={formData}
            setConfirm={setConfirmCheckin}
            handler={handleCheckin}
            type="checkin"
          />
          <div className="mt-2">
            <button
              type="button"
              className="bg-red-100 text-red-500 py-4 mb-4 w-full rounded font-semibold hover:bg-red-200 ring-2 ring-red-300 focus:ring-4 focus:ring-red-500 focus:cursor-alias"
              onClick={handleReset}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckinBook;
