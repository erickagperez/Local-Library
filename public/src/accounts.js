const findAccountById = (accounts, id) => {
  return accounts.find(account => account.id === id);
}

const sortAccountsByLastName = (accounts) => {
  return accounts.sort((accountOne, accountTwo) => {
    const lastNameOne = accountOne.name.last;
    const lastNameTwo = accountTwo.name.last;
    return lastNameOne.toLowerCase() < lastNameTwo.toLowerCase() ? -1 : 1;
  });
}

const getTotalNumberOfBorrows = (account, books) => {
  const {id} = account;
  let total = 0;

  for (let book in books) {
    const {borrows} = books[book];
    borrows.forEach((booksBook) => {
      if (booksBook.id === id) {
        total++;
      }
    });
  }
  return total;
}

const authorById = (author, id) => {
  return author.find((author) => author.id === id);
};

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  let booksPossessed = [];
  booksPossessed = books.filter ((book) => {
  return book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned);
});
booksPossessed = booksPossessed.map((book) => {
  const author = authorById(authors, book.authorId);
  const combinedBookInformation = {
    ...book,
    author, 
  };
  return combinedBookInformation;
});
return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
