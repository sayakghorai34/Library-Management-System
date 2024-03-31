import React from "react";

const FormComp = ({ form_data, setConfirm, handler, type, selectedItem }) => {
  return type === "checkin" ? (
    <form onSubmit={(e) => e.preventDefault()} className="w-screen max-w-md">
      <div className="bg-gray-700 rounded-lg p-4 mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={form_data.title}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="borrowerName" className="block">
            Borrower Name
          </label>
          <input
            type="text"
            id="borrowerName"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={form_data.borrowerName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            value={form_data.category}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            required
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            value={form_data.price}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm_checkin" className="block">
            Confirm Checkin
          </label>
          <input
            type="text"
            id="confirm_checkin"
            placeholder="Type 'checkin' to confirm"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="bg-blue-700 text-white py-4 mb-4 w-full rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500"
          onClick={handler}
        >
          Checkin
        </button>
      </div>
    </form>
  ) : type === "deletebook" ? (
    <form className="w-screen max-w-md">
      <div className="bg-gray-700 rounded-lg p-4 mb-2">
        <div className="mb-4">
          <label htmlFor="title" className="block">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Book Title"
            required
            readOnly
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            value={form_data.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="authorName" className="block">
            Author Name
          </label>
          <input
            type="text"
            name="authorName"
            id="authorName"
            placeholder="Author Name"
            required
            readOnly
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            value={form_data.authorName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            value={form_data.category}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            required
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            value={form_data.price}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm_delete" className="block">
            Price
          </label>
          <input
            type="text"
            name="confirm_delete"
            id="confirm_delete"
            placeholder="Type 'delete' to confirm"
            required
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-4 w-full"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>
    </form>
  ) : type === "deleteborrower" ? (
    <form onSubmit={(e) => e.preventDefault()} className="w-screen max-w-md">
      <div className="bg-gray-700 rounded-lg p-4 mt-4">
        <div className="mb-4" align="left">
          <label htmlFor="borrower_name" className="block">
            Name
          </label>
          <input
            type="text"
            name="borrowerName"
            id="borrower_name"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={selectedItem.borrowerName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="borrower_email" className="block">
            Email
          </label>
          <input
            type="text"
            name="borrowerEmail"
            id="borrower_email"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={selectedItem.borrowerEmail}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="borrower_phone" className="block">
            Phone
          </label>
          <input
            type="text"
            name="borrowerPhone"
            id="borrower_phone"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={selectedItem.borrowerPhone}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="borrower_address" className="block">
            Name
          </label>
          <input
            type="text"
            name="borrowerAddress"
            id="borrower_addreess"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            value={selectedItem.borrowerAddress}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm_delete" className="block">
            Confirm Delete
          </label>
          <input
            type="text"
            name="confirmDelete"
            id="confirm_delete"
            placeholder="Type 'delete' to confirm"
            className="border bg-gray-200 text-gray-500 border-gray-300 rounded-lg p-2 w-full"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>
    </form>
  ) : (
    <p>Invalid form type</p>
  );
};
export default FormComp;
