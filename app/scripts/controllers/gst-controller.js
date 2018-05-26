'use strict';
/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */

var module = angular.module('sbAdminApp'); //, ['ui.compat']

controller.$inject = ['$scope', 'Gst', '$q', '$timeout', '$cookieStore', 'toaster'];

function controller($scope, Gst, $q, $timeout, $cookieStore, toaster) {

    try {
        var loggedUser = $cookieStore.get('loggedUser');

        if (typeof (loggedUser) === "undefined") {
            $('#login').openModal();
        } else {
            Gst.getLoggedInUser().then(function () {
                //$state.go('dashboard.home')
            }, function () {
                $('#login').openModal();
            });
        }

    } catch (error) {
        //  $cookieStore.remove('loggedUser');
        $('#login').openModal();
    }


    $scope.predicates = ['periodTime', 'gstTypeId', 'gstStatus', 'receiptDate', 'fillingDate', 'remark'];
    $scope.selectedPredicate = $scope.predicates[0];
    $scope.dirty = {};

    $scope.saveNAddClientGST = function () {

    };

    $scope.editClient = function () {

    };

    $scope.editGST = function () {

    }

    $scope.saveRemarks = function () {
        if (!$scope.client) {
            Gst.showErrorToast('Error', 'No Client selected');
            return;
        }
        if ($scope.client && $scope.client.remark) {
            Gst.updateClientRemarks({
                'remark': $scope.client.remark,
                'id': $scope.client.id
            }).then(function () {
                Gst.showSuccessToast('Success', 'Remarks added');
            }, function () {
                Gst.showErrorToast('Error', 'Try Again');
            });
        } else {
            Gst.showErrorToast('Error', 'No Remarks added');
        }
    }

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
            text: 'Search by Trade Name',
            value: 'tname'
        },
        {
            text: 'Search by Legal Name',
            value: 'lnname'
        },
        {
            text: 'Search by Code No.',
            value: 'codeno'
        },
        {
            text: 'Search by GSTIN',
            value: 'gstid'
        },
        {
            text: 'Search by User Id',
            value: 'userid'
        }
    ];

    $scope.changeSearchType = function () {
        $timeout(function () {
            var searchType = $scope.key.value;
            $scope.searchApi = Gst.getSearchUrl(searchType);
            //tname 
            if (searchType == "tname") {
                $scope.firField = "tradename";
                $scope.secField = "gstin";
            } else if (searchType == "userid") {
                $scope.firField = "userid";
                $scope.secField = "legalname";
            } else if (searchType == "lnname") {
                $scope.firField = "legalname";
                $scope.secField = "userid";
            } else if (searchType == "codeno") {
                $scope.firField = "codeno";
                $scope.secField = "legalname";
            } else {
                $scope.firField = "gstin";
                $scope.secField = "legalname";
            }
        }, 100);
    }

    $scope.key = {
        text: 'Search by',
        value: ''
    };


    function SetDefaults() {

        $scope.fillingDate = "";
        $scope.receiptDate = "";
        $scope.gstdealerKey = {
            text: 'Select GST Type',
            value: ''
        }

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

        $scope.gstpendingKey = {
            text: 'Select Pending Status',
            value: ''
        }

        $scope.showPendingDropdown = false;
    }
    SetDefaults();
    $scope.showMonths = true;

    function ResetFields() {
        $scope.codeno = "";
        $scope.tradename = "";
        $scope.legalname = "";
        $scope.address = "";
        $scope.gstin = "";
        $scope.regdate = "";
        $scope.dealertype = "";
        $scope.userid = "";
        $scope.password = "";
        $scope.mobile = "";
        $scope.emailid = "";
        $scope.ewayuserid = "";
        $scope.ewaypassword = "";
        $scope.cancellationdate = "";
        $scope.ewaybillid = "";
    }

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
            "codeno": $scope.codeno,
            "tradename": $scope.tradename,
            "legalname": $scope.legalname,
            "address": $scope.address,
            "gstin": $scope.gstin,
            "regdate": $scope.regdate,
            "dealertype": $scope.gstdealerKey.id,
            "userid": $scope.userid,
            "password": $scope.password,
            "mobile": $scope.mobile,
            "emailid": $scope.emailid,
            "ewayuserid": $scope.ewaybillid,
            "ewaypassword": $scope.ewaypassword,
            "cancellationdate": $scope.cancellationdate

        }).then(function () {
            Gst.showSuccessToast('Success', 'Client added');
            ResetFields();
        }, function () {
            Gst.showErrorToast('Error', 'Try adding client again');
        });

        SetDefaults();
    }
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.open2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened2 = true;
    };


    $scope.fillingOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.filling = true;
    };

    $scope.receiptOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.receipt = true;
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

    $scope.ShowGSTPeriod = function (data) {
        setTimeout(function () {;
        }, 100)
    }

    $scope.gstStatusSelected = function () {
        $timeout(function () {
            if ($scope.gststatuskey && $scope.gststatuskey.id == 3) {
                $scope.showPendingDropdown = true;
            } else {
                $scope.showPendingDropdown = false;
            }
        }, 100);
    }

    $scope.addClientGST = function () {
        var period;
        if ($scope.showMonths) {
            period = $scope.monthkey.id;
        } else {
            period = $scope.quaterKey.id;
        }
        var gstObj = {
            clientInfoId: $scope.client.id,
            year: $scope.yearkey.id,
            period: period,
            gstFormType: $scope.gsttypekey.id,
            gstpendingstatus: $scope.gstpendingKey.id,
            receiptDate: $scope.receiptDate,
            fillingDate: $scope.fillingDate,
            remark: $scope.remark,
            gststatus: $scope.gststatuskey.id
        }
        Gst.addGst(gstObj).then(function () {
            SetDefaults();
            $scope.remark = "";
            Gst.showSuccessToast('Success', 'GST record added');
        }, function () {
            Gst.showErrorToast('Error', 'Adding GST record');
        });
    }

    $scope.getGstPeriod = function (data, typeId) {
        if (typeId == 1) {
            for (let i = 0; i < $scope.monthResult.length; i++) {
                if (data && $scope.monthResult[i].id == data) {
                    return $scope.monthResult[i];
                }
            }
        } else {
            for (let i = 0; i < $scope.quaterResult.length; i++) {
                if (data && $scope.quaterResult[i].id == data) {
                    return $scope.quaterResult[i];
                }
            }
        }
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

    $scope.getGstType = function (data) {
        for (let i = 0; i < $scope.gsttyperesult.length; i++) {
            if (data && $scope.gsttyperesult[i].id == data) {
                return $scope.gsttyperesult[i];
            }
        }
    }

    $scope.getGstFormType = function (data) {
        for (let i = 0; i < $scope.gstformresult.length; i++) {
            if (data && $scope.gstformresult[i].id == data) {
                return $scope.gstformresult[i];
            }
        }
    }

    $scope.gstStatusTypesResult = [];
    $scope.yearsResult = [];
    $scope.monthResult = [];
    $scope.gsttyperesult = [];
    $scope.gstpendingstatusresult = [];
    $scope.gstformresult = [];
    $scope.quaterResult = [];
    $scope.rowCollection = [];

    $scope.getClientGstData = function () {
        Gst.getClientGstData().then(function (result) {
            console.log(result);
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

    $scope.getClientGstData();

    function processTable(data) {
        $scope.rowCollection = [];
        for (let i = 0; i < data.length; i++) {
            var period = $scope.getGstPeriod(data[i].period, $scope.client.dealertype).text;
            var gsttypeid = $scope.getGstFormType(data[i].gstFormType) ? $scope.getGstFormType(data[i].gstFormType).text : '';
            var gstPendingStatus = $scope.getPendingGstStatus(data[i].gstpendingstatus) ? $scope.getPendingGstStatus(data[i].gstpendingstatus).text : '';
            var gstStatus = $scope.getGstStatus(data[i].gststatus) ? $scope.getGstStatus(data[i].gststatus).text : '';
            $scope.rowCollection.push({
                periodTime: period,
                gstFormType: gsttypeid,
                gstPendingStatus: gstPendingStatus,
                gstStatus:gstStatus,
                receiptDate: data[i].receiptDate,
                fillingDate: data[i].fillingDate,
                remark: data[i].remark,
                id: data[i].id
            });
        }
    }

    function LoadGstData() {
        $scope.GstData = [];
        setTimeout(function () {
            console.log($scope.yearkey.id);

            if ($scope.client.id == "0" || $scope.client.id) {
                Gst.gstInfo($scope.client.id).then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].year == $scope.yearkey.id) {
                            $scope.GstData.push(data[i]);
                            console.log($scope.GstData);
                            processTable($scope.GstData);
                        }
                    }
                    console.log(data);
                }, function () {
                    Gst.showSuccessToast('Error', 'Unable to load GST');
                });
            }
        }, 100)
    }

    $scope.loadGstFYChanged = function () {
        $scope.rowCollection = [];
        LoadGstData();
    }

    $scope.deleteClient = function () {
        if ($scope.isDeleteConfirmed) {
            if ($scope.client.clientid == "0" || $scope.client.clientid) {
                Gst.deleteClient($scope.client.clientid).then(function () {
                    console.log('done')
                })
            }
        }
    }

    $scope.selectedClient = function (data) {
        $scope.client = data.originalObject;
        console.log(data);
        if ($scope.client.dealertype == 1) {
            $scope.showMonths = true;
        } else {
            $scope.showMonths = false;
        }
    }

    function getSelectedGst(id) {
        for (let i = 0; i < $scope.GstData.length; i++) {
            const element = $scope.GstData[i];
            if (element.id == id) {
                return element;
            }
        }
    }

    $scope.editGstInfo = function (id) {
        $scope.selectedGst = getSelectedGst(id);
        if ($scope.client.dealertype == 1) {
            $scope.selectedGst.showMonths = true;
            var monthkeyData = $scope.getGstPeriod($scope.selectedGst.period, $scope.client.dealertype);
            $scope.selectedGst.monthkey = monthkeyData;

        } else {
            $scope.selectedGst.showMonths = false;
            var quaterkeyData = $scope.getGstPeriod($scope.selectedGst.period, $scope.client.dealertype);
            $scope.selectedGst.quaterKey = quaterkeyData;
        }

        var gstformTypeData = $scope.getGstFormType($scope.selectedGst.gstFormType);
        var gststatuskeyData = $scope.getPendingGstStatus($scope.selectedGst.gststatus);
        $scope.selectedGst.gsttypekey = gstformTypeData;
        $scope.selectedGst.gststatuskey = gststatuskeyData;
        $('#viewGst').openModal();
    }

    $scope.deleteGstInfo = function (id) {
        $('#deleteGst').openModal();
        $scope.selectedGst = getSelectedGst(id);
        $scope.periodTime = getSelectedGst(id).periodTime;
    }

    $scope.confirmDeleteGst = function (id) {
        Gst.deleteGst($scope.selectedGst.id).then(function (data) {
            console.log(data);
            Gst.showSuccessToast('Success', 'GST record deleted');
            $scope.rowCollection = [];
            LoadGstData();
            $('#deleteGst').closeModal();
        }, function () {
            Gst.showErrorToast('Error', 'Error deleting GST record');
        });
    }

    $scope.closeDeleteModel = function () {
        $('#deleteGst').closeModal();
    }

    $scope.cancelUpdateGSTRecord = function () {
        $('#viewGst').closeModal();
    }

    $scope.updateGSTRecord = function () {
        var period;
        if ($scope.client.dealertype == 1) {
            period = $scope.selectedGst.monthkey.id;
        } else {
            period = $scope.selectedGst.quaterKey.id;
        }
        var gstObj = {
            id: $scope.selectedGst.id,
            clientInfoId: $scope.client.id,
            year: $scope.selectedGst.year,
            period: period,
            gstFormType: $scope.selectedGst.gsttypekey.id,
            gststatus: $scope.selectedGst.gststatuskey.id,
            receiptDate: $scope.selectedGst.receiptDate,
            fillingDate: $scope.selectedGst.fillingDate,
            remark: $scope.selectedGst.remark
        }
        Gst.updateGSTRecord(gstObj).then(function () {
            $scope.rowCollection = [];
            Gst.showSuccessToast('Success', 'Gst record updated');
            LoadGstData();
            $('#viewGst').closeModal();
        }, function () {
            Gst.showErrorToast('Error', 'Unable to update GsT record');
        })
    }
};

module.controller('GstCtrl', controller);