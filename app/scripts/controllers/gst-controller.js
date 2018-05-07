'use strict';
/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */

var module = angular.module('sbAdminApp');

controller.$inject = ['$scope', 'Gst', '$q', '$timeout'];

function controller($scope, Gst, $q, $timeout) {
    $scope.dirty = {};

    function suggest_state(term) {
        var results = [];

        // Find first 10 states that start with `term`.
        for (var i = 0; i < term.length; i++) {
            var state = states[i];
            results.push({
                label: term[i].name,
                value: term[i].name,
                id: term[i].id
            });
        }
        return results;
    }

    $scope.keyOptions = [{
            text: 'Search by Name',
            value: 'name'
        },
        {
            text: 'Search by Client Id',
            value: 'clientid'
        },
        {
            // Example of an option with the 'href' property
            text: 'Search by GST Id',
            value: 'gstid'
        }
    ];

    $scope.key = {
        text: 'Search by',
        value: ''
    };

    function SetDefaults() {

        $scope.yearkey = {
            text: 'Select Year',
            value: ''
        };
        $scope.monthkey = {
            text: 'Select Month',
            value: ''
        };
        $scope.gsttypekey = {
            text: 'Select GST Types',
            value: ''
        };

        $scope.gststatuskey = {
            text: 'Select GST Status',
            value: ''
        };

        $scope.quaterKey = {
            text: 'Select Quater',
            value: ''
        }
    }
    SetDefaults();
    $scope.showMonths = true;


    function suggest_state_remote(term) {
        var deferred = $q.defer();
        console.log(term);
        var seachType = $scope.key.value;

        $scope.searchResult = [];
        $scope.entireResult = []
        if (seachType == 'clientid') {
            Gst.searchClientbyClientid(term).then(function (result) {
                var results = result.clients;
                $scope.entireResult = results;
                for (var i = 0; i < results.length; i++) {
                    $scope.searchResult.push({
                        label: results[i].clientid.toString(),
                        value: results[i].clientid.toString(),
                        id: results[i].id
                    });
                }
                deferred.resolve($scope.searchResult);
            });

        } else if (seachType == 'gstid') {
            Gst.searchClientbyGstid(term).then(function (result) {
                var results = result.clients;
                $scope.entireResult = results;
                for (var i = 0; i < results.length; i++) {
                    $scope.searchResult.push({
                        label: results[i].gstid,
                        value: results[i].gstid,
                        id: results[i].id
                    });
                }
                deferred.resolve($scope.searchResult);
            });

        } else {
            Gst.searchClientbyName(term).then(function (result) {
                var results = result.clients;
                $scope.entireResult = results;
                for (var i = 0; i < results.length; i++) {
                    $scope.searchResult.push({
                        label: results[i].name,
                        value: results[i].name,
                        id: results[i].id
                    });
                }
                deferred.resolve($scope.searchResult);
            });
        }
        return deferred.promise;
    }

    function callme() {
        console.log($scope.dirty);
    }

    function on_select(selected_item) {
        var data = $scope.entireResult;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == selected_item.id) {
                $scope.client = data[i];
                console.log(data[i]);
                return;
            }
        }
        // Gst.getClientbyId(selected_item.id).then(function (data) {
        //     console.log(data);
        // })
    }

    $scope.autocomplete_options = {
        suggest: suggest_state_remote,
        on_select: on_select,
        on_error: console.log
    };

    $scope.addClient = function () {
        Gst.addClient({
            "clientid": $scope.clientid,
            "name": $scope.name,
            "password": $scope.password,
            "mobile": $scope.mobile,
            "gstid": $scope.gstid,
            "gstno": $scope.gstno,
            "emailid": $scope.emailid,
            "ewaybillid": $scope.ewaybillid,
            "ewaypassword": $scope.ewaypassword
        });
        $scope.clientid = "";
        $scope.name = "";
        $scope.password = "";
        $scope.mobile = "";
        $scope.gstid = "";
        $scope.gstno = "";
        $scope.emailid = "";
        $scope.ewaybillid = "";
        $scope.ewaypassword = "";
    }


    $scope.getClientGst = function () {
        Gst.viewGst(1).then(function (data) {
            $scope.gst = data;
        })
    }

    $scope.ShowGSTPeriod = function (data) {
        setTimeout(function () {
            if ($scope.gsttypekey.text == "Primary") {
                $scope.showMonths = true;
            } else {
                $scope.showMonths = false;
            }
        }, 100)
    }

    $scope.addClientGST = function () {
        var period;
        if ($scope.showMonths) {
            period = $scope.monthkey.id;
        } else {
            period = $scope.quaterKey.id;
        }
        var gstObj = {
            clientid: $scope.client.clientid,
            year: $scope.yearkey.id,
            period: period,
            gsttypeid: $scope.gsttypekey.id,
            gststatus: $scope.gststatuskey.id,
            remark: $scope.remark
        }
        Gst.addGst(gstObj).then(function () {
            SetDefaults();
            $scope.remark = "";
        });
    }

    $scope.loadGstFYChanged = function () {
        $scope.GstData = [];
        setTimeout(function () {
            console.log($scope.yearkey.id);

            if ($scope.client.clientid == "0" || $scope.client.clientid) {
                Gst.gstInfo($scope.client.clientid).then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].year == $scope.yearkey.id) {
                            $scope.GstData.push(data[i]);
                            console.log($scope.GstData);
                        }
                    }
                    console.log(data);
                });
            }
        }, 100)
    }


    $scope.getGstPeriod = function (data, typeId) {
        if (typeId == "2") {
            for (let i = 0; i < $scope.monthResult.length; i++) {
                if ($scope.monthResult[i].id == data) {
                    return $scope.monthResult[i].text;
                }
            }
        } else {
            for (let i = 0; i < $scope.quaterResult.length; i++) {
                if ($scope.quaterResult[i].id == data) {
                    return $scope.quaterResult[i].text;
                }
            }
        }
    }

    $scope.getGstStatus = function (data) {
        for (let i = 0; i < $scope.gststatusresult.length; i++) {
            if ($scope.gststatusresult[i].id == data) {
                return $scope.gststatusresult[i].text;
            }
        }
    }

    $scope.getGstType = function (data) {
        for (let i = 0; i < $scope.gsttyperesult.length; i++) {
            if ($scope.gsttyperesult[i].id == data) {
                return $scope.gsttyperesult[i].text;
            }
        }
    }

    $scope.getClientGstData = function () {
        Gst.getClientGstData().then(function (result) {
            console.log(result);
            $scope.years = result.years;
            $scope.months = result.months;
            $scope.gstType = result.gstType;
            $scope.quarters = result.quarters;
            $scope.yearsResult = [];
            $scope.monthResult = [];
            $scope.gsttyperesult = [];
            $scope.gststatusresult = [];
            $scope.quaterResult = [];

            for (var i = 0; i < Object.values(result.years).length; i++) {
                $scope.yearsResult.push({
                    text: Object.values(result.years)[i],
                    value: Object.values(result.years)[i],
                    id: Object.keys(result.years)[i]
                });
            }

            for (var i = 0; i < Object.values(result.months).length; i++) {
                $scope.monthResult.push({
                    text: Object.values(result.months)[i],
                    value: Object.values(result.months)[i],
                    id: Object.keys(result.months)[i]
                });
            }

            for (var i = 0; i < Object.values(result.gstType).length; i++) {
                $scope.gsttyperesult.push({
                    text: Object.values(result.gstType)[i],
                    value: Object.values(result.gstType)[i],
                    id: Object.keys(result.gstType)[i]
                });
            }

            for (var i = 0; i < Object.values(result.gstStatus).length; i++) {
                $scope.gststatusresult.push({
                    text: Object.values(result.gstStatus)[i],
                    value: Object.values(result.gstStatus)[i],
                    id: Object.keys(result.gstStatus)[i]
                });
            }

            for (var i = 0; i < Object.values(result.quarters).length; i++) {
                $scope.quaterResult.push({
                    text: Object.values(result.quarters)[i],
                    value: Object.values(result.quarters)[i],
                    id: Object.keys(result.quarters)[i]
                });
            }

        })
    }
    $scope.getClientGstData();


    $scope.deleteClient = function () {
        if ($scope.isDeleteConfirmed) {
            if ($scope.client.clientid == "0" || $scope.client.clientid) {
                Gst.deleteClient($scope.client.clientid).then(function () {
                    console.log('done')
                })
            }
        }
    }


};

module.controller('GstCtrl', controller);