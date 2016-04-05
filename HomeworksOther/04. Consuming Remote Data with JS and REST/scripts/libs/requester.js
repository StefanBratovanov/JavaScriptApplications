define(['q','jquery'], function (Q) {
	return (function () {
	    function Requester(appKey, appSecret) {
			this._appKey = appKey;
			this._appSecret = appSecret;
			this._baseUrl = 'https://baas.kinvey.com/';
	    }

		Requester.prototype.makeRequest = function (method, url, data, useSession) {
			var token,
				defer = Q.defer(),
				options = {
					method: method,
					url: url,
					headers: {
						'Content-Type': 'application/json'
					},
					data: JSON.stringify(data),
					success: function (data) {
						defer.resolve(data);
					},
					error: function (error) {
						defer.reject(error);
					}
				};

			if (!useSession) {
			    token = this._appKey + ':' + this._appSecret;
				options.beforeSend = function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
				};
			} else {
				token = sessionStorage['sessionAuth'];
				options.beforeSend = function (xhr) {
					xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
				}
			}

			$.ajax(options);

			return defer.promise;
		};

		return {
			config: function (appKey, appSecret) {
				return new Requester(appKey, appSecret);
			}
		}
	}());
});