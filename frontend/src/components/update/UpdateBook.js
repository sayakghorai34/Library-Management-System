import React, { useState, useEffect } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';


const UpdateBook = () => {
  const [formData, setFormData] = useState({
    bookId: '',
    title: '',
    authorName: '',
    category: '',
    price: '',
    preAuthorID: ''
  });

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookList, setShowBookList] = useState(true);

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
    const authorId = book.author?._id; 
    if (!authorId) {
      throw new Error('Author ID not found');
    }
    setShowBookList(false);
    setFormData({
      bookId: book._id,
      title: book.title,
      authorName: book?.author.authorName || '', 
      category: book.category || '', 
      price: book.price ? book.price.toString() : ''
    });
  };

  const handleReset = () => {
    setFormData({
      bookId: '',
      title: '',
      authorName: '',
      category: '',
      price: '',
      preAuthorID: ''
    });
    setBooks([]);
    setSelectedBook(null);
    setShowBookList(true);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Book updated successfully');
        console.log('Book updated successfully!');
        setSelectedBook(null);
        setShowBookList(true);
        setBooks([]);
        setFormData({
          bookId: '',
          title: '',
          authorName: '',
          category: '',
          price: '',
          preAuthorID: ''
        })};
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        bookId: selectedBook._id,
        title: selectedBook.title,
        authorName: selectedBook.authorName,
        category: selectedBook.category,
        price: selectedBook.price.toString()
      });
    }
  }, [selectedBook]);

  return (
    <div className="p-14">
      <h1 className="text-2xl font-bold text-center mb-6">Update Book Details</h1>
      {!selectedBook ? (<>
      <SearchBar onSearch={handleSearch} selectedItem={selectedBook} placeholder="Search Books..." />
      <ItemList items={books} onSelectItem={handleSelectBook} itemType="book" isVisible={showBookList} />
      </>): (
        <>
      <form onSubmit={handleSubmit} className='w-screen max-w-md'>
        <div className="bg-gray-700 rounded-lg p-4 mb-2">
          <div className="mb-4">
            <label htmlFor="title" className="block">Book Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Book Title"
              required
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.title}
              onChange={handleChange}
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
              className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
              value={formData.authorName}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-700 text-white py-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
          Update Book
        </button>
      </form>
      <div className="mt-2">
        <button onClick={handleReset} className="bg-red-100 text-red-500 py-4 mb-4 w-full rounded font-semibold hover:bg-red-200 ring-4 ring-red-300 focus:ring-4 focus:ring-red-500 focus:cursor-alias">
          Cancel
        </button>
        </div>
      </>)}
    </div>
  );
};

export default UpdateBook;
