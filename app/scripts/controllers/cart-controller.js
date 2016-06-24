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
    .controller('CartCtrl', function($scope, $http, $location, $stateParams, $localStorage ,$cookieStore) {

        //$scope.sciBooks =   $cookieStore.get('sci');
       var sciBooks = $cookieStore.get('SciFi');
        var autoBooks = $cookieStore.get('Autobiography');
        var fictionBooks = $cookieStore.get('Fiction');

        if(typeof(sciBooks) !== "undefined"){
               $scope.sciBooks = JSON.parse(sciBooks);
        }

        if(typeof(autoBooks) !== "undefined" ){
           $scope.autoBooks = JSON.parse(autoBooks);
        }

        if(typeof(fictionBooks) !== "undefined"){
           $scope.fictionBooks = JSON.parse(fictionBooks);
        }
        var sciBooksNew = angular.copy($scope.sciBooks);
        var autoBooksNew = angular.copy($scope.autoBooks);
        var fictionBooksNew = angular.copy($scope.fictionBooks);

        $scope.areItemsSelected = false;

        if($scope.sciBooks.length >0 || $scope.autoBooks.length >0  ||
            $scope.fictionBooks.length >0  ) {
            $scope.areItemsPresent= true;
        }
        else{
            $scope.areItemsPresent= false;
        }

        function shouldDisplayRemove(){
            if(sciBooksNew.length !== $scope.sciBooks.length || fictionBooksNew.length !== $scope.autoBooks.length ||
                autoBooksNew.length !== $scope.fictionBooks.length ){
                $scope.areItemsSelected = true;
            }else{
                $scope.areItemsSelected = false;
            }
        }
        $scope.selectSciBook = function(index){
            var  position =  _.findIndex(sciBooksNew, function(o) { return o.Name == $scope.sciBooks[index].Name; });
            console.log(position);
            if(position>=0){
                sciBooksNew.splice(position,1);
            }
            else{
                sciBooksNew.push($scope.sciBooks[index]);
            }
            shouldDisplayRemove();
        }
        $scope.selectFictionBook= function(index){
            var  position =  _.findIndex(fictionBooksNew, function(o) { return o.Name == $scope.fictionBooks[index].Name; });

            if(position>=0){
                fictionBooksNew.splice(position,1);
            }
            else{
                fictionBooksNew.push($scope.fictionBooks[index]);
            }
            shouldDisplayRemove();
        }
        $scope.selectAutoBook= function(index){
            var  position =  _.findIndex(autoBooksNew, function(o) { return o.Name == $scope.autoBooks[index].Name; });
            if(position>=0){
                autoBooksNew.splice(position,1);
            }
            else{
                autoBooksNew.push($scope.autoBooks[index]);
            }
            shouldDisplayRemove();
        }
        $scope.removeBooks = function(){
            $scope.sciBooks = angular.copy(sciBooksNew);
            $scope.autoBooks = angular.copy(autoBooksNew);
            $scope.fictionBooks = angular.copy(fictionBooksNew);
        }

        $scope.confirmBooks = function(){

        }
    });