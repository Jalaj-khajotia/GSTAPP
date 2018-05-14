/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */
'use strict';

var module = angular.module('sbAdminApp');


function service($http, $q, $cookieStore) {
    var cookie = $cookieStore.get('loggedUser');
    $http.defaults.headers.common['Authorization'] = cookie.token;
    try {;
    } catch (error) {
        $cookieStore.remove('loggedUser');
    }

    this.signIn = function (dt) {
        var deferred = $q.defer();
        var payload = dt;
        $http.post(api + 'users/login', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.getLoggedInUser = function () {
        //http://localhost:3000/v1/users/data
        var deferred = $q.defer();
        $http.get(api + "users/data")
            .success(function (data) {
                deferred.resolve(data.data);
            })
            .error(function (data) {
                deferred.reject(data);
                $cookieStore.remove('loggedUser');
            });
        return deferred.promise;
    }

    // fetch data for dropdowns
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
        $http.post(api + 'client', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.getAllClients = function () {
        var deferred = $q.defer();
        $http.get(api + "clients")
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.getSearchUrl = function (type) {
        if (type == "tname") {
            return api + "clients/tname/";
        } else if (type == "lnname") {
            return api + "clients/lname/";
        } else if (type == "userid") {
            return api + "clients/userid/";
        } else if (type == "codeno") {
            return api + "clients/codeno/";
        } else {
            return api + "clients/gstid/";
        }
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

    this.gstInfo = function (id) {
        var deferred = $q.defer();
        var payload = {
            id: id
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

    this.updateClient = function (client) {
        var deferred = $q.defer();
        var payload = client;
        $http.put(api + 'clients', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.updateGSTRecord = function (gstrecord) {
        var deferred = $q.defer();
        var payload = gstrecord;
        $http.put(api + 'clientgst', payload).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.deleteClient = function (id) {
        var deferred = $q.defer();

        $http.delete(api + 'client/' + id).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.deleteGst = function (id) {
        var deferred = $q.defer();

        $http.delete(api + 'clientgst/' + id).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
};
module.service('Gst', ['$http', '$q', '$cookieStore', service]);