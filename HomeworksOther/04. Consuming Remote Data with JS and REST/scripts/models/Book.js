define('book', [], function () {
	return (function () {
	    function Book(title, author, isbn) {
			this.title = title;
			this.author = author;
			this.isbn = isbn;
	    }

		return Book;
	}());
});