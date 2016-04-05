var app = app || {};

app.userModel = (function () {
    function UserModel(requester) {
        this.requester = requester; //define own requester
        this.serviceUrl = this.requester.baseUrl + 'user/' + this.requester.appId;
    }

    UserModel.prototype.register = function (data) {
        var requestUrl = this.serviceUrl;
        return this.requester.post(requestUrl, data);
    };

    UserModel.prototype.login = function (data) {
        var requestUrl = this.serviceUrl + '/login';
        return this.requester.post(requestUrl, data)
    };

    UserModel.prototype.logout = function () {
        var requestUrl = this.serviceUrl + '/_logout';
        return this.requester.post(requestUrl, null, true);
    };

    UserModel.prototype.editProfile = function (userId, data) {
        var requestUrl = this.serviceUrl + '/' + userId;
        return this.requester.put(requestUrl, data, true);
    };

    UserModel.prototype.getUserById = function (userId) {
        var requestUrl = this.serviceUrl + '/' + userId;
        return this.requester.get(requestUrl, null, true);
    };

    UserModel.prototype.getCurrentUserData = function () {
        var currentUserId = sessionStorage.userId;
        var requestUrl = this.serviceUrl + '/' + currentUserId;
        return this.requester.get(requestUrl, null, true);
    };

    return {
        load: function(requester) {
            return new UserModel(requester);
        }
    };
}());
