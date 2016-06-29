'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('HomeCtrl', ['$scope', '$position', '$http', '$timeout','$cookieStore','$location',
        function($scope, $position, $http, $timeout, $cookieStore, $location) {

       var loggedUser = $cookieStore.get('loggedUser');
        if(typeof(loggedUser)=== "undefined" ){
            $location.path('/login');
        }else{
            $location.path('/dashboard/home');
        }



        $scope.myFunction = function() {
            document.getElementById("myDropdown").classList.toggle("show");
            // $scope.dropdownClicked();
        }


        $scope.products = [{ url: "images/dummy-data/oath.jpg", class: "left-align" },
            { url: "images/dummy-data/tomm.jpg", class: "right-align" }, { url: "images/dummy-data/twilight.jpg", class: "center-align" }
        ];
        $scope.myInterval = 3000;
        $timeout(function() {
            $('.carousel').carousel({ time_constant: 400, dist: 0 });
            $(document).ready(function() {
                $('.slider').slider({ indicators: true, height: 400, full_width: false });
            });
        }, 100);



        $scope.isDropDownVisible = false;

        $scope.OptionSelected = function(val) {
            if (val == "1") {
                $scope.searchOption = "by Name";
            } else if (val == "2") {
                $scope.searchOption = "by Order id";
            } else if (val == "3") {
                $scope.searchOption = "by Mobile";
            }
            console.log(val);
        }
        $scope.dropdownClicked = function() {
            document.getElementById("myDropdown").classList.toggle("show");
        }
    }]);
