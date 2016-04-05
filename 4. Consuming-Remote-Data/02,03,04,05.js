var BASIC_AUTH = "Basic aWlpOml2ZXJzb24zMw==";
var RESOURCE_URL = "https://baas.kinvey.com/appdata/kid_-yso9uQBkb/books";

$("#books").click(function () {
    getBooks();
});

$(document).on('click', 'li', function (event) {
    displayBookInfo(event)
});

$(document).on('click', "#editBookButton", function () {
    var bookId = $(this).attr("bookToEditId");
    var title = $('#newBookTitle').val();
    var author = $('#newBookAuthor').val();
    var isbn = $('#newBookISBN').val();

    $.ajax({
        method: "PUT",
        url: RESOURCE_URL + "/" + bookId,
        headers: {
            "Authorization": BASIC_AUTH,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(
            {"title": title, "author": author, "isbn": isbn}
        ),
        success: getBooks
    });
    var form = $("form[name='" + bookId + "'");
    form.hide();
});

$("#addBook").submit(function (e) {
    var title = $('#bookTitle').val();
    var author = $('#bookAuthor').val();
    var isbn = $('#bookISBN').val();

    $.ajax({
        method: "POST",
        url: RESOURCE_URL,
        headers: {
            "Authorization": BASIC_AUTH,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(
            {"title": title, "author": author, "isbn": isbn}
        ),
        success: getBooks
    });
    e.preventDefault();

    $('#bookTitle').val('');
    $('#bookAuthor').val('');
    $('#bookISBN').val('');

    $('ul').hide();
});

$(document).on('click', "#deleteBookButton", function () {
    var bookId = $(this).attr("bookToDeleteId");

    $.ajax({
        method: "DELETE",
        url: RESOURCE_URL + "/" + bookId,
        headers: {
            "Authorization": BASIC_AUTH,
        }
    });

    $('#' + bookId).remove()
});

function getBooks() {
    $.ajax({
        method: "GET",
        headers: {
            "Authorization": BASIC_AUTH,
            "Content-Type": "application/json"
        },
        url: RESOURCE_URL,
        success: renderBooks,
        error: function () {
            console.log('Error with getting books!');
        }
    });
}

function displayBookInfo(event) {
    var bookId = event.target.id;
    getBookById(bookId)
}

function getBookById(bookId) {
    $.ajax({
        method: "GET",
        headers: {
            "Authorization": BASIC_AUTH,
            "Content-Type": "application/json"
        },
        url: RESOURCE_URL + '/?query={"_id":' + '"' + bookId + '"' + '}',
        success: renderBook,
        error: function () {
            console.log('Error with getting books!');
        }
    });
}

function renderBook(data) {
    var form = $('<form>').attr({"name": data[0]._id});
    var section = $('<section>');
    var labelTitle = $('<label>').attr({"for": "newBookTitle"}).text("Edit title");
    var inputTitle = $('<input>').attr({"type": 'text', "id": "newBookTitle", "placeholder": data[0].title});
    var labelAuthor = $('<label>').attr({"for": "newBookAuthor"}).text("Edit author");
    var inputAuthor = $('<input>').attr({"type": 'text', "id": "newBookAuthor", "placeholder": data[0].author});
    var labelISBN = $('<label>').attr({"for": "newBookISBN"}).text("Edit ISBN");
    var inputISBN = $('<input>').attr({"type": 'text', "id": "newBookISBN", "placeholder": data[0].isbn});
    var button = $('<button>').attr({
        "type": 'button',
        "id": "editBookButton",
        "bookToEditId": data[0]._id
    }).text("Edit");

    section.append(labelTitle);
    section.append(inputTitle);
    section.append(labelAuthor);
    section.append(inputAuthor);
    section.append(labelISBN);
    section.append(inputISBN);
    section.append(button);
    form.append(section);

    $('ul').hide();

    form.appendTo($('#wrapper'))
}

function renderBooks(data) {
    var ul = $('<ul>');
    data.forEach(function (book) {
        var li = $('<li>').text(book.title + ", " + book.author).attr("id", book._id);
        var deleteButn = $('<button>').attr({
            "type": 'button',
            "id": "deleteBookButton",
            "bookToDeleteId": book._id
        }).text("Delete Book");
        li.append(deleteButn);
        ul.append(li)
    });
    ul.appendTo($('#wrapper'))
}
