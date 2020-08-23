const bookContainer = document.querySelector(".books");
const title = document.querySelector(".input-title");
const author = document.querySelector(".input-author");
const pages = document.querySelector(".input-pages");
const submitBtn = document.getElementById("submit-btn");
const openBtn = document.querySelector(".open-button");
const closeBtn = document.getElementById("close-btn");
const removeAll = document.querySelector(".remove-all");
const errorContainer = document.querySelector('.error');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let book = `${this.title} by ${this.author}, ${this.pages}`;
        return this.read == false
            ? (book += ", not read yet.")
            : (book += ", already read it.");
    };
}

let myLibrary = [];

const renderLibrary = (arr, node) => {
    if (!node) return;
    let html = ''
    arr.forEach((item) => {
        html += `<div class="book-card">
            <h3>${item.title}</h3>
            <h3>Author: ${item.author}</h3>
            <p>Pages: ${item.pages}</p>
            <button class="delete-btn">Remove Book</button>
        </div>`;
    });

    node.innerHTML = html
};

// const getBooks = () => {
//     let books;
//     if (localStorage.getItem('books') === null) {
//         books = [];
//     } else {
//         books = JSON.parse(localStorage.getItem('books'))
//     }

//     let html = ''
//     books.forEach(book => {
//         html += `<div class="book-card">
//         <h3>${book.title}</h3>
//         <h3>Author: ${book.author}</h3>
//         <p>Pages: ${book.pages}</p>
//         <button class="delete-btn">Remove Book</button>
//     </div>`;
//     })
//     bookContainer.innerHTML = html
// }

function addBookToLibrary(e) {
    e.preventDefault();
    let authorName = author.value;
    let bookTitle = title.value;
    let numOfPages = pages.value;

    let newBook = new Book(
        `${bookTitle}`,
        `${authorName}`,
        `${numOfPages}`,
        true
    );

    if (myLibrary.some(book => book.title.toLowerCase() === title.value.toLowerCase())) {
        errorMsg()
    }
    else if (pages.value === '' || author.value === '') {
        errorMsg()
    }
    else if (!isNaN(author.value)) {
        errorMsg()
    }
    else {
        myLibrary.push(newBook)
    }

    // addToLocalStorage(newBook)

    author.value = "";
    title.value = "";
    pages.value = "";

    renderLibrary(myLibrary, bookContainer);
}

// const addToLocalStorage = (book) => {
//     let books;
//     if (localStorage.getItem('books') === null) {
//         books = [];
//     } else {
//         books = JSON.parse(localStorage.getItem('books'))
//     }

//     books.push(book);

//     localStorage.setItem('books', JSON.stringify(books))
// }

const errorMsg = () => {

    if (myLibrary.some(book => book.title.toLowerCase() === title.value.toLowerCase())) {
        errorContainer.innerHTML = `
            <div class="error-box">
                <p class="error-msg">Book Already Inserted!</p>
            </div>
        `
    }

    if (pages.value === '' || author.value === '' || title.value === '') {
        errorContainer.innerHTML = `
        <div class="error-box">
            <p class="error-msg">Please fill in all required fields!</p>
        </div>
    `
    }

    if (!isNaN(author.value)) {
        errorContainer.innerHTML = `
        <div class="error-box">
            <p class="error-msg">Author can't be a number!</p>
        </div>
    `
    }

    setTimeout(() => {
        errorContainer.innerHTML = ''
    }, 2000)
}


renderLibrary(myLibrary);

//Event Listeners
submitBtn.addEventListener("click", addBookToLibrary);

// document.addEventListener('DOMContentLoaded', getBooks);

bookContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        let titleEl = e.target.parentElement.firstChild.nextSibling.textContent
        myLibrary.filter(book => {
            if (book.title === titleEl) {
                myLibrary.pop(book)
                e.target.parentElement.remove();

                //Remove from local storage
                renderLibrary(myLibrary)
            }
        })
    }
})

const removeFromLocalStorage = (bookItem) => {
    // let books;
    // if (localStorage.getItem('books') === null) {
    //     books = [];
    // } else {
    //     books = JSON.parse(localStorage.getItem('books'))
    // }

    // books.forEach((book, i) => {
    //     if (bookItem.textContent === book) {
    //         books.splice(i, 1)
    //     }
    // })

    // localStorage.setItem('books', JSON.stringify(books))

    console.log(bookItem)
}

openBtn.addEventListener("click", () => {
    document.getElementById("myForm").style.display = "block";
});
closeBtn.addEventListener("click", () => {
    document.getElementById("myForm").style.display = "none";
});

removeAll.addEventListener("click", () => {
    myLibrary = [];
    bookContainer.innerHTML = "";
});
