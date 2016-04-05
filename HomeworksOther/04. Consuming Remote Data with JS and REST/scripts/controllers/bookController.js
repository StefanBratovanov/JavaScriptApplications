define(['mustache', 'book'], function (mustache, Book) {
	return (function () {
		function getBook(requester, bookId) {
			requester.getBook(bookId).then(function (book) {
				$.get('templates/book-info.html', function (template) {
					var rendered = mustache.render(template, book);
					$('#wrapper').html(rendered);
				});
			});
		}

		function getBooks(requester) {
			requester.getBooks().then(function (books) {
				$.get('templates/book-table.html', function (template) {
					var rendered = mustache.render(template, books);
					$('#wrapper').html(rendered);
				});
			});
		}

	    function createBook(requester, router) {
			$.get('templates/create-book.html', function (template) {
				$('#wrapper').html(template);
				$('#add-book').click(function() {
					var title = $('#title').val(),
						author = $('#author').val(),
						isbn = $('#isbn').val();

					if (title.length > 0 && author.length > 0 && isbn.length > 0) {
						var book = new Book(title, author, isbn);
						requester.createBook(book);

						router.redirect('#/');
					} else {
						$('#add-book').parent()
							.append($('<p>').html('Please fill all fields.').css('color', 'red'));
					}
				});
			});
		}

		function editBook(requester, book) {
			var newBook = new Book(book.title, book.author, book.isbn);
			requester.editBook(book._id, newBook).then(function (book) {
				$.get('templates/book-info.html', function (template) {
					var rendered = mustache.render(template, book);
					$('#wrapper').html(rendered);
					$('#wrapper').append($('<p>').text('Save successfully.').css('color', 'green'));
				});
			}, function (error) {
				console.log(error);
			});
		}

		function deleteBook(requester, router, bookId) {
			requester.removeBook(bookId).then(function (result) {
				router.redirect('#/');
			}, function (error) {
				console.log(error);
			})
		}

		return {
			createBook: createBook,
			getBooks: getBooks,
			getBook: getBook,
			editBook: editBook,
			deleteBook: deleteBook
		}
	}());
});