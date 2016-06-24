'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
    .directive('sidebar', ['$location', function() {
        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function($scope, $cookieStore, $rootScope) {
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;
                var mobileView = 992;

                $scope.getWidth = function() {
                    return window.innerWidth;
                };
                // 

                $scope.$watch($scope.getWidth, function(newValue, oldValue) {
                    if (newValue >= mobileView) {
                        if (angular.isDefined($cookieStore.get('toggle'))) {
                            $scope.toggle = !$cookieStore.get('toggle') ? true : false;
                            $scope.changeview = !$scope.toggle;
                        } else {
                            $scope.toggle = true;
                            $rootScope.changeview = !$scope.toggle;
                        }
                        /*  if (angular.isDefined($cookieStore.get('changeview'))) {
                            $scope.rootScope = !$cookieStore.get('changeview') ? false : true;
                        } else {
                            $scope.rootScope = true;
                        }*/
                    } else {
                        $scope.toggle = false;
                        $rootScope.changeview = !$scope.toggle;
                    }

                });

                $scope.toggleSidebar = function() {
                    console.log('i am invoked');
                    $scope.toggle = !$scope.toggle;
                    $rootScope.changeview = !$scope.toggle;
                    $cookieStore.put('toggle', $scope.toggle);
                    /*    $cookieStore.put('changeview', $rootScope.changeview);*/
                };

                window.onresize = function() {
                    $scope.$apply();
                };

                $scope.check = function(x) {

                    if (x == $scope.collapseVar)
                        $scope.collapseVar = 0;
                    else
                        $scope.collapseVar = x;
                };

                $scope.multiCheck = function(y) {

                    if (y == $scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
            }
        }
    }]);
