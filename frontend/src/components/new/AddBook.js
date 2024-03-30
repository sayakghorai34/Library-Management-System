import React, { useState } from 'react';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    price: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
      ,console.log('Form submitted:', JSON.stringify(formData)));

      if (response.ok) {
        alert('Book added successfully!');
        console.log('Book added successfully!');
        setFormData({
          title: '',
          authorName: '',
          category: '',
          price: '',
        });
      } else {
        console.error('Failed to add book:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Add New Book Record</h1>
      <form onSubmit={handleAddBook} className='w-screen max-w-md'>
        <div className='bg-gray-700 rounded-lg p-4 mb-2'> 
          <div className='mb-4'>
            <label htmlFor='title' className='block'>Book Title</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Book Title'
              required
              className='border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='authorName' className='block'>Author Name</label>
            <input
              type='text'
              name='authorName'
              id='authorName'
              placeholder='Author Name'
              required
              className='border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full'
              value={formData.authorName}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='category' className='block'>Category</label>
            <input
              type='text'
              name='category'
              id='category'
              placeholder='Category'
              className='border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full'
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='price' className='block'>Price</label>
            <input
              type='number'
              name='price'
              id='price'
              placeholder='Price'
              className='border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full'
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type='submit' className="bg-blue-700 text-white py-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
