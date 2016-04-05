var app = app || {};

app.postViews = (function () {
    //function showHeader(selector) {
    //    $.get('views/user-header.html', function (templ) {
    //        var rendered = Mustache.render(templ, data);
    //        $(selector).html(rendered);
    //    });
    //}

    //function showAllPosts(selector, data) {
    //    $.get('views/posts.html', function (templ) {
    //        var rendered = Mustache.render(templ, data);
    //        $(selector).html(rendered);
    //    })
    //}

    return {
        load: function () {
            return {
                //showHeader: showHeader
                //showAllPosts: showAllPosts
            }
        }
    }
}());