function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(booksArr) {
  return booksArr.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      acc++;
    }
    return acc;
  }, 0)
}

//helper function for getMostCommonGenres - takes in the books array and returns an object
//with the genres as keys and how many times they appear in the books array as the value
function createGenreObject(books) {
  return books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 1;
    }else {
      acc[book.genre]++;
    } 
    return acc;
  }, {});
}

function getMostCommonGenres(books) {
  //get an array of arrays containing the genre and the number of times that genre is found
  // by using the Object.entries method, and assigning it the value of the evaluated result of 
  //calling the createGenreObject helper function with the books array passed in as the argument
  const genreCountArr = Object.entries(createGenreObject(books));
  const sortedGenreCountArr = genreCountArr.sort((genre1, genre2) => genre2[1] - genre1[1]);
  while (sortedGenreCountArr.length > 5) {
    sortedGenreCountArr.pop();
  }
  return sortedGenreCountArr.map(genre => ({name: genre[0], count: genre[1]}));
}

function getMostPopularBooks(books) {
  const booksWithNumberOfBorrows = books.reduce((acc, book) => {
    acc[book.title] = book.borrows.length;
    return acc;
  }, {});
  const borrowsCountArr = Object.entries(booksWithNumberOfBorrows);
  const sortedByBorrows = borrowsCountArr.sort((book1, book2) => book2[1] - book1[1]);
  while (sortedByBorrows.length > 5) {
    sortedByBorrows.pop();
  }
  return sortedByBorrows.map(book => ({name: book[0], count: book[1]}));
}

function getMostPopularAuthors(books, authors) {
  //map the authors array
    //filter through the books to find those whose authorId matches the author id and then
    //reduce the filtered books by the length of their borrows array
  const mappedAuthors = authors.map(author => {
    return books.filter(book => book.authorId === author.id).reduce((acc, book) => {
      acc.name = `${author.name.first} ${author.name.last}`
      acc.count = book.borrows.length;
      return acc;
    }, {});
  })
  const sortedArr = mappedAuthors.sort((author1, author2) => author2.count - author1.count);
  
  //only return the first 5 elements
  return sortedArr.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
