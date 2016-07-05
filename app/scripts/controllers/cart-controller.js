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
    .controller('CartCtrl', function ($scope, $http, $location, $stateParams, $localStorage, $cookieStore, Library) {

        Library.checkForLogin();
        var sciBooks = $cookieStore.get('SciFi');
        var autoBooks = $cookieStore.get('Autobiography');
        var fictionBooks = $cookieStore.get('Fiction');
        $scope.cartBooks = [];
        if (typeof(sciBooks) !== "undefined") {
            $scope.sciBooks = JSON.parse(sciBooks);
        }

        if (typeof(autoBooks) !== "undefined") {
            $scope.autoBooks = JSON.parse(autoBooks);
        }

        if (typeof(fictionBooks) !== "undefined") {
            $scope.fictionBooks = JSON.parse(fictionBooks);
        }
        var cartBooks = $cookieStore.get('cartBooks');
        if (typeof(cartBooks) !== "undefined") {
            if(typeof (cartBooks) == "string"){
                $scope.cartBooks = JSON.parse(cartBooks);
            }else{
                $scope.cartBooks = cartBooks;
            }

        }
       /* ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];*/

        Library.getAllInfo().then(function (data) {
            $scope.catalogBooks = data;
            function duplicate(n) {
                for (var i = 0; i < n.Books.length; i++) {
                    n.Books[i].categoryName = n.name;
                }
                return n.Books;
            }
/*
            console.log($scope.cartBooks);
            var result = _.flatMap(data, duplicate);
            console.log(result);
            $scope.tableParams = new NgTableParams({
                // initial grouping
                group: "categoryName"
            }, {
                dataset: $scope.cartBooks
            });*/

        }, function () {
            alert('may be service is down')
        });

        $scope.areItemsSelected = false;
        if ($scope.cartBooks.length > 0) {
            $scope.areItemsPresent = true;
        }
/*
        if ($scope.sciBooks.length > 0 || $scope.autoBooks.length > 0 ||
            $scope.fictionBooks.length > 0) {
            $scope.areItemsPresent = true;
        }
        else {
            $scope.areItemsPresent = false;
        }
*/



      /*  this.del = del;
        function del(row) {
            console.log(row);
            _.remove(this.tableParams.settings().dataset, function (item) {
                return row === item;
            });
            this.tableParams.reload().then(function (data) {
                if (data.length === 0 && this.tableParams.total() > 0) {
                    this.tableParams.page(this.tableParams.page() - 1);
                    this.tableParams.reload();
                }
            });
        }*/
        var cartBooksNew = angular.copy($scope.cartBooks);
        $scope.selectBook = function (index) {
            var position = _.findIndex(cartBooksNew, function (o) {
                return o.id === $scope.cartBooks[index].id;
            });

            console.log(position);
            if (position >= 0) {
                cartBooksNew.splice(position, 1);
            }
            else {
                cartBooksNew.push($scope.cartBooks[index]);
            }
            if (cartBooksNew.length !=  $scope.cartBooks.length) {
                $scope.areItemsSelected = true;
            } else {
                $scope.areItemsSelected = false;
            }
        }

        $scope.removeBooks = function () {
            $scope.cartBooks = angular.copy(cartBooksNew);
            $scope.areItemsSelected = false;
        }
        var userID = {};
        var loggedUser = $cookieStore.get('loggedUser');
        if(typeof(loggedUser)!== "undefined" ){
            userID = loggedUser.id;
        }

        $scope.confirmBooks = function () {
            $cookieStore.put('finalIssue',$scope.cartBooks);

            var currentDate = new Date().toJSON().slice(0,10);
            Library.generateIssueId(userID, currentDate).then(function(data){
                var obj = generateIssueObject($scope.cartBooks,data.id);
                Library.saveIssuedBooks(obj).then(function(data){
                    console.log('success');
                    $cookieStore.remove('cartBooks');
                    $cookieStore.remove('finalIssue');
                    $location.path('/dashboard/issue-history');
                }, function(err){
                    console.log(err);
                });
            },function(){
            });
        };

        function generateIssueObject(obj, issueid){
            var issueobj=[];
            for(var i= 0; i<obj.length;i++){
                issueobj.push({
                    "pending": 1,
                    "issueDate": obj[i].updatedAt.split('.')[0],
                    "issueExpiry": obj[i].updatedAt.split('.')[0],
                    "IssueId": issueid,
                    "BookId": obj[i].id
                });
            }
            var retObj = {"issueBook": issueobj}
            return retObj;
        }
    });