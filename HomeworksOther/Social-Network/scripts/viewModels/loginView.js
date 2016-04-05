var app = app || {};

app.loginView = (function() {
    function showLoginPage(selector) {
        $.get('views/login.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);

            $('button:contains("Login")').on('click', function () {
                var username = $('#login-username').val(),
                    password = $('#login-password').val();

                //trigger custom event
                $.sammy(function() {
                    this.trigger('login', {username: username, password: password});
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showLoginPage: showLoginPage
            }
        }
    }
}());
