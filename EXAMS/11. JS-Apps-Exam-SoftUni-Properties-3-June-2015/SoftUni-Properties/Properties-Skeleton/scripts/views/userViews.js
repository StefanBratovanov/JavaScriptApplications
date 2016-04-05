var app = app || {};

app.userViews = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);

            $("#login-button").on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                $.sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });
            })
        });
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);

            $('#register-button').on('click', function (e) {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    repeatPass = $('#confirm-password').val();

                if (password === repeatPass) {
                    $.sammy(function () {
                        this.trigger('register',
                            {
                                username: username,
                                password: password
                            });
                    })
                }
                else {
                    noty({
                        theme: 'relax',
                        text: 'Passwords do not match!',
                        type: 'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                    password.val('');
                    repeatPass.val('');
                }
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