var app = app || {};

app.userViews = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);

            $('#loginButton').on('click', function (e) {
                var username = $('#login-username').val(),
                    password = $('#login-password').val();
                Sammy(function () {
                    this.trigger('login', {username: username, password: password});
                })
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#registerButton').on('click', function (e) {
                var username = $('#reg-username').val(),
                    password = $('#reg-password').val()

                Sammy(function () {
                    this.trigger('register', {username: username, password: password});
                })

            })
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());