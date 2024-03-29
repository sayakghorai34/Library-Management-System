import React, { useState } from 'react';

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    books: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeBooks = (e) => {
    const { value } = e.target;
    const booksArray = value.split(',');
    // Pass an empty array to the formData state
    setFormData((prevData) => ({
      ...prevData,
      books: booksArray
    }));
  
  };
  
  

  const handleAddAuthor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/authors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Author added successfully!');
        console.log('Author added successfully!');
        setFormData({
          authorName: '',
          authorEmail: '',
          authorPhone: '',
          books: []
        });
      } else {
        console.error('Failed to add Author:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding Author:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Add Author</h1>
      <form onSubmit={handleAddAuthor} className="bg-gray-700 w-screen max-w-md rounded-lg p-4">
        <div className="mb-6">
          <label align='left' htmlFor="author_name" className="block">Name</label>
          <input
            type="text"
            name="authorName"
            id="author_name"
            placeholder="Author's Name"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full max-w-md"
            value={formData.authorName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label align='left' htmlFor="author_email" className="block">Email</label>
          <input
            type="email"
            name="authorEmail"
            id="author_email"
            placeholder="author's Email"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={formData.authorEmail}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label align='left' htmlFor="author_phone" className="block">Phone No</label>
          <input
            type="tel"
            name="authorPhone"
            id="author_phone"
            placeholder="author's Phone No"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={formData.authorPhone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label align='left' htmlFor="books" className="block">Books (Comma-separated)</label>
          <input
            type="text"
            name="books"
            id="books"
            placeholder="Book names comma separated"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={formData.books}
            onChange={handleChangeBooks}
          />

        </div>
        
        <div className="mt-6">
          <button type="submit" className="bg-blue-700 text-white py-3 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
            Add Author
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
