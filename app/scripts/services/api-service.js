/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */
'use strict';

var module = angular.module('sbAdminApp');


function service($http, $q, $cookieStore, localStorageService, toaster) {
    var cookie = $cookieStore.get('loggedUser');
    $http.defaults.headers.common['Authorization'] = cookie.token;

    this.getCompanies = function () {
      var deferred = $q.defer();
      $http.get(api + "companies")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject(data);
        });
      return deferred.promise;
    }

    this.updateCompany = function (payload) {
      var deferred = $q.defer();
      $http.put(api + 'company', payload).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.deleteCompany = function (id) {
      var deferred = $q.defer();
      $http.delete(api + 'company/' + id).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.createCompany = function (payload) {
      var deferred = $q.defer();
      $http.post(api + 'company', payload).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }


    this.getUsers = function () {
      var deferred = $q.defer();
      $http.get(api + "users")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject(data);
        });
      return deferred.promise;
    }

    this.updateUser = function (payload) {
      var deferred = $q.defer();
      $http.put(api + 'user', payload).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.deleteUser = function (id) {
      var deferred = $q.defer();
      $http.delete(api + '/user/' + id).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.createUser = function (payload) {
      var deferred = $q.defer();
      $http.post(api + 'users', payload).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

};
module.service('Api', ['$http', '$q', '$cookieStore', 'localStorageService', 'toaster', service]);