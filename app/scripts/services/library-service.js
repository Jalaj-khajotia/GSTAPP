/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */
'use strict';

var module = angular.module('sbAdminApp');

function service($http, $q) {
    var libraryBooks;
    var bookCatalog;
    libraryBooks = [], bookCatalog = [];

    this.getCatalog = function () {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/categories")
            .success(function (data) {
                bookCatalog = _.map(data, 'name');
                deferred.resolve(bookCatalog);
            })
            .error(function (data, status, headers, config) {
                console.log(status + " Data: " + data);
            });
        return deferred.promise;
    };

    this.getBooksByName = function (name) {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/categories")
            .success(function (data) {
                bookCatalog = _.find(data, function (o) {
                    return o.name == name;
                });
                deferred.resolve(bookCatalog.Books);
            })
            .error(function (data, status, headers, config) {
                console.log(status + " Data: " + data);
            });
        return deferred.promise;
    };

    this.getAllInfo = function (name) {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/categories")
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                console.log(status + " Data: " + data);
            });
        return deferred.promise;
    };

    this.saveIssuedBooks = function (payload) {
        var deferred = $q.defer();
        $http.post('http://localhost:8000/issuebooks', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    this.generateIssueId = function(userid,issueDate){
        var deferred = $q.defer();
        var payload = {"issue":{"UserId":userid,
        "issueDate": issueDate}};
        $http.post('http://localhost:8000/issue', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.getAllIssueForUser = function(userId){
        var deferred = $q.defer();
        $http.get("http://localhost:8000/issuebyuserid/"+userId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                console.log(status + " Data: " + data);
            });
        return deferred.promise;
    };

    this.getAllBooks = function(){
        var deferred = $q.defer();
        $http.get("http://localhost:8000/books")
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    this.getAllIssuedBooks = function(){
        var deferred = $q.defer();
        $http.get("http://localhost:8000/issues")
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

};
module.service('Library', ['$http', '$q', service]);