var app = app || {};

app.usersController = (function () {
        function UsersController(model, viewBag) {
            var _this = this;
            this._model = model;
            this._viewBag = viewBag;
        }

        UsersController.prototype.loadLoginPage = function (selector) {
            this._viewBag.showLoginPage(selector);
        };

        UsersController.prototype.loadRegisterPage = function (selector) {
            this._viewBag.showRegisterPage(selector);
        };

        UsersController.prototype.register = function (data) {
            this._model.register(data)
                .then(function (successData) {
                    sessionStorage['sessionAuth'] = successData._kmd.authtoken;
                    sessionStorage['userId'] = successData._id;

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/posts'});
                    });
                }).done();
        };

        UsersController.prototype.login = function (data) {
            this._model.login(data)
                .then(function (successData) {
                    sessionStorage['sessionAuth'] = successData._kmd.authtoken;
                    sessionStorage['userId'] = successData._id;

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/posts'});
                    })

                })
                .fail(function () {
                    noty({
                        text: 'Invalid username or password!',
                        layout: 'center',
                        type: 'error',
                        timeout: 750
                    });
                })
                .done(function () {
                    noty({
                        text: 'Login successful.',
                        layout: 'bottom',
                        type: 'success',
                        timeout: 750
                    });
                })
        };

        UsersController.prototype.logout = function () {
            return this._model.logout()
                .then(function () {
                    sessionStorage.clear();
                })

        };



        UsersController.prototype.loadHeader = function (selector) {
            var _this = this;

            var userId = sessionStorage['userId'];

            this._model.getById(userId)
                .then(function (successData) {
                    var userInfo = {
                        'currentUser': {
                            name: successData.name,
                            username: successData.username,
                            pic:"../../databasePic"
                        }
                    };

                    _this._viewBag.showHeader(selector, userInfo);
                }).done();
        };

        return {
            load: function (model, viewBag) {
                return new UsersController(model, viewBag);
            }
        }
    }()
);