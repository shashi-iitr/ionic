angular.module('starter.controller', [])

.controller('LoginController', ['$scope', '$window', '$ionicLoading', 'loginFactory', function($scope ,$window ,$ionicLoading, loginFactory) {
	console.log('LoginController');
	var user = {};

	$scope.signIn = function(user) {
		$ionicLoading.show({
			content: 'loading',
			showBackdrop: false
		});

		console.log('sign in controller');
		loginFactory.login(user)
			.success(function(response, status) {
				console.log(response);
				user = response['user'];
				loginFactory.setUser(user);
				$ionicLoading.hide();
				$window.location.href = '#/dashboard';
			})
			.error(function(data, status, headers, config) {
				console.log('error');
				$ionicLoading.hide();
			});
	};
}])

.controller('DashboardController', ['$scope', '$ionicLoading', 'loginFactory', 'dashboardFactory', '$ionicSideMenuDelegate', function($scope, $ionicLoading, loginFactory, dashboardFactory, $ionicSideMenuDelegate) {
	console.log('DashboardController');
	$scope.user = loginFactory.getUser();
	console.log($scope.user);

		  $scope.toggleLeftSideMenu = function() {
    		$ionicSideMenuDelegate.toggleLeft();
  		};

	// $scope.updateUserDetails = function (user) {
	// 	$ionicLoading.show({
	// 		content: 'loading',
	// 		showBackdrop: false
	// 	});
	// 	console.log('updating controller');
	// 	dashboardFactory.updateDetails(user)
	// 		.success(function(response, status) {
	// 			console.log(response);
	// 			$ionicLoading.hide();
	// 		})
	// 		.error(function(data, status, headers, config) {
	// 			console.log('error');
	// 			$ionicLoading.hide();
	// 		});
	// };
}])

.controller('MapController', function($scope, $ionicLoading) {
	console.log('MapController');

	$scope.mapCreated = function(map) {
		$scope.map = map;
	};

	$scope.centerOnMe = function () {
		console.log("Centering");
		if (!$scope.map) {
			return;
		}

		$scope.loading = $ionicLoading.show({
			content: 'Getting current location...',
			showBackdrop: false
		});

		navigator.geolocation.getCurrentPosition(function (pos) {
			console.log('Got pos', pos);
			$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			$scope.loading.hide();
		}, function (error) {
			alert('Unable to get location: ' + error.message);
		});
	};
});
