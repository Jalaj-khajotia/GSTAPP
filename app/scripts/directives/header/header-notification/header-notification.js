'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
	.directive('headerNotification', [function () {
		return {
			templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
			scope: {},
			controller: function ($scope, $cookieStore, $rootScope, $location,
				localStorageService, Gst, $timeout) {
				$scope.showAdminPanel = false;
				$timeout(function () {
					Gst.getLoggedInUser().then(function (data) {
						$scope.role = data.user.role;
						if ($scope.role == 1) {
							$scope.showAdminPanel = true;
						} else {
							$scope.showAdminPanel = false;
						}
						//$state.go('dashboard.home')
					}, function () {
					});
				}, 1000);
				$scope.logout = function () {
					localStorageService.remove('userInfo');
					$cookieStore.remove('loggedUser');
					$location.path('/login');

				}
			}
		}
	}]);