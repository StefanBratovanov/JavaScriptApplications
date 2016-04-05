var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_-kHkDFaokb', '7f6dcad6964e48619d0f4a1c501200fb');
        var selector = '#main';
        var menuSelector = '#menu';

        var userModel = app.userModel.load(requester);
        var estateModel = app.estateModel.load(requester);

        var homeViewBag = app.homeViews.load();
        var userViewBag = app.userViews.load();
        var estatesViewBag = app.estatesViews.load();

        var homeController = app.homeController.load(homeViewBag);
        var usersController = app.usersController.load(userModel, userViewBag);
        var estatesController = app.estatesController.load(estateModel, estatesViewBag);

        this.before({except: {path: '#\/(register|login)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function () {
            homeController.loadGuestMenu(menuSelector);
            homeController.loadGuestWelcomeMessage(selector);
        });

        this.get('#/login', function () {
            usersController.loadLoginPage(selector);
        });

        this.get('#/register', function () {
            usersController.loadRegisterPage(selector);
        });

        this.get('#/home', function () {
            homeController.loadUsersMenu(menuSelector);
            homeController.loadUserWelcomeMessage(selector);
        });

        this.get('#/logout', function () {
            usersController.logout();
        });

        this.get('#/estates/list', function () {
            homeController.loadUsersMenu(menuSelector);
            estatesController.loadAllEstates(selector);
        });

        this.get('#/estates/add', function () {
            homeController.loadUsersMenu(menuSelector);
            estatesController.loadAddEstate(selector);
        });

        //events
        this.bind('register', function (ev, data) {
            usersController.register(data);
        });

        this.bind('login', function (ev, data) {
            usersController.login(data);
        });

        this.bind('addEstate', function (ev, data) {
            estatesController.addEstate(data);
        });

        this.bind('showEditEstate', function (ev, data) {
            estatesController.loadEditEstate(selector, data);
        });

        this.bind('editEstate', function (ev, data) {
            estatesController.editEstate(data);
        });

        this.bind('showDeleteEstate', function (ev, data) {
            estatesController.loadDeleteEstate(selector, data);
        });

        this.bind('deleteEstate', function (ev, data) {
            estatesController.deleteEstate(data.id);
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });

        this.bind('filterEstates', function (e, data) {
            estatesController.filterEstates(selector, data);
        });

    });

    app.router.run('#/');
}());
