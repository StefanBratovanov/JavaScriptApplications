var app = app || {};

app.registerView = (function() {
    function showRegisterPage(selector){
        $.get('views/register.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);
            $('button:contains("Register")').on('click', function (e) {
                var username = $('#reg-username').val(),
                    password = $('#reg-password').val(),
                    name = $('#reg-name').val(),
                    info = $('#reg-about').val(),
                    gender = $('input[name="gender-radio"]:checked').val(),
                    picture = $('#picture').val();

                Sammy(function() {
                    this.trigger('register', {username: username,
                                              password: password,
                                              name: name,
                                              info: info,
                                              gender: gender,
                                              picture: picture});
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showRegisterPage: showRegisterPage
            }
        }
    }
}());
