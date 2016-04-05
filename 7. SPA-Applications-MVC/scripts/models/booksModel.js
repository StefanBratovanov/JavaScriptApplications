var app = app || {};

app.booksModel = (function () {
    function BooksModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/books';
    }

    BooksModel.prototype.getAllBooks = function () {
        return this._requester.get(this.serviceUrl, true);
    };

    BooksModel.prototype.addNewBook = function (data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    BooksModel.prototype.deleteBook = function (bookId) {
        var url = this.serviceUrl + "/" + bookId;
        return this._requester.delete(url, true);
    };

    BooksModel.prototype.editBook = function (bookId, data) {
        var url = this.serviceUrl + "/" + bookId;
        return this._requester.put(url, data, true);
    };
    return {
        load: function (requester) {
            return new BooksModel(requester);
        }
    }
}());