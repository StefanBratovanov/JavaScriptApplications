var app = app || {};

app.booksViews = (function () {
    function showAllBooks(selector, data) {
        $.get('templates/books.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#addNewBook').on('click', function (e) {
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/addNewBook'});
                })
            });

            $('.deleteBookButton').on('click', function (e) {
                var bookId = $(this).attr("bookToDeleteId");
                Sammy(function () {
                    this.trigger('delete-book', bookId);
                })
            });

            $('.editBookButton').on('click', function (e) {
                var bookId = $(this).parent().attr("data-id");
                var book = data.books.filter(function (b) {
                    return b.bookId == bookId;
                });

                if (book) {
                    Sammy(function () {
                        this.trigger('edit-book', {
                            book: [{
                                id: book[0].bookId,
                                title: book[0].title,
                                author: book[0].bookAuthor,
                                isbn: book[0].isbn
                            }]
                        });
                    })
                }
            });

        })
    }

    function showAddNewBook(selector) {
        $.get('templates/addNewBook.html', function (templ) {
            $(selector).html(templ);
            $('#addNewBookButton').on('click', function () {
                var title = $('#bookTitle').val(),
                    author = $('#bookAuthor').val(),
                    isbn = $('#bookISBN').val();

                Sammy(function () {
                    this.trigger('add-new-book', {title: title, author: author, isbn: isbn});
                });
            })
        })
    }


    function showEditBook(selector, data) {
        $.get('templates/editBook.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#editBookButton').on('click', function () {
                var title = $('#bookTitle').val(),
                    author = $('#bookAuthor').val(),
                    isbn = $('#bookISBN').val(),
                    bookId = $("form").attr("id");
                Sammy(function () {
                    this.trigger('edit-new-book', {id: bookId, title: title, author: author, isbn: isbn});
                });
            })
        })
    }

    return {
        load: function () {
            return {
                showAllBooks: showAllBooks,
                showAddNewBook: showAddNewBook,
                showEditBook: showEditBook
            }
        }
    }
}());