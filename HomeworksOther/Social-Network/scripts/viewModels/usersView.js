var app = app || {};

app.userViews = (function() {
    function showUsersHeader(selector, data) {
        $.get('views/user-header.html', function (templ) {
            var output = Mustache.render(templ, data);
            $(selector).html(output);
        })
    }

    return {
        load: function() {
            return {
                showUsersHeader: showUsersHeader
            }
        }
    }
}());