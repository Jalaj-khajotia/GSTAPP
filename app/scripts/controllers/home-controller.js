'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('HomeCtrl', ['$scope', '$position', '$http', '$timeout', '$cookieStore', '$location',
     'Gst', '$state','$rootScope',
        function ($scope, $position, $http, $timeout, $cookieStore, $location, Gst, $state, $rootScope) {

            try {
                var loggedUser = $cookieStore.get('loggedUser');
                if (typeof (loggedUser) === "undefined") {
                    $('#login').openModal();
                } else {
                    Gst.getLoggedInUser().then(function (data) {
                        $rootScope.role = data.user.role;
                        $scope.emailid = data.user.email
                        //$state.go('dashboard.home')
                    }, function () {
                        $('#login').openModal();
                    });
                }
            } catch (error) {
                $('#login').openModal();
              //  $cookieStore.remove('loggedUser');
            }
        }
    ]);