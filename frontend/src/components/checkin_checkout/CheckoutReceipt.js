import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CheckoutReceipt = ({ selectedBook, selectedBorrower }) => {
  const handleSaveAsPDF = () => {
    const pdfDoc = new jsPDF();
    
    pdfDoc.setFont('helvetica');
    pdfDoc.setFontSize(16);
  
    const { width } = pdfDoc.internal.pageSize;
    const textWidth = pdfDoc.getStringUnitWidth('Checkout Book Receipt') * 6;

    const centerX = (width - textWidth) / 2;

    pdfDoc.text('Checkout Book Receipt', centerX+3, 10);
    pdfDoc.setFontSize(12);
    pdfDoc.text('Selected Book Details', 15, 20);
    const bookData = [
      ['Title', selectedBook.title],
      ['Author', selectedBook.author.authorName],
      ['Category', selectedBook.category],
      ['Price', `${selectedBook.price.toFixed(2)}/-`],
    ];
    pdfDoc.autoTable({
      startY: 25,
      head: [],
      body: bookData,
      theme: 'grid',
      styles: { cellPadding: 1, fontSize: 11, fontStyle: 'normal' }
    });
  
    pdfDoc.text('Selected Borrower Details', 15, pdfDoc.autoTable.previous.finalY + 15);
    const borrowerData = [
      ['Name', selectedBorrower.borrowerName],
      ['Email', selectedBorrower.borrowerEmail],
      ['Address', selectedBorrower.borrowerAddress],
    ];
    pdfDoc.autoTable({
      startY: pdfDoc.autoTable.previous.finalY + 20,
      head: [],
      body: borrowerData,
      theme: 'grid',
      styles: { cellPadding: 1, fontSize: 11, fontStyle: 'normal' }
    });
  
    pdfDoc.save(`CheckoutReceipt-${selectedBook.title}.pdf`);
  };
  
    return (
      <div className="bg-gray-700 text-left rounded-lg p-8 w-screen max-w-md mb-4">
        <div className=' pl-2'>
          <h1 className="text-2xl font-bold text-center mb-4">-:Checkout Receipt:-</h1>
          <h3 className="text-lg font-bold mb-2">Selected Book</h3>
          <p>
            <span className="font-semibold">Title: </span>
            <span className="font-light">{selectedBook.title}</span>
          </p>
          <p>
            <span className="font-semibold">Author: </span>
            <span className="font-light">{selectedBook.author.authorName}</span>
          </p>
          <h3 className="text-lg font-bold mt-4 mb-4">Selected Borrower</h3>
          <p className="mt-2 mb-2">
            <span className="font-semibold">Name: </span>
            <span className="font-light">{selectedBorrower.borrowerName}</span>
          </p>
          <p className="mt-2 mb-2">
            <span className="font-semibold">Email: </span>
            <span className="font-light">{selectedBorrower.borrowerEmail}</span>
          </p>
          <p className="mt-2 mb-2">
            <span className="font-semibold">Phone Number: </span>
            <span className="font-light">{selectedBorrower.borrowerPhone}</span>
          </p>
          <p className="mt-2 mb-4">
            <span className="font-semibold">Address: </span>
            <span className="font-light">{selectedBorrower.borrowerAddress}</span>
          </p>
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-500"
            onClick={handleSaveAsPDF}
          >
            Save as PDF
          </button>
        </div>
      </div>
    );
};
export default CheckoutReceipt;