define(['q'], function(Q) {

	return (function () {
		function userRequester(requester) {
			this.serviceUrl = requester._baseUrl + 'user/' + requester._appKey;
			this.requester = requester;
		}

		userRequester.prototype.login = function(username, password) {
			var requestUrl = this.serviceUrl + '/login',
				defer = Q.defer(),
				data = {
					username: username,
					password: password
				};

			this.requester.makeRequest('post', requestUrl, data).then(function (result) {
				sessionStorage['sessionAuth'] = result._kmd.authtoken;
				sessionStorage['userId'] = result._id;
				console.log('Welcome "' + result.username + '"!');
				defer.resolve(result);
			}, function (error) {
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		userRequester.prototype.getInfo = function() {
			var requestUrl = this.serviceUrl + '/_me';

			this.requester.makeRequest('get', requestUrl, null, true).then(function (result) {
				console.log(result);
			}, function (error) {
				console.log(error.responseText);
			}).done();
		};

		userRequester.prototype.logOut = function() {
			var requestUrl = this.serviceUrl + '/_logout',
				defer = Q.defer();

			this.requester.makeRequest('post', requestUrl, {}, true).then(function (result) {
				delete sessionStorage.sessionAuth;
				delete sessionStorage.userId;

				console.log('Goodbye');
				defer.resolve(result);
			}, function (error) {
				console.log(error.responseText);
				defer.reject(error);
			}).done();

			return defer.promise;
		};

		return userRequester;
	}());
});