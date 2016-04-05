var app = app || {};

(function () {
    var router = Sammy(function () {
        var selector = '#container';

        var requester = app.requester.config('kid_-yso9uQBkb', '2c028afe1f7a43288ef968ec675cf1af');

        var userViewBag = app.userViews.load();
        var booksViewBag = app.booksViews.load();

        var userModel = app.userModel.load(requester);
        var booksModel = app.booksModel.load(requester);

        var userController = app.userController.load(userModel, userViewBag);
        var booksController = app.booksController.load(booksModel, booksViewBag);

        this.get('#/', function () {
            this.redirect('#/login');
        });

        this.get('#/login', function () {
            userController.showLoginPage(selector);
        });

        this.get('#/logout', function () {
            userController.logout();
        });

        this.get('#/register', function () {
            userController.showRegisterPage(selector);
        });

        this.get('#/books', function () {
            booksController.loadAllBooks(selector);
        });

        this.get('#/addNewBook', function () {
            booksController.loadAddBookPage(selector);
        });


        this.bind('login', function (e, data) {
            userController.login(data);
        });

        this.bind('register', function (e, data) {
            userController.register(data);
        });

        this.bind('add-new-book', function (e, data) {
            booksController.addNewBook(data);
        });

        this.bind('delete-book', function (e, bookId) {
            booksController.deleteBookById(bookId);
        });

        this.bind('edit-book', function (e, data) {
            booksController.loadEditBookPage(selector, data);
        });

        this.bind('edit-new-book', function (e, data) {
            booksController.editBook(data);
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });

    });

    router.run('#/');
}());