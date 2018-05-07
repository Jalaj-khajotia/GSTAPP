/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */
'use strict';

var module = angular.module('sbAdminApp');
var api = "http://localhost:3000/v1/";

function service($http, $q, $cookieStore) {

    var libraryBooks = [],
        bookCatalog = [],
        returnBooks = [];
    var cookie = $cookieStore.get('loggedUser');
    $http.defaults.headers.common['Authorization'] = cookie.token;

    this.checkForLogin = function () {
        var loggedUser = $cookieStore.get('loggedUser');

        if (typeof (loggedUser) === "undefined" || loggedUser === '' || !loggedUser) {
            $('#login').openModal();
        }
    }

    this.getClientGstData = function (id) {
        var deferred = $q.defer();
        $http.get(api + "clients/gstdata")
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.addClient = function (client) {
        var deferred = $q.defer();
        var payload = client;
        $http.post(api + 'clients', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.getClientbyId = function (id) {
        var deferred = $q.defer();
        $http.get(api + "client/" + id)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.searchClientbyName = function (name) {
        var deferred = $q.defer();
        $http.get(api + "clients/name/" + name)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.searchClientbyGstid = function (gst) {
        var deferred = $q.defer();
        $http.get(api + "clients/gstid/" + gst)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.searchClientbyClientid = function (clientid) {
        var deferred = $q.defer();
        $http.get(api + "clients/clientid/" + clientid)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.viewGst = function (clientId) {
        var deferred = $q.defer();
        var payload = {
            clientId: clientId
        };
        $http.post(api + 'receivegst', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.gstInfo = function (id) {
        var deferred = $q.defer();
        var payload = {
            clientid: id
        };
        $http.post(api + 'fetchclientgst', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.addGst = function (gstdata) {
        var deferred = $q.defer();
        var payload = gstdata;
        $http.post(api + 'clientgst', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.deleteClient = function (id) {
        var deferred = $q.defer();
        var payload = {
            clientid: id
        };
        $http.delete(api + 'clients/'+id).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.generateIssueId = function (userid, issueDate) {
        var deferred = $q.defer();
        var payload = {
            "issue": {
                "UserId": userid,
                "issueDate": issueDate
            }
        };
        $http.post('http://localhost:8000/issue', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }


    this.getAllBooks = function () {
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



    this.returnIssueBooks = function (payload) {
        var deferred = $q.defer();
        $http.put('http://localhost:8000/issuebooksReturn', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    this.updateUserData = function (data, id) {
        var payload = {
            "user": {}
        };
        if (data.email) {
            payload.user.userEmail = data.email;
        }
        if (data.password) {
            payload.user.userPassword = data.password;
        }
        if (data.department) {
            payload.user.department = data.department;
        }
        if (data.name) {
            payload.user.name = data.name;
        }
        var deferred = $q.defer();
        $http.put('http://localhost:8000/user/' + id, payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }


};
module.service('Gst', ['$http', '$q', '$cookieStore', service]);