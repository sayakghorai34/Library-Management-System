import React, { useState } from 'react';

const AddBorrower = () => {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    borrowerAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBorrower = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Borrower added successfully!');
        console.log('Borrower added successfully!');
        // Clear form data after successful submission if needed
        setFormData({
          borrowerName: '',
          borrowerEmail: '',
          borrowerPhone: '',
          borrowerAddress: '',
        });
      } else {
        console.error('Failed to add borrower:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding borrower:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Add Borrower</h1>
      <form onSubmit={handleAddBorrower} className="bg-gray-700 rounded-lg w-screen max-w-md p-6">
        <div className="mb-6">
          <label htmlFor="borrower_name" className="block">Name</label>
          <input
            type="text"
            name="borrowerName"
            id="borrower_name"
            placeholder="Borrower's Name"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-3 w-full"
            value={formData.borrowerName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="borrower_email" className="block">Email</label>
          <input
            type="email"
            name="borrowerEmail"
            id="borrower_email"
            placeholder="Borrower's Email"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-3 w-full"
            value={formData.borrowerEmail}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="borrower_phone" className="block">Phone No</label>
          <input
            type="tel"
            name="borrowerPhone"
            id="borrower_phone"
            placeholder="Borrower's Phone No"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-3 w-full"
            value={formData.borrowerPhone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="borrower_address" className="block">Address</label>
          <input
            type="text"
            name="borrowerAddress"
            id="borrower_address"
            placeholder="Borrower's Address"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-3 w-full"
            value={formData.borrowerAddress}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-blue-700 text-white py-3 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
            Add Borrower
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBorrower;
