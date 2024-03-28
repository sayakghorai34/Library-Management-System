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
        placeholder="Search author..."
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

const AuthorList = ({ authors, onSelectAuthor }) => {
  return (
    <div className="mb-4">
      {
        authors.map((author) => (
          <div
            key={author._id}
            className="bg-gray-700 p-2 rounded-lg mb-2 cursor-pointer"
            onClick={() => onSelectAuthor(author)}
          >
            {author.authorName} - {author.authorEmail && author.authorEmail}
          </div>
        ))
        }
    </div>
  );};



const UpdateBorrower = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: ''
  });

  const [authors, setAuthors] = useState([]); // Changed from setUsers to setBorrowers

  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleSearch = async (query) => {
    try {
        console.log('Query:', query);
        const response = await fetch(`${process.env.REACT_APP_API_URI}/authors/search?query=${query}`);
        const data = await response.json();
        setAuthors(data); // Changed from setUsers to setBorrowers
    } 
    catch (error) {
        console.error('Error fetching authors:', error);
        setAuthors([]); // Ensure authors is set to an empty array in case of error
    }
  };

  const handleSelectAuthor = async (author) => {
    setSelectedAuthor(author);
    try {
      setFormData({
        authorName: author.authorName,
        authorEmail: author.authorEmail
      });
    } catch (error) {
      setFormData({
        authorName: author.authorName,
        authorEmail: ''
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
        setAuthors([]); // Changed from setUsers to setBorrowers
      }
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  useEffect(() => {
    if (selectedAuthor) {
      setFormData({
        authorName: selectedAuthor.authorName,
        authorEmail: selectedAuthor.authorEmailEmail
      });
    }
  }, [selectedAuthor]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Update Author</h1>
      <div className='text-gray-500'>
        <SearchBar onSearch={handleSearch} />
        <AuthorList authors={authors} onSelectAuthor={handleSelectAuthor} /> 
      </div>
      {selectedAuthor && (<form onSubmit={handleSubmit}>
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
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-700 text-white py-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500">
            Update Author
          </button>
        </div>
      </form>)}
    </div>
  );
};

export default UpdateBorrower;
