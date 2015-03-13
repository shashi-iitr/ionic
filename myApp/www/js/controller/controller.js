angular.module('starter.controller', [])

.controller('LoginController', ['$scope', '$window', '$ionicLoading', 'loginFactory', function($scope ,$window ,$ionicLoading, loginFactory) {
	console.log('LoginController');

	var user = {};

	$scope.signIn = function(user) {
		window.localStorage['userCredentials'] = JSON.stringify(user);

		$ionicLoading.show({
			content: 'loading',
			showBackdrop: true
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

	$scope.userCredentials = JSON.parse($window.localStorage['userCredentials'] || '{}');
	console.log($scope.userCredentials);
	if ($scope.userCredentials['email']) {
		$scope.signIn($scope.userCredentials);
	};

}])

.controller('DashboardController', ['$scope', '$ionicLoading', 'loginFactory', 'dashboardFactory', '$ionicSideMenuDelegate', function($scope, $ionicLoading, loginFactory, dashboardFactory, $ionicSideMenuDelegate) {
	console.log('DashboardController');
	$scope.user = loginFactory.getUser();
	console.log($scope.user);

		  $scope.toggleLeftSideMenu = function() {
    		$ionicSideMenuDelegate.toggleLeft();
  		};
}])

.controller('UpdateDetailsController', ['$scope', '$ionicLoading', 'loginFactory', 'updateUserDetailFactory', function($scope, $ionicLoading, loginFactory, updateUserDetailFactory) {
	console.log('UpdateDetailsController');
	$scope.user = loginFactory.getUser();
	console.log($scope.user);

	$scope.updateUserDetails = function (user) {
	$ionicLoading.show({
		content: 'loading',
		showBackdrop: false
	});
	console.log('updating controller');
	updateUserDetailFactory.updateDetails(user)
		.success(function(response, status) {
			console.log(response);
			$ionicLoading.hide();
		})
		.error(function(data, status, headers, config) {
			console.log('error');
			$ionicLoading.hide();
		});
	};
}])

.controller('ListController', ['$scope', 'listFactory', function($scope, listFactory) {
	console.log('ListController');
	$scope.items = listFactory.getList();
	console.log($scope.items);
}])

.controller('MapController', function($scope, $ionicLoading) {
	console.log('MapController');

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }

    function initialize () {
    			$ionicLoading.show({
			content: 'loading',
			showBackdrop: true
		});

    	var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 		console.log(map);
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
			geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
					var myLocation = new google.maps.Marker({
	                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
	                map: map,
	                title: results[0]['formatted_address']
	            });
			} 
});

            $ionicLoading.hide();
        });
 
        $scope.map = map;

    }
});
