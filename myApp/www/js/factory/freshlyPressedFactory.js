(function () {
	var freshlyPressedFactory = function($http) {
		var factory = {};

		factory.getBlogs = function() {
			return $http.jsonp('http://public.api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK')
		};

		return factory;
	};

	freshlyPressedFactory.$inject = ['$http'];

	angular.module('starter')
	.factory('freshlyPressedFactory', freshlyPressedFactory);
}());