/**
 * 
URL Format: http://openlibrary.org/search.json?q=${searchText}

Example: http://openlibrary.org/search.json?q=javascript

Book cover image url: Large
URL Format: https://covers.openlibrary.org/b/id/{cover_i}-L.jpg

Example: https://covers.openlibrary.org/b/id/554106-L.jpg

Book cover image url: Medium
URL Format: https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

Example: https://covers.openlibrary.org/b/id/554106-M.jpg

Author Detail:
https://openlibrary.org/authors/{authhorKey}.json

Example: https://openlibrary.org/authors/OL62134A.json
 */


// Search button reference
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async () => {
  // Searched book reference
  const inputValue = document.getElementById('inputValue');
  const inputText = inputValue.value;

  // fetch
  const url = `http://openlibrary.org/search.json?q=${inputText}`;
  let res = await fetch(url);
  let books = await res.json()
  // console.log(books.docs);
  books.docs.forEach((book) => {
    console.log(book);
  })
});