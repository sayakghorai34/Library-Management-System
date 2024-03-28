import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search book..."
        className="border bg-gray-200 border-gray-300 rounded-lg p-2 w-64 mr-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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

const BookList = ({ books, onSelectBook }) => {
  return (
    <div className="mb-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-gray-700 p-2 rounded-lg mb-2 cursor-pointer"
          onClick={() => onSelectBook(book)}
        >
          {book.title} - {book.authorName} - {book.category} - {book.price}
        </div>
      ))}
    </div>
  );
};

const UpdateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    price: '',
  });

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

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
    try {
      const authorId = book.author?._id; 
      if (!authorId) {
        throw new Error('Author ID not found');
      }
  
      const authorResponse = await fetch(`${process.env.REACT_APP_API_URI}/authors/${authorId}`);
      if (!authorResponse.ok) {
        throw new Error('Error fetching author details');
      }
      
      const authorData = await authorResponse.json();
      setFormData({
        title: book.title,
        authorName: authorData?.authorName || '', 
        category: book.category || '', 
        price: book.price ? book.price.toString() : '', 
      });
    } catch (error) {
      console.error('Error fetching author details:', error);
      setFormData({
        title: book.title,
        authorName: '', 
        category: '', 
        price: '', 
      });
    }
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
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/${selectedBook._id}`, {
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
        setBooks([]);
        setFormData({
          title: '',
          authorName: '',
          category: '',
          price: ''
        })};
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        authorName: selectedBook.authorName,
        category: selectedBook.category,
        price: selectedBook.price.toString(),
      });
    }
  }, [selectedBook]);

  return (
    <div className="p-14">
      <h1 className="text-2xl font-bold text-center mb-6">Update Book Details</h1>
      <div className="text-gray-500">
        <SearchBar onSearch={handleSearch} />
        <BookList books={books} onSelectBook={handleSelectBook} />
      </div>
      {selectedBook && (<form onSubmit={handleSubmit}>
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
      </form>)}
    </div>
  );
};

export default UpdateBook;
