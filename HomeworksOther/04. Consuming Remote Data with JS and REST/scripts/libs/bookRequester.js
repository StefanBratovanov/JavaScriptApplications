define(['q'], function (Q) {
	return (function () {
	    function BookRequester(requester) {
			this.serviceUrl = requester._baseUrl + 'appdata/' + requester._appKey + '/books/';
			this.requester = requester;
	    }

		BookRequester.prototype.getBooks = function() {
			var defer = Q.defer();

			this.requester.makeRequest('get', this.serviceUrl, null, true).then(function (data) {
				defer.resolve({ books: data });
			}, function (error) {
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		BookRequester.prototype.createBook = function(book) {
			var defer = Q.defer(),
				data = {
					title: book.title,
					author: book.author,
					isbn: book.isbn
				};

			this.requester.makeRequest('post', this.serviceUrl, data, true).then(function (data) {
				defer.resolve(data);
			}, function (error) {
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		BookRequester.prototype.getBook = function(bookId) {
		    var defer = Q.defer(),
				requestUrl = this.serviceUrl + bookId;

			this.requester.makeRequest('get', requestUrl, null, true).then(function (data) {
				defer.resolve(data);
			}, function (error) {
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		BookRequester.prototype.editBook = function(bookId, book) {
			var defer = Q.defer(),
				requestUrl = this.serviceUrl + bookId,
				data = {
					title: book.title,
					author: book.author,
					isbn: book.isbn
				};

			this.requester.makeRequest('put', requestUrl, data, true).then(function (result) {
				defer.resolve(result);
			}, function (error) {
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		BookRequester.prototype.removeBook = function(bookId) {
			var defer = Q.defer(),
				requestUrl = this.serviceUrl + bookId;

			this.requester.makeRequest('delete', requestUrl, {}, true).then(function
			 (result) { defer.resolve(result);
			}, function (error) {
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		return BookRequester;
	}());
});