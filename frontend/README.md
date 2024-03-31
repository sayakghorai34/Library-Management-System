### Simple Library Management System
- user can add, delete, update books
- user can add, delete, update borrowers
- user can add, update authors
- user can borrow books
- user can return books


## Views:
- # Home
    Library(Database) Information is available here. In case of data not fetched and refreshed properly, force refresh button is given in the page.

    ![alt text](../DemoPreview/image.png)


- # New

    ![alt text](../DemoPreview/image-1.png)
    
    - Add Book
        User can add book with the following fields:(in case of author is not in Author schema, author will automatically get added with required fields only. later user may update the secondary fields)

        ![alt text](../DemoPreview/image-5.png)
        ![alt text](../DemoPreview/image-6.png)

    - Add Borrower
        User can add borrower with the following fields:

        ![alt text](../DemoPreview/image-7.png)

    - Add Author

        User can add author with the following fields:(in case books are not it books schema, books will automatically get added with required fields only. later user may update the secondary fields)

        ![alt text](../DemoPreview/image-8.png)


- # Update
    - Update Book
        User can enter partial case insensitive book name or category and update the book with the following fields:

        ![alt text](../DemoPreview/image-9.png)

        on selecting the book from the booklist, user can update the book with the following fields:

        ![alt text](../DemoPreview/image-10.png)

    - Update Borrower
        User can enter partial case insensitive borrower name and update the borrower with the following fields:

        ![alt text](../DemoPreview/image-11.png)

        on selecting the borrower from the borrower list, user can update the borrower with the following fields:

        ![alt text](../DemoPreview/image-12.png)

    - Update Author
        User can enter partial case insensitive author name and update the author with the following fields:

        ![alt text](../DemoPreview/image-13.png)

        on selecting the author from the author list, user can update the author with the following fields:

        ![alt text](../DemoPreview/image-14.png)

- # Delete
    - Delete Book
        User can enter partial case insensitive book name or category and delete the book with the following fields:

        ![alt text](../DemoPreview/image-16.png)

        on selecting the book from the booklist, user can re-check the values once, then by typing "delete" and pressing the Confirm Delete to delete the book from DB:

        ![alt text](../DemoPreview/image-15.png)

    - Delete Borrower
        Same components codes have been used for delete borrower as well.

- # Book Checkout
    - Initially all books have borrower field null means it is not borrowed by any user. So, user can borrow the book by entering the partial case insensitive book name or category and partial case insensitive borrower name:

        ![alt text](../DemoPreview/image-17.png)

        on selecting the book from the booklist, user can re-check the values once, then by typing "checkout" and pressing the Checkout button to borrow the book:

        ![alt text](../DemoPreview/image-18.png)

        There is a ""Save as PDF" button to save the checkout details in the PDF format. The PDF will be saved in the root directory with the name `checkout-${book.title}.pdf`
        ![alt text](../DemoPreview/image-19.png)

- # Book Checkin
    - Initially, all books have borrower field null means it is not borrowed by any user. The logic here is written like, the books will be shown in the booklist only if the book has some borrower (the book is checked out)
    ![alt text](../DemoPreview/image-20.png)

    User can verify the readOnly fields and then by typing "checkin" and pressing the Checkin button to return the book:
    ![alt text](../DemoPreview/image-21.png)


# Note:
 - All the "Go Back Home" or "Go Home" buttons works perfectly. You can even click the "Library Manager" text on the header to go to the home page.
 - The "Save as PDF" button is available only in the Book Checkout page.
 - Its not explicitly TypeSafe
 - The code may not be very optimal but it is working fine.
 - `books` to `authors` and `books` to `borrowers` are one-to-one relationship
 - `authors` to `books` and `borrowers` to `books` are one-to-many relationship
 - New components have been added like show all books, show all checked out bookss, show alll avallable books, etc. These are not in nav bar but clicking different Status components from the home page will take you to the respective pages. 

# Contributed by:
 - Sayak Ghorai [(github/sayakghorai34)](https://github.com/sayakghorai34), 29th May 2024 