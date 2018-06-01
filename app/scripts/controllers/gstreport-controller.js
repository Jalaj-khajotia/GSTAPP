'use strict';
/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */

var module = angular.module('sbAdminApp'); //, ['ui.compat']

controller.$inject = ['$scope', 'Gst', '$q', '$timeout', '$cookieStore', 'toaster'];

function controller($scope, Gst, $q, $timeout, $cookieStore, toaster) {

    $scope.gstStatusTypesResult = [];
    $scope.yearsResult = [];
    $scope.monthResult = [];
    $scope.gsttyperesult = [];
    $scope.gstpendingstatusresult = [];
    $scope.gstformresult = [];
    $scope.quaterResult = [];
    $scope.gstReport = [];
    $scope.showMonths = true;
    $scope.dealerType = 'month';

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
        text: 'Select Quarter',
        value: ''
    }

    $scope.selectDealerType = function (value) {
        $scope.monthkey = {
            text: 'Select Month',
            value: ''
        };

        $scope.quaterKey = {
            text: 'Select Quarter',
            value: ''
        }

        $scope.period = '';

        if (value == 'month') {
            $scope.showMonths = true;

        } else {
            $scope.showMonths = false;
        }
    }

    $scope.gstReport = [];

    $scope.setPeriod = function (period) {
        $scope.period = period;
    }

    $scope.getGSTReport = function () {

        if (!$scope.yearkey || !$scope.yearkey.id) {
            Gst.showErrorToast('Error', 'Year not selected');
            return;
        }

        if (!$scope.gsttypekey || !$scope.gsttypekey.id) {
            Gst.showErrorToast('Error', 'GST Type not selected');
            return;
        }

        if ($scope.showMonths && (!$scope.period)) {
            Gst.showErrorToast('Error', 'Month not selected');
            return;
        }

        if (!$scope.showMonths && (!$scope.period)) {
            Gst.showErrorToast('Error', 'Quarter not selected');
            return;
        }

        var obj = {
            "year": $scope.yearkey.id,
            "gstformtype": $scope.gsttypekey.id,
            "period": $scope.period.id
        }
        Gst.getGSTReport(obj).then(function (data) {
            $scope.gstReport = [];
            var report = Object.keys(data.report[0]);
            for (let i = 0; i < report.length; i++) {
                const element = Object.values(data.report[0])[i];
                if ($scope.showMonths && element.dealertype == 1) {
                    $scope.gstReport.push({
                        "tradename": element.tradename,
                        "codeno": element.codeno,
                        "gstin": element.gstin,
                        "dealertype": element.dealertype,
                        "gststatus": element.gststatus,
                        "gstpendingstatus": element.gstpendingstatus,
                        "receiptDate": element.receiptDate,
                        "fillingDate": element.fillingDate,
                        "remark": element.remark
                    });
                } else if (!$scope.showMonths && element.dealertype == 2) {
                    $scope.gstReport.push({
                        "tradename": element.tradename,
                        "codeno": element.codeno,
                        "gstin": element.gstin,
                        "dealertype": element.dealertype,
                        "gststatus": element.gststatus,
                        "gstpendingstatus": element.gstpendingstatus,
                        "receiptDate": element.receiptDate,
                        "fillingDate": element.fillingDate,
                        "remark": element.remark
                    });
                }
            }
            if ( $scope.gstReport.length == 0) {
                Gst.showSuccessToast('Success', 'No Reports found');
            }
        }, function () {
            Gst.showErrorToast('Error', 'Error while loading Report');
        })
    }

    $scope.getGstStatus = function (data) {
        for (let i = 0; i < $scope.gstStatusTypesResult.length; i++) {
            if (data && $scope.gstStatusTypesResult[i].id == data) {
                return $scope.gstStatusTypesResult[i];
            }
        }
    }

    $scope.getPendingGstStatus = function (data) {
        for (let i = 0; i < $scope.gstpendingstatusresult.length; i++) {
            if (data && $scope.gstpendingstatusresult[i].id == data) {
                return $scope.gstpendingstatusresult[i];
            }
        }
    }

    var getClientGstData = function () {
        Gst.getClientGstData().then(function (result) {
            $scope.years = result.years;
            $scope.months = result.months;
            $scope.gstType = result.gstType;
            $scope.quarters = result.quarters;
            $scope.gstStatusTypes = result.gstStatusTypes;

            for (var i = 0; i < Object.values(result.gstStatusTypes).length; i++) {
                $scope.gstStatusTypesResult.push({
                    text: Object.values(result.gstStatusTypes)[i],
                    value: Object.values(result.gstStatusTypes)[i],
                    id: Object.keys(result.gstStatusTypes)[i]
                });
            }

            for (var i = 0; i < Object.values(result.formType).length; i++) {
                $scope.gstformresult.push({
                    text: Object.values(result.formType)[i],
                    value: Object.values(result.formType)[i],
                    id: Object.keys(result.formType)[i]
                });
            }

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
                $scope.gstpendingstatusresult.push({
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
        });
    }
    getClientGstData();
};

module.controller('GSTReportCtrl', controller);