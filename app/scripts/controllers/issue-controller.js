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
    .controller('IssueCtrl', function ($scope, $http, $location, $stateParams, $localStorage, $cookieStore, Library) {

        $scope.openIssueHistory = function (index) {
            console.log(index);
            $scope.books = $scope.issueHistory[index].Issue_books;
            $scope.issueDate = $scope.issueHistory[index].date;
            if($scope.books.length > 0){
                $('#modal1').openModal();
            }
        };
        $scope.areRBooksSelected = false;

        var userID = {};
        var loggedUser = $cookieStore.get('loggedUser');
        if(typeof(loggedUser)!== "undefined" ){
            userID = loggedUser.id;
        }

        Library.getAllBooks().then(function(books){
            Library.getAllIssueForUser(userID).then(function(userIssuedData){
                console.log(userIssuedData);
                var newBooks = userIssuedData.Issue_books;
                userIssuedData.forEach(callback);
                function callback(element,index,array){
                        var pendingCount = 0;
                        for(var i =0; i< element.Issue_books.length; i++){
                            var callback2 = function(o) {
                                return o.id === element.Issue_books[i].BookId;
                            };
                            var selectedBook = _.find(books,callback2 );
                            if(selectedBook.pending){
                                pendingCount++;
                            }
                            element.Issue_books[i].bookName= selectedBook.name;
                            element.Issue_books[i].bookPrice= selectedBook.price;
                            element.Issue_books[i].bookAuthor= selectedBook.author;
                            element.Issue_books[i].available= selectedBook.available;
                        }
                        element.dueBooks = pendingCount;
                        element.date = element.createdAt.split('T')[0];
                }
                $scope.issueHistory = userIssuedData;
                console.log(userIssuedData);
            });
        });


        $scope.ReturnBooks = function(){
            $location.path('/dashboard/return');
        };

        $scope.selectBook = function(index){
            $scope.areRBooksSelected = true;
        };
/*

        $scope.books = [{
            "Name": "The Diary of a Young Girl (Mass Market Paperback)",
            "Author": " Anne Frank",
            "DueOn": "7/8/2016",
            "Price": 300,
            "Status": "Due",
            "Image": "images/dummy-data/twilight.jpg"
        },
            {
                "Name": "Night (The Night Trilogy, #1) ",
                "Author": "Elie Wiesel",
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
            }];
*/

       /* $scope.issueHistory = [{
            "Date": "01/02/2016",
            "TotalBooksIssued": "5",
            "TotalDueBooks": "1"
        }, {
            "Date": "01/05/2016",
            "TotalBooksIssued": "1",
            "TotalDueBooks": "1"
        }, {
            "Date": "01/06/2016",
            "TotalBooksIssued": "3",
            "TotalDueBooks": "0"
        }, {
            "Date": "01/07/2016",
            "TotalBooksIssued": "1",
            "TotalDueBooks": "0"
        }];*/
    });