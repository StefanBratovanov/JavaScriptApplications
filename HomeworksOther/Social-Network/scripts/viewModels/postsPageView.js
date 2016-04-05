var app = app || {};

app.postsPageViews = (function() {
    function showPostsPage(selector) {
        $.get('views/postsPage.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);
        })
    }

    return {
        load: function() {
            return {
                showPostsPage: showPostsPage
            }
        }
    }
}());
