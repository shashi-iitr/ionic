(function () {
	var listFactory = function($q, $http) {
		var factory = {};

	    // factory.doSearch = function(query) {
	    //   var q = $q.defer();
	    //     tags: query
	    //   }, function(resp) {
	    //     q.resolve(resp);
	    //   }, function(err) {
	    //     q.reject(err);
	    //   })
	      
	    //   return q.promise;
	    // };

		factory.getProducts = function() {
			var request = $http({
				method: 'POST',
				url: 'http://54.169.35.69:8080/api/searchQuery',
				data: {'query':'pro'},
				headers: {'Content-Type': 'application/json'}
			});

			return request;
		};

		return factory;
	};

	listFactory.$inject = ['$q', '$http'];

	angular.module('starter')
	.factory('listFactory', listFactory);
}());