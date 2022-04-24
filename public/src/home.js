function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      booksBorrowed++
    }
  });
return booksBorrowed;
   }

function getMostCommonGenres(books) {
  const mostCommonOccuringGenres = books.reduce((count, book) => {
    const genre = book.genre;
    const genreInformation = count.find(genreName => genreName.name === genre);

    if (!genreInformation) {
      const addGenreInformation = {
        name: genre,
        count: 1,
      };
      count.push(addGenreInformation);
    } else {
      genreInformation.count++;
    }
    return count;
  }, []);
  mostCommonOccuringGenres.sort((genreOne, genreTwo) => genreTwo.count - genreOne.count);
  mostCommonOccuringGenres.splice(5);
  return mostCommonOccuringGenres;
}

function getMostPopularBooks(books) {
  const mostPopularBooks = books.map((book) => {
    const addBook = {
      name: book.title,
      count: book.borrows.length,
    };
    return addBook;
  });

  mostPopularBooks.sort((titleOne, titleTwo) => titleTwo.count - titleOne.count);
  mostPopularBooks.splice(5);
  return mostPopularBooks;
}

const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};

function getMostPopularAuthors(books, authors) {
  const mostPopularAuthors = authors.map((author) => {
    const combinedName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const borrowedCount = booksByAuthor.reduce((count, book) => count + book.borrows.length, 0);
    const addAuthorInformation = {
      name: combinedName, 
      count: borrowedCount,
    };
    return addAuthorInformation;
  });
  mostPopularAuthors.sort((authorOne, authorTwo) => authorTwo.count - authorOne.count);
  mostPopularAuthors.splice(5);
  return mostPopularAuthors
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
