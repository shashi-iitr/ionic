angular.module('starter.controller', [])

.controller('LoginController', ['$scope', '$ionicLoading', 'loginFactory', function($scope ,$ionicLoading, loginFactory) {
	console.log('LoginController');

	var user = {};
	// $scope.userCredentials = {'email':'veeru.agrawal@gmail.com',
	// 'password': '123'};

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
			window.location.href = '#/dashboard';
		})
		.error(function(data, status, headers, config) {
			console.log('error');
			$ionicLoading.hide();
		});
	};
	console.log(window.localStorage['userCredentials']);
	if(!angular.isUndefined(window.localStorage['userCredentials'])) {
		$scope.userCredentials = JSON.parse(window.localStorage['userCredentials']);
	} else {
		$scope.userCredentials = {};
	}
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

.controller('GridController', ['$scope', 'listFactory', function($scope, listFactory) {
	console.log('GridController');
	$scope.items = listFactory.getList();
}])

.controller('ContactController', ['$scope', 'contactFactory', '$ionicModal', function($scope, contactFactory, $ionicModal) {
	console.log('ContactController');
	$scope.contacts = contactFactory.getContactDetails();

	$ionicModal.fromTemplateUrl('templates/contactModal.html', {
	  scope: $scope,
	  animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });  

	  $scope.openModal = function(contact) {
	  	$scope.contact = contact;
	  	console.log(contact);
	    $scope.modal.show();
	  };

	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };

	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });

}])

.controller('CameraController', ['$scope', function($scope) {
	console.log('CameraController');
	// $scope.cameraPic = "";
	// $scope.takePicture = function(){   
	// 	navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
	// 	    destinationType: Camera.DestinationType.DATA_URL
	// 	});

	// 	function onSuccess(imageData) {
	// 		alert('hello');
	// 		// $scope.cameraPic = "data:image/jpeg;base64," + imageData;
	// 	    // var image = document.getElementById('myImage');
	// 	    // image.src = "data:image/jpeg;base64," + imageData;
	// 	}

	// 	function onFail(message) {
	// 	    alert('Failed because: ' + message);
	// 	}
 //    };
}])

.controller('FreshlyPressedController', ['$scope', '$ionicLoading', 'freshlyPressedFactory', function($scope, $ionicLoading, freshlyPressedFactory) {
	console.log('FreshlyPressedController');
	$scope.posts = [];
	$ionicLoading.show({
		content: 'loading',
		showBackdrop: true
	});

	$scope.doRefresh = function () {
		freshlyPressedFactory.getBlogs()
		.success(function(response, status) {
			console.log(response);
			$scope.$broadcast('scroll.refreshComplete');
			$scope.posts = response.posts;
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});
	}

	freshlyPressedFactory.getBlogs()
	.success(function(response, status) {
		console.log(response);
		$ionicLoading.hide();
		$scope.posts = response.posts;
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});

}])

.controller('UpdateDetailsController', ['$scope', '$ionicLoading', 'loginFactory', 'updateUserDetailFactory', function($scope, $ionicLoading, loginFactory, updateUserDetailFactory) {
	console.log('UpdateDetailsController');
	$scope.user = loginFactory.getUser();
	console.log($scope.user);

	$scope.updateUserDetails = function (user) {
		$ionicLoading.show({
			content: 'loading',
			showBackdrop: true
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

.controller('ListController', ['$scope', '$ionicPopover', '$ionicLoading', 'listFactory', function($scope, $ionicPopover, $ionicLoading, listFactory) {
	console.log('ListController');
	$scope.products = [];

	$ionicLoading.show({
		content: 'loading',
		showBackdrop: true
	});
	listFactory.getProducts().then(function(response) {
		console.log(response.data.products);
		$ionicLoading.hide();
		$scope.products = response.data.products;
	}, function(error) {
		$ionicLoading.hide();
		console.log(error);
	});

	$scope.doRefresh = function() {
		listFactory.getProducts().then(function(response) {
			console.log(response.data.products);
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$apply()
			$scope.products = response.data.products;
		}, function(error) {
			console.log(error);
		});
	};

  	$scope.search = function() {
  	listFactory.doSearch($scope.query)
  		.then(function(resp){
  			console.log(resp);
  		});
  	};

	  $ionicPopover.fromTemplateUrl('templates/productPopover.html', {
	    scope: $scope
	  }).then(function(popover) {
	    $scope.popover = popover;
	  });

	  $scope.openPopover = function(product, $event) {
	  	$scope.product = product;
	  	console.log(product);
	    $scope.popover.show($event);
	  };
	  $scope.closePopover = function() {
	    $scope.popover.hide();
	  };
	  //Cleanup the popover when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.popover.remove();
	  });
	  // Execute action on hide popover
	  $scope.$on('popover.hidden', function() {
	    // Execute action
	  });
	  // Execute action on remove popover
	  $scope.$on('popover.removed', function() {
	    // Execute action
	  });

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
