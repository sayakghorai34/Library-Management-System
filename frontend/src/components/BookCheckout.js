import React, { useState } from 'react';

const BookCheckout = () => {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    bookId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    if (!formData.borrowerEmail && !formData.borrowerPhone) {
      alert('Please enter either email or phone number.');
      return;
    }
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
        <div className='p-14'>
          <h1 className='text-2xl font-bold text-center mb-6'>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className='bg-gray-700 rounded-lg p-4 mb-2'> 
              <div className='mb-4'>
                <label htmlFor='borrower_name' className='block'>Name</label>
                <input
                  type='text'
                  name='borrowerName'
                  id='borrower_name'
                  placeholder="Borrower's Name"
                  className='border bg-gray-200 border-gray-300 rounded-lg p-4 w-full'
                  value={formData.borrowerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='borrower_email' className='block'>Email</label>
                <input
                  type='text'
                  name='borrowerEmail'
                  id='borrower_email'
                  placeholder="Borrower's Email"
                  className='border bg-gray-200 border-gray-300 rounded-lg p-4 w-full'
                  value={formData.borrowerEmail}
                  onChange={handleChange}
                  pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='borrower_phone' className='block'>Phone No</label>
                <input
                  type='tel'
                  name='borrowerPhone'
                  id='borrower_phone'
                  placeholder="Borrower's Phone No"
                  className='border bg-gray-200 border-gray-300 rounded-lg p-4 w-full'
                  value={formData.borrowerPhone}
                  onChange={handleChange}
                  pattern='^[0-9]+$'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='book_id' className='block'>Book ID</label>
                <input
                  type='text'
                  name='bookId'
                  id='book_id'
                  placeholder="Book ID"
                  className='border bg-gray-200 border-gray-300 rounded-lg p-4 w-full'
                  value={formData.bookId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type='submit' className="bg-blue-700 text-white py-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
              Check Out Book
            </button>
          </form>
        </div>
  );
};

export default BookCheckout;
