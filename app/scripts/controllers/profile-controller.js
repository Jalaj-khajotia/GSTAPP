/**
 * Created by Jalaj Khajotia on 4/15/2016.
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
    .controller('ProfileCtrl', function ($scope, $http, $location, $timeout, Library, $cookieStore) {
        Library.checkForLogin();
        $scope.edit = true;

        $scope.editform = function () {
            $scope.edit = false;
        }
        var loggedUser = $cookieStore.get('loggedUser');
        if (!loggedUser || loggedUser !== undefined) {
            $scope.department = loggedUser.department;
            $scope.name = loggedUser.name;
            $scope.email = loggedUser.email;
        }
        console.log(loggedUser);

        $scope.savingform = false;
        $scope.selected = true;

        $scope.saveProfile = function () {
            $scope.savingform = true;
            $scope.edit = true;
            var payload = {
                "id": loggedUser.id,
                "email": loggedUser.email,
                "password": $scope.password,
                "department": $scope.department,
                "name": $scope.name,
                "token":loggedUser.token
            }
            Library.updateUserData(payload, loggedUser.id).then(function(){
                $scope.savingform = false;
                payload.password = "";
                $cookieStore.put('loggedUser',payload );
                $('#profile-success').openModal();
            },function(){
                alert('error while updating user info');
            });
        }
        $scope.showbackground = function () {
            $scope.selected = false;
        }

        $scope.hidebackground = function () {
            $scope.selected = true;
        }

    });