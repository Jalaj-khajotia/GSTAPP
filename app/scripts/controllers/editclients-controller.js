'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('sbAdminApp')
    .controller('EditClientsCtrl', ['$scope', '$position', '$http', '$timeout', '$cookieStore',
        '$location', 'Gst', '$state', 'localStorageService',
        function ($scope, $position, $http, $timeout, $cookieStore, $location, Gst, $state, localStorageService) {
            $scope.rowCollection = [];
            $scope.clients = [];
            localStorageService.set('ab121', 'hello');
            $scope.gsttyperesult = [];

            Gst.getClientGstData().then(function (result) {
                console.log(result);
                $scope.gstType = result.gstType;
                for (var i = 0; i < Object.values(result.gstType).length; i++) {
                    $scope.gsttyperesult.push({
                        text: Object.values(result.gstType)[i],
                        value: Object.values(result.gstType)[i],
                        id: Object.keys(result.gstType)[i]
                    });
                }
            });

            function LoadSelectedClient(id) {
                for (let i = 0; i < $scope.clients.length; i++) {
                    const element = $scope.clients[i];
                    if (element.id == id) {
                        $scope.selectedClient = element;
                        return;
                    }
                }
            }
            console.log(localStorageService.get('ab121'));

            function LoadClientsData() {
                Gst.getAllClients().then(function (data) {
                    $scope.rowCollection = [];
                    $scope.clients = data.clients;
                    var clients = data.clients;
                    for (let i = 0; i < clients.length; i++) {
                        $scope.rowCollection.push({
                            tradename: clients[i].tradename,
                            gstin: clients[i].gstin,
                            regdate: clients[i].regdate,
                            userid: clients[i].userid,
                            id: clients[i].id,
                            dealertype: clients[i].dealertype
                        });
                    }
                }, function () {
                    Gst.showErrorToast('Error', 'Unable to load clients');
                });
            }
            LoadClientsData();

            $scope.deleteClient = function (id) {
                $('#deleteclient').openModal();
                LoadSelectedClient(id);
                $scope.clientName = $scope.selectedClient.tradename;
            }

            $scope.closeDeleteModel = function () {
                $('#deleteclient').closeModal();
            }

            $scope.closeUpdateModel = function () {
                $('#editclient').closeModal();
            }

            $scope.getGstType = function (data) {
                for (let i = 0; i < $scope.gsttyperesult.length; i++) {
                    if ($scope.gsttyperesult[i].id == data) {
                        return $scope.gsttyperesult[i];
                    }
                }
            }

            $scope.regDate = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.reg = true;
            };

            $scope.cancelDate = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.cancel = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.toggleMin = function () {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
            $scope.format = 'shortDate';

            $scope.editClient = function (id) {
                $('#editclient').openModal();
                LoadSelectedClient(id);
                $scope.selectedClient.gstdealerKey = $scope.getGstType($scope.selectedClient.dealertype);
                $scope.editdata = "You are editing this client";
            }

            $scope.updateClient = function () {
                $scope.selectedClient.dealertype = $scope.selectedClient.gstdealerKey.id;
                Gst.updateClient($scope.selectedClient).then(function (data) {
                    console.log(data);
                    Gst.showSuccessToast('Success', 'Client updated');
                    $('#editclient').closeModal();
                    LoadClientsData();
                }, function () {
                    Gst.showErrorToast('Error', 'Unable to update client');
                });
            }

            $scope.confirmDeleteClient = function () {
                var clientid = $scope.selectedClient.id;
                Gst.deleteClient(clientid).then(function (data) {
                    console.log(data);
                    Gst.showSuccessToast('Success', 'Client deleted');
                    LoadClientsData();
                    $('#deleteclient').closeModal();
                }, function () {
                    Gst.showErrorToast('Error', 'Unable to delete client');
                });
            }
        }
    ]);