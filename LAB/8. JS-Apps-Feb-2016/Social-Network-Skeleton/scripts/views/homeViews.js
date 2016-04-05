var app = app || {};

app.homeViews = (function () {
    function showHomePage(selector) {
        $.get('views/default-home.html', function (templ) {
            $(selector).html(templ);
        })
    }

    return {
        load: function () {
            return {
                showHomePage: showHomePage
            }
        }
    }
}());