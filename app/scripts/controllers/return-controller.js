/**
 * Created by Jalaj Khajotia on 6/24/2016.
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
    .controller('ReturnCtrl', function ($scope, $http, $location, $stateParams, $localStorage, $cookieStore, Library) {

        Library.checkForLogin();
        var selectedBooks = [];
        Library.getReturnBooks().then(function (result) {
            $scope.returnBooks = result;
            selectedBooks = angular.copy(result);
        });


        $scope.openIssueHistory = function (index) {

        };

        $scope.addOrRemoveBook = function (index) {
            var position = _.findIndex(selectedBooks, function (o) {
                return o.id === $scope.returnBooks[index].id;
            });
            console.log(position);
            if (position >= 0) {
                selectedBooks.splice(position, 1);
            }
            else {
                selectedBooks.push($scope.returnBooks[index]);
            }
            if (selectedBooks.length != $scope.returnBooks.length) {
                $scope.areRBooksSelected = true;
            } else {
                $scope.areRBooksSelected = false;
            }
        };

        $scope.removeSelectedBooks = function () {
            $scope.returnBooks = angular.copy(selectedBooks);
            Library.setReturnBooks($scope.returnBooks);
            $scope.areRBooksSelected = false;
        };

        $scope.confirmReturnBooks = function () {
            var payload = createReturnPayload($scope.returnBooks);
            console.log({'issueBook': payload});
            Library.returnIssueBooks({'issueBook': payload}).then(function () {
                Library.setReturnBooks({});
                $location.path('/dashboard/issue-history');
            }, function () {
                alert('some error occured while updating');
            });
        };
        function createReturnPayload(dataarray) {
            var payload = [];
            var today = new Date().toJSON().slice(0, 10);
            dataarray.forEach(callback);
            function callback(element, index, array) {

                payload.push({
                    'returnDate': today,
                    'pending': 0,
                    'BookId': element.BookId,
                    'IssueId': element.IssueId
                });
            };
            return payload;

        }

        /*$scope.returnBooks = [{
         "bookName": "The Diary of a Young Girl (Mass Market Paperback)",
         "bookAuthor": " Anne Frank",
         "DueOn": "7/8/2016",
         "Price": 300,
         "Status": "Due",
         "Image": "images/dummy-data/twilight.jpg"
         },
         {
         "bookName": "Night (The Night Trilogy, #1) ",
         "bookAuthor": "Elie Wiesel",
         "DueOn": "15/7/2016",
         "Price": 400,
         "Status": "Due",
         "Image": "images/dummy-data/tomm.jpg"
         },
         {
         "Name": "The Glass Castle (Paperback) ",
         "Author": " Jeannette Walls ",
         "DueOn": "NA",
         "Price": 300,
         "Status": "Returned",
         "Image": "images/dummy-data/oath.jpg"
         },
         {
         "Name": "I Know Why the Caged Bird Sings (Paperback)",
         "Author": "Maya Angelou",
         "DueOn": "10/05/2016",
         "Status": "Over-Due",
         "Price": 180,
         "Image": "images/dummy-data/five.jpg"
         }];*/
    });