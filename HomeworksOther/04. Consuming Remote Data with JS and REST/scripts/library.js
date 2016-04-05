(function () {
	require.config({
		paths: {
			'jquery': 'libs/jquery-2.2.1.min',
			'q': 'libs/q',
			'requester': 'libs/requester',
			'userRequester': 'libs/userRequester',
			'bookRequester': 'libs/bookRequester',
			'book': 'models/book',
			'bookController': 'controllers/bookController',
			'view': 'libs/view',
			'sammy': 'libs/sammy',
			'mustache': 'libs/mustache.min'
		},
		shim: {
			"sammy": {
				deps: ["jquery"],
				exports: "sammy"
			}
		}
	});
}());

require(['requester', 'userRequester', 'bookRequester', 'sammy', 'bookController'],
		function (rq, userRequester, BookReq, sammy , bookController) {
	var appKey = 'kid_byTQHXAHy-',
		appSecret = '9e3b56ea10474356a829b69188157799',
		requester = rq.config(appKey, appSecret);

	var user = new userRequester(requester);
	user.login('pesho', '1234');
	var bookRequester = new BookReq(requester);

	var library = sammy(function () {
		this.get('#/', function () {
			bookController.getBooks(bookRequester);
		});

		this.get('#/addBook', function () {
			bookController.createBook(bookRequester, this);
		});

		this.get('#/editBook/:bookId', function (context) {
			var bookId = context.params['bookId'];
			bookController.getBook(bookRequester, bookId);
		});

		this.post('#/save', function (context) {
			bookController.editBook(bookRequester, context.params);
		});

		this.get('#/delete/:bookId', function (context) {
			var bookId = context.params['bookId'];
			bookController.deleteBook(bookRequester, this, bookId);
		})
	});

	library.run('#/');
});