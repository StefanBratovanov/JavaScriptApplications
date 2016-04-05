var app = app||{};

(function(scope){
    function login () {
        var username = $('#username').val();
        var password = $('#password').val();

        var objForSend = {
            "username": username,
            "password": password
        };

        $.ajax({
            type: "POST",
            url: "https://baas.kinvey.com/user/kid_Wkwvu8SSJ-/login",
            data: objForSend,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic a2lkX1drd3Z1OFNTSi06YzFkYmFlOTAwZDY4NDljYjhlYmVjMjlkMzQwYmM0YTU=");
            },
            success: function (data) {
                sessionStorage.authToken = data._kmd.authtoken;
                scope.listBooks();
            },
            error: function (error) {
                console.error(error);
                //TODO Insert Noty for Invalid creds.
            }
        })
    }

    scope.login = login;
})(app);