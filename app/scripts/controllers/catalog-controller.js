'use strict';
/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */

var module = angular.module('sbAdminApp');

controller.$inject = ['$scope', 'Library'];
function controller($scope, Library) {
    $scope.dirty = {};

    var states = ['Alabama', 'Alaska', 'California', /* ... */];

    function suggest_state(term) {
        var q = term.toLowerCase().trim();
        var results = [];

        // Find first 10 states that start with `term`.
        for (var i = 0; i < states.length && results.length < 10; i++) {
            var state = states[i];
            if (state.toLowerCase().indexOf(q) === 0)
                results.push({ label: state, value: state });
        }
        //  console.log(results);

        return results;
    }
    function on_select(selected_item) {
        console.log(selected_item);
    }

    function callme() {
        console.log($scope.dirty);
    }

    $scope.autocomplete_options = {
        suggest: suggest_state,
       
        on_select: on_select
    };

    $scope.catalogBooks = [{
        name: 'testname',
        id: 1
    },
    {
        name: 'testname',
        id: 1
    }, {
        name: 'testname',
        id: 1
    }];
    $scope.images = [];
    $scope.images.push('images/categories/fic.jpg');
    $scope.images.push('images/categories/sci-fi.jpg');
    $scope.images.push('images/categories/auto.jpg');
    // Library.checkForLogin();

};

module.controller('CatalogCtrl', controller);