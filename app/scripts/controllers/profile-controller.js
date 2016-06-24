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
    .controller('ProfileCtrl', function ($scope, $http, $location, $timeout) {
        $scope.edit = true;

        $scope.editform = function () {
            $scope.edit = false;
        }

        $scope.savingform = false;
        $scope.selected = true;

        $scope.saveProfile = function () {
            $scope.savingform = true;
            $scope.edit = true;
            $timeout(function () {
                $scope.savingform = false;
            }, 3000);
        }
        $scope.showbackground = function(){
            $scope.selected = false;
        }

        $scope.hidebackground =  function(){
            $scope.selected = true;
        }

    });