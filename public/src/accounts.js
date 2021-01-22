function findAccountById(accountsArr, id) {
  return accountsArr.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acct1, acct2) => acct1.name.last.toLowerCase() < acct2.name.last.toLowerCase() ? -1 : 1);
}

function numberOfBorrows({ id }, booksArr) {
  //if the account id from the accountObj appears in the borrows array of the booksArr
  //increment the accumulator
  return booksArr.reduce((acc, book) => {
    book.borrows.forEach(el => {
      if (el.id === id) {
        acc++;
      }
    })
    return acc;
  }, 0);
}

function getBooksPossessedByAccount({ id }, booksArr, authorArr) {
  //filter through the books array to return an array of the books whose borrows[0].id matches
  //the account id and whose borrows[0].returned is false
  const filteredArr = booksArr.filter(book => book.borrows[0].id === id && !book.borrows[0].returned);
 
  //map that filtered array and return a new array that has the book object with the author info
  return filteredArr.map(book => {
    const author = authorArr.find(author => author.id === book.authorId);
    return {...book, author};  
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
