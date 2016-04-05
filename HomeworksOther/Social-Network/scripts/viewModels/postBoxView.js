var app = app || {};

app.postBoxView = (function() {
    function showPostBox(selector){
        $.get('views/postsBox.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);

            $('button:contains("Post")').on('click', function (e) {
                var post = $('#post-content').val();

                Sammy(function() {
                    this.trigger('post', {post: post});
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showPostBox: showPostBox
            }
        }
    }
}());
