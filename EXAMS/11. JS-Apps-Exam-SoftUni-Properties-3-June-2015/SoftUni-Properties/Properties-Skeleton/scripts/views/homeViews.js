var app = app || {};

app.homeViews = (function () {

    function showGuestMenu(selector) {
        $.get('templates/guest-home-menu.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function showWelcomeMessage(selector) {
        $.get('templates/wellcome-guest.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function showUsersMenu(selector) {
        $.get('templates/user-home-menu.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function showUserWelcomeMessage(selector, data) {
        $.get('templates/wellcome-user.html', function (templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    return {
        load: function () {
            return {
                showGuestMenu: showGuestMenu,
                showWelcomeMessage: showWelcomeMessage,
                showUsersMenu: showUsersMenu,
                showUserWelcomeMessage: showUserWelcomeMessage
            }
        }
    }
}());