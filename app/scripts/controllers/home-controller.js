'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('HomeCtrl', ['$scope', '$position', '$http', '$timeout', function($scope, $position, $http, $timeout) {
        $scope.myFunction = function() {
            document.getElementById("myDropdown").classList.toggle("show");
            // $scope.dropdownClicked();
        }

        function GetData() {
            $http.get("http://localhost:8000/products")
                .success(function(data) {
                    console.log(data);
                    $scope.reviews = data;
                })
                .error(function(data, status, headers, config) {
                    console.log(status + " Data: " + data);
                });
        }
        GetData();
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

        $scope.$watch('searchdata', function(newValue, oldValue) {
            $scope.search(newValue);
            //do something
        });
          $.keyframe.debug = true;

        $.keyframe.define([{
            name: 'move-left',

            '100%': {
                'margin-left': '-600px'
            }
        }]);
         $.keyframe.define([{
            name: 'move-right',

            '100%': {
                'margin-left': '600px'
            }
        }]);

        $("#rightbtn").on("click ", function() {
            /*     $('#r1').show();
            $('#r1').addClass("row11");*/
            $('#product-list').playKeyframe({
                name: 'move-left', // name of the keyframe you want to bind to the selected element
                duration: '3s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
                timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
                delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
                iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
                direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
                fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
                complete: function() {} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
            });            
        });

  $("#leftbtn").on("click ", function() {
            /*     $('#r1').show();
            $('#r1').addClass("row11");*/
            $('#product-list').playKeyframe({
                name: 'move-right', // name of the keyframe you want to bind to the selected element
                duration: '3s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
                timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
                delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
                iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
                direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
                fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
                complete: function() {} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
            });            
        });
        $scope.search = function(key) {
            /*  $http.defaults.headers.common['Content-Type'] = 'application/json';
            $http.defaults.headers.common['x-access-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTM5ODEzMTY2MDl9.PIJUtjcvZXmu_zxFh6KeU3aikXRyDcpop2MAMM_sQas';
*/
            /*  $http.get('http://localhost:8500/api/v1/product/' + key)
                  .then(function(response) {
                      $scope.searchResult = [];
                      if (response.data.length > 0) {
                          sessionStorage.setItem('customerSearch', JSON.stringify(response.data));
                      }
                      console.log(response.data);
                      $scope.searchResult = response.data;
                  }, function(error) {
                      $scope.searchResult = [];
                      console.log(error.data);
                  });*/
        }


        // Close the dropdown menu if the user clicks outside of it
        /*    window.onclick = function(event) {
                if (!event.target.matches('.dropbtn')) {

                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }*/
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
