

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('CustomerCtrl', function($scope) {

  var result = sessionStorage.getItem('customerSearch');
  console.log(result);
    
});