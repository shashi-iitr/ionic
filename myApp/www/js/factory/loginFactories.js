(function () {
	var loginFactory = function($http) {
		var factory = {};
		var user = {};

		factory.login = function(user) {
			console.log(user);
			
			var request = $http({
				method: 'POST',
				url: 'http://54.169.35.69:8080/api/doLogin',
				data: user,
				headers: {'Content-Type': 'application/json'}
			});

			return request;
		};

            factory.getUser =  function () {
                return user;
            };
            factory.setUser = function(value) {
                user = value;
            };
		return factory;
	};


	loginFactory.$inject = ['$http'];

	angular.module('starter')
	.factory('loginFactory', loginFactory);
}());