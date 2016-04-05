var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_-JyIuhVT1-', 'ec64aa61544a4f60a7246a5e91510b80');
        var selector = '#container';
        var menuSelector = '#menu';

        var userModel = app.userModel.load(requester);
        var lectureModel = app.lectureModel.load(requester);

        var homeViews = app.homeViews.load();
        var userViews = app.userViews.load();
        var lecturesViews = app.lecturesViews.load();

        var homeController = app.homeController.load(homeViews);
        var usersController = app.usersController.load(userModel, userViews);
        var lecturesController = app.lecturesController.load(lectureModel, lecturesViews);

        this.before({except: {path: '#\/(register/|login/)?'}}, function () {
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

        this.get('#/login/', function () {
            usersController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            usersController.loadRegisterPage(selector);
        });

        this.get('#/home/', function () {
            homeController.loadUsersMenu(menuSelector);
            homeController.loadUserWelcomeMessage(selector);
        });

        this.get('#/logout/', function () {
            usersController.logout();
        });

        this.get('#/calendar/list/', function () {
            homeController.loadUsersMenu(menuSelector);
            lecturesController.loadAllLectures(selector);
        });

        this.get('#/calendar/add/', function () {
            homeController.loadUsersMenu(menuSelector);
            lecturesController.loadAddLecture(selector);
        });


        //events
        this.bind('register', function (ev, data) {
            usersController.register(data);
        });

        this.bind('login', function (ev, data) {
            usersController.login(data);
        });

        this.bind('addLecture', function (ev, data) {
            lecturesController.addLecture(data);
        });

        this.bind('showEditLecture', function (ev, data) {
            lecturesController.loadEditLecture(selector, data);
        });

        this.bind('editLecture', function (ev, data) {
            lecturesController.editLecture(data);
        });

        this.bind('showDeleteLecture', function (ev, data) {
            lecturesController.loadDeleteLecture(selector, data);
        });

        this.bind('deleteLecture', function (ev, data) {
            lecturesController.deleteLecture(data.id);
        });


        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });

    });

    app.router.run('#/');
}());
