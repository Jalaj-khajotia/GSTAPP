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
    .controller('LoginCtrl', function ($scope, $http, $location, $cookieStore) {
        var endPoint = "http://localhost:3000/v1/";
        $scope.signin = function () {
            $http({
                    method: 'POST',
                    url: endPoint + 'users/login',
                    data: {
                        "email": $scope.email,
                        "password": $scope.password
                    }
                })
                .then(function (response) {
                    $location.path('/dashboard/home');
                    $cookieStore.put('loggedUser', response.data);
                }, function (response) {
                    alert("Either password or username is wrong");
                });
            $location.path('/dashboard/home');
            $cookieStore.put('loggedUser', 'jalaj');
        }
    });