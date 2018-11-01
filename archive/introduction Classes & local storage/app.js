// Book class
class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Storage class
class Storage {
    // Adding book to localstorage
    addBook(book) {
        const string = JSON.stringify(book);

        if (localStorage.getItem("book") === null) {
            let array = [];
            array.push(string);
            localStorage.setItem('book', JSON.stringify(array)); 
        } else {
            let array = JSON.parse(localStorage.getItem('book'))
            array.push(string);
            localStorage.setItem('book', JSON.stringify(array));
        }
    }
    // Display book list in DOM loaded
    displayBook() {
        let text = localStorage.getItem('book');
            text = JSON.parse(text);

        const ui = new UI ();

        for(var i=0; i< text.length; i++) {
            text[i] = JSON.parse(text[i]);
            ui.addBook(text[i]);
        }
        
    }
    // Remove book from book list
    removeBook() {
        localStorage.removeItem('book');
    }
}

// UI class
class UI {
    // Add book to the list
    addBook(book) {
        const container = document.querySelector('#table'),
        row = document.createElement('tr');

        console.log(book);

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
        `;
            container.appendChild(row);
    }
    // Clear inputs after adding
    clearFields() {
        const fields = document.querySelectorAll('.form-control');
        for(var i = 0; i<fields.length; i++) {
            fields[i].value = '';
        }
    }
    // Remove book from list
    deleteBook(e) {
        e.target.parentNode.remove();
        storage.removeBook();
    }
}
// Adding book to list & localstorage event
document.querySelector('.js-submit').addEventListener('click', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    //Instance Book class
    const book = new Book(title, author, isbn);
    
    //Instance UI class
    const ui = new UI ();

    //Instance Storage class
    const storage = new Storage();

    // Calls of adding book to DOM & localstorage
    if(title !== '' && author !== '' && isbn !== '') {
        storage.addBook(book);
        ui.addBook(book);
        ui.clearFields();
    }
});

// Display localstorage on DOM loaded
const storage = new Storage();
document.addEventListener("DOMContentLoaded", storage.displayBook);

document.querySelector('#table').addEventListener('click', function(e) {

    const ui = new UI ();

    ui.deleteBook(e);
});
