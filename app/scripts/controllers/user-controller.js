'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('sbAdminApp')
  .controller('UserCtrl', ['$scope', '$position', '$http', '$timeout', '$cookieStore',
    'Api', '$state', 'localStorageService', 'toaster', 'Gst',
    function ($scope, $position, $http, $timeout, $cookieStore,
      Api, $state, localStorageService, toaster, Gst) {

      $scope.userData = [];
      $scope.roles = [];
      $scope.editUser = {};
      $scope.addUser = {};
      $scope.company = [];

      $scope.addUser.role = {
        text: 'Select role',
        value: 'Select role'
      }

      $scope.addUser.company = {
        text: 'Select company',
        value: 'Select company'
      }

      $scope.getRoleName = function (id) {
        if (id && $scope.roles) {
          var first = $scope.roles.filter(x => x.id == id)[0];
          if (first) {
            return first.text;
          }
        }
      }

      $scope.getCompanyName = function (id) {
        if (id && $scope.companyData) {
          var first = $scope.companyData.filter(x => x.id == id)[0];
          if (first) {
            return first.name;
          }
        }
      }


      function LoadCompanies() {
        $scope.company = [];
        Api.getCompanies().then(function (data) {
          $scope.companyData = data.companies;

          for (let i = 0; i < data.companies.length; i++) {
            const element = data.companies[i];
            if (element.isActive) {
              $scope.company.push({
                text: element.name,
                value: element.name,
                id: element.id
              });
            }
          }
        }, function () {
          Gst.showErrorToast('Error', 'Unable to load Companies');
        });
      }

      function LoadUsers() {
        $scope.roles = [];
        Api.getUsers().then(function (data) {
          $scope.userData = data.users
        }, function () {
          Gst.showErrorToast('Error', 'Unable to load users');
        });

        Gst.getClientGstData().then(function (data) {
          for (let i = 0; i < Object.values(data.roles).length; i++) {
            const element = Object.values(data.roles)[i];
            $scope.roles.push({
              text: element,
              value: element,
              id: Object.keys(data.roles)[i]
            });
          }
        });
      }

      LoadUsers();
      LoadCompanies();

      $scope.addUser = function () {
        if ($scope.addUser.userName.split(' ').length > 1) {
          Gst.showErrorToast('Error', 'Spaces in emailid');
        }
        if ($scope.addUser.userName) {
          Api.createUser({
            email: $scope.addUser.userName,
            password: $scope.addUser.password,
            companyid: $scope.addUser.company.id,
            role: $scope.addUser.role.id
          }).then(function () {
            Gst.showSuccessToast('Success', 'User added');
            LoadUsers();
            $scope.closeAddUserModel();
          }, function () {
            Gst.showErrorToast('Error', 'Try again');
          });
        } else if (!$scope.addUser.company) {
          Gst.showErrorToast('Error', 'Please select a company');

        } else {
          Gst.showErrorToast('Error', 'Check email or password');
        }
      }

      $scope.updateUser = function () {

        if ($scope.editUser.email.split(' ').length > 1) {
          Gst.showErrorToast('Error', 'Spaces in emailid');
        }
        if ($scope.editUser.password) {
          var userObj = {
            email: $scope.editUser.email,
            password: $scope.editUser.password,
            role: $scope.editUser.role.id,
            companyid: $scope.editUser.company.id,
            id: $scope.editUser.id
          };
        } else {
          var userObj = {
            email: $scope.editUser.email,
            role: $scope.editUser.role.id,
            companyid: $scope.editUser.company.id,
            id: $scope.editUser.id
          };
        }
        if ($scope.editUser.email) {
          Api.updateUser(userObj).then(function () {
            Gst.showSuccessToast('Success', 'User modified');
            LoadUsers();
            $scope.closeEditModel();
          }, function () {
            Gst.showErrorToast('Error', 'Try again');
          });
        } else {
          Gst.showErrorToast('Error', 'Fill all details');
        }
      }

      $scope.openEditUserModel = function (data) {
        $scope.editUser = data;
        $scope.editUser.password = "";
        if ($scope.companyData.length > 0) {
          var company = $scope.companyData.filter(a => a.id == data.companyid)[0];
          $scope.editUser.company = {
            text: company.name,
            value: company.name,
            id: company.id,
          };
        } else {
          Gst.showErrorToast('Error', 'Companies not loaded, Refresh');
        }

        var userRole = $scope.roles.filter(x => x.id == data.role)[0];
        $scope.editUser.role = userRole;

        $('#editUser').openModal();
      }

      $scope.openDeleteUserModel = function (data) {
        $scope.deleteCompany = data;
        $scope.companyName = data.name;
        $('#deleteUser').openModal();
      }

      $scope.confirmDeleteUser = function () {
        var data = $scope.deleteCompany;
        Api.deleteCompany(data.id).then(function () {
          Gst.showSuccessToast('Success', 'Company deleted');
          $scope.closeCancelDeleteModel();
        }, function () {
          Gst.showErrorToast('Error', 'Try again');
        })
      }

      $scope.closeAddUserModel = function () {
        $('#addUser').closeModal();
      }

      $scope.openAddUserModel = function () {
        $scope.companyName = "";
        $('#addUser').openModal();
      }

      $scope.closeCancelDeleteModel = function () {
        $('#deleteUser').closeModal();
      }

      $scope.closeEditModel = function () {
        $('#editUser').closeModal();
      }
    }
  ]);