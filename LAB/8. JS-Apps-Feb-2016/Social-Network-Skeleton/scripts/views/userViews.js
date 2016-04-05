var app = app || {};

app.userViews = (function () {
    function showLoginPage(selector) {
        $.get('views/login.html', function (templ) {
            $(selector).html(templ);
            $("#loginButton").on('click', function () {
                var username = $('#login-username').val(),
                    password = $('#login-password').val();

                $.sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });
            })
        });
    }

    function showRegisterPage(selector) {
        $.get('views/register.html', function (templ) {
            $(selector).html(templ);
            $('#registerButton').on('click', function (e) {
                var username = $('#reg-username').val(),
                    password = $('#reg-password').val(),
                    name = $('#reg-name').val(),
                    about = $('#reg-about').val(),
                    gender = $('input[name="gender-radio"]:checked').val()

                $.sammy(function () {
                    this.trigger('register',
                        {
                            username: username,
                            password: password,
                            name: name,
                            about: about,
                            gender: gender
                        });
                })
            })
        })
    }

    function showHeader(selector, data) {
        $.get('views/user-header.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
        });
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage,
                showHeader: showHeader
            }
        }
    }
}());