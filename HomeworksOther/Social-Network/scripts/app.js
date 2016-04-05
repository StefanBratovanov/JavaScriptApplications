var app = app || {};

(function() {
    //app_key, app_secret:
    var requester = app.ajaxRequester.config('kid_Z1td8vsuyW', '070124c41534494dbdf68d4e546c848e');

    var userModel = app.userModel.load(requester);
    var postModel = app.postsModel.load(requester);

    var userViewBag = app.userViews.load();
    var postBoxViewBag = app.postBoxView.load();
    var postPageViewBag = app.postsPageViews.load();
    var homeViewBag =app.homeViews.load();
    var loginViewBag =app.loginView.load();
    var registerViewBag =app.registerView.load();
    var editProfileViewBag =app.editProfileView.load();
    var hoverBoxViewBag =app.hoverBoxView.load();

    var userController = app.usersController.load(userModel, userViewBag);
    var loginController = app.usersController.load(userModel, loginViewBag);
    var registerController = app.usersController.load(userModel, registerViewBag);
    var editProfileController = app.usersController.load(userModel, editProfileViewBag);
    var postsBoxController = app.postsController.load(postModel, postBoxViewBag);
    var postsPageController = app.postsController.load(postModel, postPageViewBag);
    var homeController = app.homeController.load(homeViewBag);
    var hoverBoxController = app.usersController.load(userModel, hoverBoxViewBag);

    app.router = $.sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            homeController.loadHomePage(selector);
            $('title').text('PhotoAlbum - Home Page')
        });

        this.get('#/Login', function () {
            loginController.loadLoginPage(selector);
            $('title').text('PhotoAlbum - Login Page')
        });

        this.get('#/Register', function () {
            registerController.loadRegisterPage(selector);
            $('title').text('PhotoAlbum - Register Page')
        });

        this.get('#/Logout', function () {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                })
        });

        this.get('#/Posts', function () {
            postsPageController.getAllPosts(selector);
        });

        //listen to custom events
        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            loginController.login(data)
        });

        this.bind('register', function(e, data) {
            registerController.register(data)
        });

        this.bind('post', function (e, data) {
            postsBoxController.addPost(selector, data);
        });
    });

    app.router.run('#/');
}());
