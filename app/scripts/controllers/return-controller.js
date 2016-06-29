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
    .controller('ReturnCtrl', function ($scope, $http, $location, $stateParams, $localStorage, $cookieStore) {

        $scope.issueHistory =[{
            "Date" : "01/02/2016" ,
            "TotalBooksIssued": "5",
            "TotalDueBooks": "1"
        },{
            "Date" : "01/05/2016" ,
            "TotalBooksIssued": "1",
            "TotalDueBooks": "1"
        },{
            "Date" : "01/06/2016" ,
            "TotalBooksIssued": "3",
            "TotalDueBooks": "0"
        },{
            "Date" : "01/07/2016" ,
            "TotalBooksIssued": "1",
            "TotalDueBooks": "0"
        }];

        $scope.openIssueHistory = function(index){
            console.log(index);
            $('#modal1').openModal();
        };

        $scope.totalBooksReturning = 10;

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
    });