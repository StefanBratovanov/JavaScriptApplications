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
                    sessionStorage['username'] = successData.username;

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/home'});
                    });
                    noty({
                        theme: 'relax',
                        text: 'Successfully registered!',
                        type: 'success',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                }).done();
        };

        UsersController.prototype.login = function (data) {
            this._model.login(data)
                .then(function (successData) {
                    sessionStorage['sessionAuth'] = successData._kmd.authtoken;
                    sessionStorage['userId'] = successData._id;
                    sessionStorage['username'] = successData.username;

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/home'});
                    });
                    noty({
                        theme: 'relax',
                        text: 'Successfully logged in!',
                        type: 'success',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                }, function (error) {
                    noty({
                        theme: 'relax',
                        text: "Wrong username or password",
                        type: 'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                }).done();
        };

        UsersController.prototype.logout = function () {
            this._model.logout()
                .then(function () {
                    sessionStorage.clear();

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/'});
                    });
                    noty({
                        theme: 'relax',
                        text: 'Successfully logged out!',
                        type: 'success',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                })
        };

        return {
            load: function (model, viewBag) {
                return new UsersController(model, viewBag);
            }
        }
    }()
);