var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_WJpamE5uyZ', '9814cd14ff094df392ed970c26fa1eaa');
        var selector = '#wrapper';

        var userModel = app.userModel.load(requester);
        var postModel = app.postModel.load(requester);

        var homeViewBag = app.homeViews.load();
        var userViewBag = app.userViews.load();
        var postsViewBag = app.postViews.load();

        var homeController = app.homeController.load(homeViewBag);
        var usersController = app.usersController.load(userModel, userViewBag);
        var postsController = app.postsController.load(postModel, postsViewBag);

        this.before({except: {path: '#\/(register|login)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/login');
                return false;
            } else {
                this.redirect('#/posts');
            }
        });

        this.get('#/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login', function () {
            usersController.loadLoginPage(selector);
        });

        this.get('#/register', function () {
            usersController.loadRegisterPage(selector);
        });

        this.get('#/logout', function () {
            var _this = this;
            usersController.logout()
                .then(function () {
                    _this.redirect('#/');
                });
        });

        this.get('#/posts', function () {
            usersController.loadHeader(selector);
        });


        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function (e, data) {
            usersController.login(data)
        });

        this.bind('register', function (e, data) {
            usersController.register(data)
        });

        //this.bind('posts', function (e, data) {
        //    postsController.showAllPosts(data)
        //});

    });

    app.router.run('#/');
}());
