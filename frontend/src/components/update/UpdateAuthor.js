import React, { useState, useEffect } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';

const UpdateAuthor = () => {
  const [showAuthorList, setShowAuthorList] = useState(true);
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorPhone: ''
  });

  const [authors, setAuthors] = useState([]);

  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleSearch = async (query) => {
    try {
        // console.log('Query:', query);
        const response = await fetch(`${process.env.REACT_APP_API_URI}/authors/search?query=${query}`);
        const data = await response.json();
        setAuthors(data);
    } 
    catch (error) {
        console.error('Error fetching authors:', error);
        setAuthors([]);
    }
  };

  const handleSelectAuthor = async (author) => {
    setSelectedAuthor(author);
    try {
      setFormData({
        authorName: author.authorName,
        authorEmail: author.authorEmail,
        authorPhone: author.authorPhone
      });
    } catch (error) {
      setFormData({
        authorName: author.authorName,
        authorEmail: '',
        authorPhone: ''
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
      const response = await fetch(`${process.env.REACT_APP_API_URI}/authors/${selectedAuthor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Author updated successfully');
        console.log('Author updated successfully!');
        setFormData({
            authorName: '',
            authorEmail: ''
        });
        setAuthors([]);
        setSelectedAuthor(null);
      }
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      authotName: '',
      authorEmail: '',
      authorPhone: ''
    });
    setSelectedAuthor(null);
    setAuthors([]);
    setShowAuthorList(true);
  };

  useEffect(() => {
    if (selectedAuthor) {
      setFormData({
        authorName: selectedAuthor.authorName,
        authorEmail: selectedAuthor.authorEmailEmail,
        authorPhone: selectedAuthor.authorPhone
      });
    }
  }, [selectedAuthor]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Update Author</h1>
      
      
      {!selectedAuthor? (
      <div className='text-gray-500'>
        <SearchBar onSearch={handleSearch} placeholder="Search Authors..."/>
        <ItemList items={authors} onSelectItem={handleSelectAuthor} isVisible={showAuthorList} itemType="author" /> 
      </div>): (
      <>
        <form onSubmit={handleSubmit} className='w-screen max-w-md'>
          <div className="bg-gray-700 rounded-lg p-4 mt-4">
            <div className="mb-4">
              <label htmlFor="author_name" className="block">Name</label>
              <input
                type="text"
                name="authorName"
                id="author_name"
                placeholder="Authors's Name"
                className="border  bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.authorName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author_email" className="block">Email</label>
              <input
                type="email"
                name="authorEmail"
                id="author_email"
                placeholder="Author's Email"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.authorEmail}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author_phone" className="block">Phone</label>
              <input
                type="tel"
                name="authorPhone"
                id="author_phone"
                placeholder="Author's Phone Number"
                className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
                value={formData.authorPhone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-blue-700 text-white py-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
              Update Author
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

export default UpdateAuthor;
