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
    .controller('BookCtrl', function ($scope, $http, $location, $stateParams, $localStorage, $cookieStore, Library) {
        var catalogType = $stateParams.type;
        $scope.catalogType = $stateParams.type;

        Library.checkForLogin();

        Library.getBooksByCategoryId($stateParams.id).then(function (data) {
            $scope.books = data;
            console.log(data);
        });

        $scope.areItemsSelected = false;

        $scope.selectedBooks = [];
        $scope.selectBook = function (index) {
            var contains = false, containAt = -1;

            var position = $scope.selectedBooks.indexOf($scope.books[index]);
            if (position >= 0) {
                $scope.selectedBooks.splice(position, 1);
            }
            else {
                $scope.selectedBooks.push($scope.books[index]);
            }

            if ($scope.selectedBooks.length > 0) {
                $scope.areItemsSelected = true;
            } else {
                $scope.areItemsSelected = false;
            }
            console.log($scope.selectedBooks);
        }

        $scope.checkout = function () {
            function duplicate(n) {
                n.categoryName = catalogType;
                return n;
            }

            var result = _.flatMap($scope.selectedBooks, duplicate);
            var books = JSON.stringify(result);
            // $cookieStore.put('cartDetails', books);
            AddOrUpdateCookie(result, 'cartBooks');
            $location.path('/dashboard/cart');
        }

        function AddOrUpdateCookie(data, cookieName) {
            var result = $cookieStore.get(cookieName);

            if (result === 'undefined' || result === null || result === undefined) {
                $cookieStore.put(cookieName, data);
            }
            else {
                if (typeof (result) == "string") {
                    var jsonArray = JSON.parse(result);
                    var union = joinarrays(jsonArray, data);
                    $cookieStore.put(cookieName, JSON.stringify(union));
                } else {
                    var union = joinarrays(result, data);
                    $cookieStore.put(cookieName, JSON.stringify(union));
                }
            }
        }

        function joinarrays(dataset1, dataset2) {
            var dataset = [], hash = {};
            for (var i = 0; i < dataset1.length; i++) {
                if (!hash[dataset1[i].id]) {
                    hash[dataset1[i].id] = true;
                    dataset.push(dataset1[i]);
                }
            }
            for (var j = 0; j < dataset2.length; j++) {
                if (!hash[dataset2[j].id]) {
                    hash[dataset2[j].id] = true;
                    dataset.push(dataset2[j]);
                }
            }
            return dataset;
        }

    });