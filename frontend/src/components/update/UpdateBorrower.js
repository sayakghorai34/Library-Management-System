import React, { useState, useEffect } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';

const UpdateBorrower = () => {
  const [showBorrowerList, setShowBorrowerList] = useState(true);
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    borrowerAddress: '',
  });

  const [borrowers, setBorrowers] = useState([]);

  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/search?query=${query}`);
      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  };

  const handleSelectBorrower = async (borrower) => {
    setSelectedBorrower(borrower);
    try {
      setFormData({
        borrowerName: borrower.borrowerName,
        borrowerEmail: borrower.borrowerEmail,
        borrowerPhone: borrower.borrowerPhone,
        borrowerAddress: borrower.borrowerAddress || ''
      });
      setShowBorrowerList(false);
    } catch (error) {
      setFormData({
        borrowerName: borrower.borrowerName,
        borrowerEmail: '',
        borrowerPhone: '',
        borrowerAddress: ''
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
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/${selectedBorrower._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Borrower updated successfully');
        console.log('Borrower updated successfully!');
        setFormData({
          borrowerName: '',
          borrowerEmail: '',
          borrowerPhone: '',
          borrowerAddress: '',
        });
        setBorrowers([]);
        setSelectedBorrower(null);
        setShowBorrowerList(true);
       }
    } catch (error) {
      console.error('Error updating borrower:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      borrowerName: '',
      borrowerEmail: '',
      borrowerPhone: '',
      borrowerAddress: '',
    });
    setBorrowers([]);
    setSelectedBorrower(null);
    setShowBorrowerList(true);
  };

  useEffect(() => {
    if (selectedBorrower) {
      setFormData({
        borrowerName: selectedBorrower.borrowerName,
        borrowerEmail: selectedBorrower.borrowerEmail,
        borrowerPhone: selectedBorrower.borrowerPhone,
        borrowerAddress: selectedBorrower.borrowerAddress || ''
      });
    }
  }, [selectedBorrower]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Update Borrower</h1>
      {!selectedBorrower ? (<div className='text-gray-500'>
        <SearchBar onSearch={handleSearch} placeholder={"Search Borrower..."} />
        <ItemList items={borrowers} onSelectItem={handleSelectBorrower} isVisible={showBorrowerList} itemType="borrower" /> {/* Changed onSelectUser to onSelectBorrower */}
      </div>)
      : (
        <>
        <form onSubmit={handleSubmit} className='w-screen max-w-md'>
          <div className="bg-gray-700 rounded-lg p-4 mt-4">
            <div className="mb-4">
              <label htmlFor="borrower_name" className="block">Name</label>
              <input
                type="text"
                name="borrowerName"
                id="borrower_name"
                placeholder="Borrower's Name"
                className="border  bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.borrowerName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="borrower_email" className="block">Email</label>
              <input
                type="email"
                name="borrowerEmail"
                id="borrower_email"
                placeholder="Borrower's Email"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.borrowerEmail}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="borrower_phone" className="block">Phone No</label>
              <input
                type="tel"
                name="borrowerPhone"
                id="borrower_phone"
                placeholder="Borrower's Phone No"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.borrowerPhone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="borrower_address" className="block">Address</label>
              <input
                type="text"
                name="borrowerAddress"
                id="borrowerAddress"
                placeholder="Borrower's Address"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.borrowerAddress}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-blue-700 text-white py-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
              Update Borrower
            </button>
          </div>
          
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

export default UpdateBorrower;
