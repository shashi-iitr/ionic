(function () {
	var dashboardFactory = function($http) {
		var factory = {};

		factory.updateDetails = function(user) {
			console.log(user);
			var request = $http({
				method: 'POST',
				url: 'http://54.169.35.69:8080/api/editUser',
				data: {"data":user},
				headers: {'Content-Type': 'application/json'},
			});

			return request;
		};

		return factory;
	};


	dashboardFactory.$inject = ['$http'];

	angular.module('starter')
	.factory('dashboardFactory', dashboardFactory);
}());