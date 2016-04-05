var User = (function() {
    function User (username, name, about, gender, picture, id) {
        this.username = username;
        this.name = name;
        this.about = about;
        this.gender = gender;
        this.picture = picture;
        this._id = id;
    }

    return User
}());
