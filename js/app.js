// Search button reference
const searchBtn = document.getElementById('searchBtn');
// Book container reference
const bookContainer = document.getElementById('bookContainer');
// totalSearchResult reference
const totalSearchResult = document.getElementById('totalSearchResult');

searchBtn.addEventListener('click', async () => {
  // Searched book reference
  const inputValue = document.getElementById('inputValue');
  const inputText = inputValue.value;

  // Clear both book and result container
  bookContainer.innerHTML = '';
  totalSearchResult.innerHTML = '';

  // clear search box
  inputValue.value = '';

  // Show Spinner
  bookContainer.innerHTML = `
  <div class="spinner-border text-primary mx-auto" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

  // If search input is empty
  if (inputText === '') {
    bookContainer.innerHTML = `
    <div class="alert alert-danger mx-auto" role="alert">
      Please enter something!!!
    </div>`;
  }

  // if search input is not empty
  if (inputText !== '') {
    // fetch from search input with api
    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    const res = await fetch(url);
    // convert result into json
    const books = await res.json();

    // check if result is  not found
    if (books.numFound !== 0) {
      buildBookCard(books);
    } else {
      // show message if not found
      bookContainer.innerHTML = `
      <div class="alert alert-danger mx-auto" role="alert">
        No book result found!!!
      </div>`;
    }
  }
});

// UI building function
const buildBookCard = (books) => {
  // again clear bookContainer which is showing previous result
  bookContainer.innerHTML = '';

  // showing total result
  totalSearchResult.innerHTML = `
  <div class="alert alert-success mx-auto" role="alert">
    <p class="fw-bold text-center">Search keyword: ${books.q} || Total Search Result: ${books.numFound} || Showing Result: ${books.docs.length}</p>
  </div>
  `;

  // looping through all books which is in docs array
  books.docs.forEach((book) => {
    // generating book cover url
    let bookCover = '';
    // check if book cover is not found in object
    if (book.cover_i) {
      bookCover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }

    // Creating bookdiv for showing book details
    const bookDiv = document.createElement('div');
    // added col class into bookdiv
    bookDiv.classList.add('col');
    // showing element using ternary operator
    bookDiv.innerHTML = `
        <div class="card h-100">
          <img src="${
            bookCover ? bookCover : 'img/no-photo.png'
          }" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title"><span class="fw-bold">Title</span>: ${
              book.title
            }</h5>
            <p class="card-text fw-bold">Author: ${
              book.author_name ? book.author_name : 'No author found'
            }</p>
            <p class="card-text"><span class="fw-bold">Publisher</span>: ${
              book.publisher ? book.publisher : 'No publisher found!'
            }</p>
            <p class="card-text"><span class="fw-bold">First Published Year</span>: ${
              book.first_publish_year
                ? book.first_publish_year
                : 'No year found!'
            }</p>
          </div>
        </div>
    `;
    // append each book details into container
    bookContainer.appendChild(bookDiv);
  });
};
