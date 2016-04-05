var app = app || {};

app.homeController = (function () {
    function HomeController(viewBag) {
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadGuestMenu = function (selector) {
        this._viewBag.showGuestMenu(selector)
    };

    HomeController.prototype.loadGuestWelcomeMessage = function (selector) {
        this._viewBag.showWelcomeMessage(selector);
    };

    HomeController.prototype.loadUsersMenu = function (selector) {
        this._viewBag.showUsersMenu(selector)
    };

    HomeController.prototype.loadUserWelcomeMessage = function (selector) {
        var data = {
            username: sessionStorage['username']
        };

        this._viewBag.showUserWelcomeMessage(selector, data)
    };

    return {
        load: function (viewBag) {
            return new HomeController(viewBag);
        }
    }
}());