function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksOut = [];
  let booksIn = [];
  const booksPartitioned = [];

  booksOut = books.filter(book => {
    return book.borrows.some((borrow) => !borrow.returned);
  });

  booksIn = books.filter(book => {
    return book.borrows.every((borrow) => borrow.returned);
  });

  booksPartitioned.push(booksOut);
  booksPartitioned.push(booksIn);

  return booksPartitioned;
}

const findAccountId = (accounts, id) => {
  return accounts.find(account => account.id === id);
}

function getBorrowersForBook(book, accounts) {
  const checkedOutAccounts = book.borrows;

  const borrowersList = checkedOutAccounts.map((checkedOutAccounts) => {
    const account = findAccountId(accounts, checkedOutAccounts.id);
    const borrower = {
      ...checkedOutAccounts,
      ...account,
    };
    return borrower;
  });
  borrowersList.splice(10);
  return borrowersList;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
