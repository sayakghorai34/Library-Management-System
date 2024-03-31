import React, { useState } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [showBookList, setShowBookList] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    price: '',
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/search?query=${query}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleSelectBook = async (book) => {
    setSelectedBook(book);
    setShowBookList(false);
    setFormData({
      title: book.title,
      authorName: book?.author.authorName || '', 
      category: book.category || '', 
      price: book.price ? book.price.toString() : '', 
    });
  };

  const handleReset = () => {
    setFormData({
      title: '',
      authorName: '',
      category: '',
      price: ''
    });
    setBooks([]);
    setSelectedBook(null);
    setShowBookList(true);
    setConfirmDelete('');
  };

  const handleDelete = async () => {
    if (confirmDelete === 'delete' && selectedBook) {
      const { _id: bookId, author } = selectedBook

      const requestBody = {
        bookId,
        authorId: author._id,
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          alert('Book deleted successfully');
          console.log('Book deleted successfully!');
          setConfirmDelete('');
          setSelectedBook(null);
          setBooks([]);
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    } else {
      alert('Please type "delete" in the confirmation box to delete the book.');
    }
  };

  return (
    <div className="p-14">
      <h1 className="text-2xl font-bold text-center mb-6">Delete Book</h1>
      {!selectedBook ? (<>
      <SearchBar onSearch={handleSearch} selectedItem={selectedBook} placeholder="Search Books..." />
      <ItemList items={books} onSelectItem={handleSelectBook} itemType="book" isVisible={showBookList} />
      </>): (
        <>
      <form className='w-screen max-w-md'>
        <div className="bg-gray-700 rounded-lg p-4 mb-2">
          <div className="mb-4">
            <label htmlFor="title" className="block">Book Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Book Title"
              required
              readOnly
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.title}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="authorName" className="block">Author Name</label>
            <input
              type="text"
              name="authorName"
              id="authorName"
              placeholder="Author Name"
              required
              readOnly
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.authorName}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.category}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              required
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.price}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm_delete" className="block">Price</label>
            <input
              type="text"
              name="confirm_delete"
              id="confirm_delete"
              placeholder="Type 'delete' to confirm"
              required
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              onChange={(e) => setConfirmDelete(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="mt-2">
        <button onClick={handleReset} className="bg-blue-700 text-white py-4 mb-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
          Cancel
        </button>
        <button onClick={handleDelete} className="bg-red-100 text-red-500 py-4 mb-4 w-full rounded font-semibold hover:bg-red-200 ring-2 ring-red-300 focus:ring-4 focus:ring-red-500">
          Delete
        </button>
        </div>
      </>)}
    </div>
  );
};

export default DeleteBook;
