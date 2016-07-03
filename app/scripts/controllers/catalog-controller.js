'use strict';
/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */

var module = angular.module('sbAdminApp');

controller.$inject = ['$scope','Library'];
 function controller($scope, Library ) {
     Library.checkForLogin();
     $scope.images= [];
     Library.getCatalog().then(function(data){
         $scope.catalogBooks = data;
         if( $scope.catalogBooks.length >1){
             $scope.images.push('images/categories/auto.jpg');
             $scope.images.push('images/categories/sci-fi.jpg');
             $scope.images.push('images/categories/fiction.jpg');
         }
     }, function(){
         alert('may be service is down')
     });
    };

module.controller('CatalogCtrl',controller);