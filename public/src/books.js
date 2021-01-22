function findAuthorById(authorsArr, id) {
  return authorsArr.find(author => author.id === id);
}

function findBookById(booksArr, id) {
  return booksArr.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => !book.borrows[0].returned);
  const returned = books.filter(book => book.borrows[0].returned);
  return [borrowed, returned];
}

function getBorrowersForBook({borrows}, accountsArr) {
  const borrowersArr = borrows.map(book => {
    for (let i = 0; i < accountsArr.length; i++) {
      if (accountsArr[i].id === book.id) {
        return {...book, ...accountsArr[i]};
      }
    }
  })
  //return borrowersArr using the slice method to only return up to 10 elements
  return borrowersArr.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
