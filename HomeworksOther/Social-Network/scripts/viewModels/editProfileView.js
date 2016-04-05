var app = app || {};

app.editProfileView = (function() {
    function showEditProfilePage(selector){
        $.get('views/edit-profile.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);

            $('button:contains("Save Changes")').on('click', function (e) {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    name = $('#name').val(),
                    info = $('#about').val(),
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
                showEditProfilePage: showEditProfilePage
            }
        }
    }
}());
