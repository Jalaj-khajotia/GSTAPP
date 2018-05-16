'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('sbAdminApp')
    .controller('CompanyCtrl', ['$scope', '$position', '$http', '$timeout', '$cookieStore',
        'Api', '$state', 'localStorageService', 'toaster', 'Gst',
        function ($scope, $position, $http, $timeout, $cookieStore,
            Api, $state, localStorageService, toaster, Gst) {

            $scope.companyData = [];

            function LoadCompanies() {
                Api.getCompanies().then(function (data) {
                    $scope.companyData = data.companies
                }, function () {
                    Gst.showErrorToast('Error', 'Unable to load Companies');
                });
            }
            $scope.companyActiveOptions = [{
                    text: 'Active',
                    value: 'Active',
                    id: 1
                },
                {
                    text: 'Not active',
                    value: 'not active',
                    id: 0
                }
            ];
            $scope.editCompany = {};
            $scope.editCompany.isActive = {
                text: 'Select activity',
                value: 'Select activity'
            }

            LoadCompanies();

            $scope.addCompany = function () {
                if ($scope.companyName) {
                    Api.createCompany({
                        name: $scope.companyName,
                        isActive: 1
                    }).then(function () {
                        Gst.showSuccessToast('Success', 'Company added');
                        LoadCompanies();
                        $scope.closeAddCompanyModel();
                    }, function () {
                        Gst.showErrorToast('Error', 'Try again');
                    });
                } else {
                    Gst.showErrorToast('Error', 'Company name is blank');
                }
            }

            $scope.updateCompany = function () {
                var companyObj = {
                    name: $scope.editCompany.name,
                    isActive: $scope.editCompany.selectedIsActive.id,
                    id: $scope.editCompany.id
                };
                if ($scope.editCompany.name) {
                    Api.updateCompany(companyObj).then(function () {
                        Gst.showSuccessToast('Success', 'Company modified');
                        LoadCompanies();
                        $scope.closeEditModel();
                    }, function () {
                        Gst.showErrorToast('Error', 'Try again');
                    });
                } else {
                    Gst.showErrorToast('Error', 'Provide company name');
                }
            }

            $scope.openEditCompanyModel = function (data) {
                $scope.editCompany = data;
                if (data.isActive) {
                    $scope.editCompany.selectedIsActive = $scope.companyActiveOptions[0];
                } else {
                    $scope.editCompany.selectedIsActive = $scope.companyActiveOptions[1];
                }
                $('#editCompany').openModal();
            }

            $scope.openDeleteCompanyModel = function (data) {
                $scope.deleteCompany = data;
                $scope.companyName = data.name;
                $('#deleteCompany').openModal();
            }

            $scope.confirmDeleteCompany = function () {
                var data = $scope.deleteCompany;
                Api.deleteCompany(data.id).then(function () {
                    Gst.showSuccessToast('Success', 'Company deleted');
                    LoadCompanies();
                    $scope.closeCancelDeleteModel();
                }, function () {
                    Gst.showErrorToast('Error', 'Try again');
                })
            }

            $scope.closeAddCompanyModel = function () {
                $('#addCompany').closeModal();
            }

            $scope.openAddCompanyModel = function () {
                $scope.companyName = "";
                $('#addCompany').openModal();
            }

            $scope.closeCancelDeleteModel = function () {
                $('#deleteCompany').closeModal();
            }

            $scope.closeEditModel = function () {
                $('#editCompany').closeModal();
            }
        }
    ]);