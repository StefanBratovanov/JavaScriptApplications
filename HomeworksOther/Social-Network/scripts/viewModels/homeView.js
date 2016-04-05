var app = app || {};

app.homeViews = (function() {
    function showHomePage(selector) {
        $.get('views/default-home.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);
        })
    }

    return {
        load: function() {
            return {
                showHomePage: showHomePage
            }
        }
    }
}());
