import React, { useState, useRef, useEffect } from 'react';
import Logo from '../app_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBook, faUser, faEdit, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onAddBookClick, onAddBorrowerClick, onAddAuthorClick, onUpdateBookClick, onUpdateBorrowerClick, onDeleteBookClick, onDeleteBorrowerClick, onUpdateAuthorClick, onCheckinClick, onCheckoutClick, goHome }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [isDeleteDropdownOpen, setIsDeleteDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const updateDropdownRef = useRef(null);
  const deleteDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (updateDropdownRef.current && !updateDropdownRef.current.contains(event.target)) {
      setIsUpdateDropdownOpen(false);
    }
    if (deleteDropdownRef.current && !deleteDropdownRef.current.contains(event.target)) {
      setIsDeleteDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUpdateDropdown = () => {
    setIsUpdateDropdownOpen(!isUpdateDropdownOpen);
  };

  const toggleDeleteDropdown = () => {
    setIsDeleteDropdownOpen(!isDeleteDropdownOpen);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-4 rounded-t-lg">
      <div className="container mx-auto flex items-left">
      <h1 onClick={goHome} className="flex items-center text-blue-300 text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide ml-auto justify-start hover:cursor-pointer focus:cursor-alias ">
        <img src={Logo} alt="Logo" className="mr-2 w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
        <span className="hidden lg:block">Library Manager</span>
      </h1>
        <div className="flex space-x-2 ml-auto justify-end">
          <div className="relative inline-block" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="bg-blue-900 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-600">
              <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="mr-2" /> New
            </button>
            <div className={`absolute z-10 mt-2 w-52 bg-white shadow-lg rounded-md ${isDropdownOpen ? 'block' : 'hidden'} transition duration-300 transform-gpu origin-top`} >
              <div className="py-1">
                <button onClick={onAddBookClick} className="block w-full px-1 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faBook} className="mr-2" /> Add New Book
                </button>
                <button onClick={onAddAuthorClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faUser} className="mr-1" /> Add New Author
                </button>
                <button onClick={onAddBorrowerClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faUser} className="mr-1" /> Add New Borrower
                </button>
              </div>
            </div>
          </div>

          <div className="relative inline-block text-left" ref={updateDropdownRef}>
            <button onClick={toggleUpdateDropdown} className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-500">
              <FontAwesomeIcon icon={isUpdateDropdownOpen ? faAngleUp : faAngleDown} className="mr-2" /> Update
            </button>
            <div className={`absolute z-10 mt-2 w-56 bg-white shadow-lg rounded-md ${isUpdateDropdownOpen ? 'block' : 'hidden'} transition duration-300 transform-gpu origin-top`}>
              <div className="py-1 text-left">
                <button onClick={onUpdateBookClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update Book Details
                </button>
                <button onClick={onUpdateAuthorClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update Author Details
                </button>
                <button onClick={onUpdateBorrowerClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update Borrower Details
                </button>
              </div>
            </div>
          </div>

          <div className="relative inline-block text-left" ref={deleteDropdownRef}>
            <button onClick={toggleDeleteDropdown} className="bg-blue-700 text-red-400 px-4 py-2 rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-red-400">
              <FontAwesomeIcon icon={isDeleteDropdownOpen ? faAngleUp : faAngleDown} className="mr-2" /> Delete
            </button>
            <div className={`absolute z-10 mt- w-48 bg-white shadow-lg rounded-md ${isDeleteDropdownOpen ? 'block' : 'hidden'} transition duration-300 transform-gpu origin-top`}>
              <div className="py-1 text-left">
                <button onClick={onDeleteBookClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete Book
                </button>
                <button onClick={onDeleteBorrowerClick} className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete Borrower
                </button>
              </div>
            </div>
          </div>

          <button onClick={onCheckinClick} className="bg-blue-600 text-white px-4 mb-2 rounded font-semibold hover:bg-blue-500 focus:ring-4 focus:ring-blue-400">
            <FontAwesomeIcon icon={faCheck} className="mr-2" />Book Checkin
          </button>

          <button onClick={onCheckoutClick} className="bg-blue-600 text-white px-4 mb-2 rounded font-semibold hover:bg-blue-500 focus:ring-4 focus:ring-blue-400">
            <FontAwesomeIcon icon={faCheck} className="mr-2 " />Book Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
