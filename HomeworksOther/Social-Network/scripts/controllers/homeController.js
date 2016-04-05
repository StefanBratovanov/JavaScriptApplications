var app = app || {};

app.homeController = (function() {
    function HomeController(viewBag) {
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadEditProfilePage = function(selector) {
        this._viewBag.showEditProfilePage(selector);
    };

    HomeController.prototype.loadHomePage = function(selector) {
        this._viewBag.showHomePage(selector);
    };

    HomeController.prototype.loadHoverBox = function(selector) {
        this._viewBag.showHoverBox(selector);
    };

    HomeController.prototype.loadPostBox = function(selector) {
        this._viewBag.showPostBox(selector);
    };

    return {
        load: function (viewBag) {
            return new HomeController(viewBag);
        }
    }
}());
