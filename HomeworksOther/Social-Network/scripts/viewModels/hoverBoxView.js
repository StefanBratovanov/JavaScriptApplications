var app = app || {};

app.hoverBoxView = (function() {
    function showHoverBox(selector) {
        $.get('views/hover-box.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);
        })
    }

    return {
        load: function() {
            return {
                showHoverBox: showHoverBox
            }
        }
    }
}());
