export function getBooks() {
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
}

export function addBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    updateCart();
}

export function updateCart() {
    const badge = document.querySelector('#cart-badge');
    const bookAmount = getBooks().length;

    if (bookAmount) {
        badge.style.display = "flex";
        badge.innerHTML = bookAmount;
    } else {
        badge.style.display = "none";
    }
}