'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('sbAdminApp')
    .controller('EditClientsCtrl', ['$scope', '$position', '$http', '$timeout', '$cookieStore', '$location', 'Gst', '$state',
        function ($scope, $position, $http, $timeout, $cookieStore, $location, Gst, $state) {
            $scope.rowCollection = [];
            $scope.clients = [];

            function LoadSelectedClient(id) {
                for (let i = 0; i < $scope.clients.length; i++) {
                    const element = $scope.clients[i];
                    if (element.id == id) {
                        $scope.selectedClient = element;
                        return;
                    }
                }
            }

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
                            id: clients[i].id
                        });
                    }
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

            $scope.getGstType = function (data) {
                for (let i = 0; i < $scope.gsttyperesult.length; i++) {
                    if ($scope.gsttyperesult[i].id == data) {
                        return $scope.gsttyperesult[i].text;
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
                $scope.editdata = "You are editing this client";
            }

            $scope.updateClient = function () {
                Gst.updateClient($scope.selectedClient).then(function (data) {
                    console.log(data);
                    $('#editclient').closeModal();
                    LoadClientsData();
                });
            }
            $scope.confirmDeleteClient = function () {
                var clientid = $scope.selectedClient.id;
                Gst.deleteClient(clientid).then(function (data) {
                    console.log(data);
                    LoadClientsData();
                    $('#deleteclient').closeModal();
                });
            }
        }
    ]);