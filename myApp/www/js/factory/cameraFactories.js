(function () {
	var cameraFactory = function($q) {
		var factory = {};

		factory.clickAPic = function() {
			var q = $q.defer();

			navigator.camera.getPicture(function(result) {
        // Do any magic you need
        		q.resolve(result);
    		}, function(err) {
    			q.reject(err);
    		}, options);

			return q.promise;
		};

		return factory;
	};

	cameraFactory.$inject = ['$q'];

	angular.module('starter')
	.factory('cameraFactory', cameraFactory);
}());