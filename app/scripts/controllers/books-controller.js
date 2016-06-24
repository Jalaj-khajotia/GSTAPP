/**
 * Created by Jalaj Khajotia on 6/23/2016.
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
    .controller('BookCtrl', function($scope, $http, $location, $stateParams, $localStorage, $cookieStore) {
        var catalogType = $stateParams.type;
        $scope.catalogType = $stateParams.type;
        if(catalogType === "Fiction"){
            $scope.books=[{"Name":"twilight","Author":"Stephen Mayor","Available":true,"Price": 300,"Image": "images/dummy-data/twilight.jpg"},
                {"Name":"If tomorrow comes","Author":"Shedney Shildon","Available":true,"Price": 400,"Image": "images/dummy-data/tomm.jpg"},
                {"Name":"The oath of vayuputras","Author":"Amish Triphi","Available":false,"Price": 300,"Image": "images/dummy-data/oath.jpg"},
                {"Name":"Five point someone","Author":"Chetan Bhagat","Available":true,"Price": 180,"Image": "images/dummy-data/five.jpg"}];
        } else if(catalogType === "SciFi"){
            $scope.books=[{"Name":"Ender's Game (The Ender Quintet, #1) ","Author":"Orson Scott Card","selected":false,"Available":false,"Price": 300,"Image": "images/dummy-data/twilight.jpg"},
                {"Name":"Dune (Dune Chronicles, #1) ","Author":"Frank Herbert","Available":true,"Price": 400,"selected":false,"Image": "images/dummy-data/tomm.jpg"},
                {"Name":"1984 ","Author":"George Orwell","Available":false,"Price": 300,"selected":false,"Image": "images/dummy-data/oath.jpg"},
                {"Name":"Fahrenheit 451 ","Author":"Ray Bradbury ","Available":true,"Price": 180,"selected":true,"Image": "images/dummy-data/five.jpg"}];
        }else{
            $scope.books=[{"Name":"The Diary of a Young Girl (Mass Market Paperback)","Author":" Anne Frank","Available":true,"Price": 300,"Image": "images/dummy-data/twilight.jpg"},
                {"Name":"Night (The Night Trilogy, #1) ","Author":"Elie Wiesel","Available":true, "Price": 400,"Image": "images/dummy-data/tomm.jpg"},
                {"Name":"The Glass Castle (Paperback) ","Author":" Jeannette Walls ","Available":true, "Price": 300,"Image": "images/dummy-data/oath.jpg"},
                {"Name":"I Know Why the Caged Bird Sings (Paperback)","Author":"Maya Angelou","Available":false,"Price": 180,"Image": "images/dummy-data/five.jpg"}];
        }

        $scope.areItemsSelected = false;
        $scope.$watch( $scope.mybook, function(newValue, oldValue) {
           console.log(newValue);
        });

        $scope.selectedBooks = [];
        $scope.selectBook = function(index){
           var contains = false, containAt= -1;

            var position = $scope.selectedBooks.indexOf($scope.books[index]);
            if(position >= 0){
                $scope.selectedBooks.splice(position,1);
            }
            else{
                $scope.selectedBooks.push($scope.books[index]);
            }

            if($scope.selectedBooks.length>0){
                $scope.areItemsSelected = true;
            }else{
                $scope.areItemsSelected = false;
            }
            console.log($scope.selectedBooks);
        }

        $scope.checkout = function(){
          /*  $localStorage.$default({
                catalogType: books
            });*/
            var books = JSON.stringify($scope.selectedBooks);
            //$localStorage.setItem(catalogType, books);
            $cookieStore.put(catalogType, books);
            $location.path('/dashboard/cart');
        }

      /*  $scope.signin = function() {
            $http({
                method: 'POST',
                url: 'http://localhost:8000/login',
                data: {
                    "email": $scope.email,
                    "password": $scope.password
                }
            })
                .then(function(response) {

                    $location.path('/#/dashboard/home');

                    sessionStorage.setItem('token', response.data.token);
                }, function(response) {
                    alert("Either password or username is wrong");
                });
        }*/
    });