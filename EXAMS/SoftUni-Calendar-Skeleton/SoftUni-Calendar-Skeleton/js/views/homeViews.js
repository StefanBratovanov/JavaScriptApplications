var app = app || {};

app.homeViews = (function () {

    function showGuestMenu(selector) {
        $.get('templates/menu-login.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function showWelcomeMessage(selector) {
        $.get('templates/welcome-guest.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function showUsersMenu(selector) {
        $.get('templates/menu-home.html', function (templ) {
            $(".modal-backdrop").remove();


            $(selector).html(templ);
        })
    }

    function showUserWelcomeMessage(selector, data) {
        $.get('templates/welcome-user.html', function (templ) {
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