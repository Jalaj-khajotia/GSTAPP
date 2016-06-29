/**
 * Created by Jalaj Khajotia on 4/11/2016.
 */
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('LoginCtrl', function($scope, $http, $location, $cookieStore) {
        $scope.signin = function() {
            $http({
                method: 'POST',
                url: 'http://localhost:8000/login',
                data: {
                    "email": $scope.email,
                    "password": $scope.password
                }
            })
                .then(function(response) {
                    $location.path('/dashboard/home');
                    $cookieStore.put('loggedUser',response.data);
                }, function(response) {
                    alert("Either password or username is wrong");
                });
        }
    });