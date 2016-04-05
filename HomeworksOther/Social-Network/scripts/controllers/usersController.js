var app = app || {};

app.usersController = (function () {
    function UsersController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    UsersController.prototype.loadLoginPage = function(selector) {
        this._viewBag.showLoginPage(selector)
    };

    UsersController.prototype.login = function(data) {
        this._model.login(data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/Posts'});
                })
            }).done()
    };

    UsersController.prototype.logout = function() {
        return this._model.logout()
            .then(function() {
                sessionStorage.clear();
            })
    };

    UsersController.prototype.loadRegisterPage = function(selector) {
        this._viewBag.showRegisterPage(selector)
    };

    UsersController.prototype.register = function(data) {
        this._model.register(data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/Posts'});
                })
            }).done()
    };

    UsersController.prototype.editProfile = function(data) {
        this._model.editProfile(data)
            .then(function (success) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/Edit'});
                })
            }).done()
    };

    UsersController.prototype.getUserById = function (userId, selector) {
        var _this = this;

        this._model.getUserById(userId)
            .then(function (users) {
                var result = {
                    users: []
                };

                users.forEach(function (user) {
                    result.users.push(new User(
                        user.username,
                        user.name,
                        user.about,
                        user.gender,
                        user.picture,
                        user._id))
                });

                _this._viewBag.showUsersHeader(selector, result);
            }).done();
    };

    UsersController.prototype.getCurrentUserData = function (selector) {
        var _this = this;

        this._model.getCurrentUserData()
            .then(function (users) {
                var result = {
                    users: []
                };

                users.forEach(function (user) {
                    result.users.push(new User(
                        user.username,
                        user.name,
                        user.about,
                        user.gender,
                        user.picture,
                        user._id))
                });

                _this._viewBag.showUsersHeader(selector, result);
            }).done();
    };

    return {
        load: function (model, viewBag) {
            return new UsersController(model, viewBag)
        }
    }
}());
