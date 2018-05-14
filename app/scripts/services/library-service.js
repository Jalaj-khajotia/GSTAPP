/**
 * Created by Jalaj Khajotia on 6/26/2016.
 */
'use strict';

var module = angular.module('sbAdminApp');

function service($http, $q, $cookieStore) {

    var libraryBooks = [], bookCatalog = [], returnBooks = [];
    var cookie = $cookieStore.get('loggedUser');
   // $http.defaults.headers.common['authorization'] = cookie.token;

    this.getCatalog = function () {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/categories")
            .success(function (data) {
                var bookCatalog = [];
                for (var i = 0; i < data.length; i++) {
                    bookCatalog.push({
                        "name": data[i].name,
                        "id": data[i].id
                    });
                }
                deferred.resolve(bookCatalog);
            })
            .error(function (data, status, headers, config) {
                console.log(status + " Data: " + data);
            });
        return deferred.promise;
    };

    this.checkForLogin = function () {
        var loggedUser = $cookieStore.get('loggedUser');

        if (typeof(loggedUser) === "undefined" || loggedUser === '' || !loggedUser) {
            $('#login').openModal();
        }
    }

    this.getReturnBooks = function () {
        var deferred = $q.defer();
        deferred.resolve(returnBooks);
        return deferred.promise;
    }

    this.setReturnBooks = function (data) {
        returnBooks = data;
    }

    this.updateReturnBooks = function (data) {
        var newReturnBooks = [];

        if (returnBooks.length > 0 && data.length > 0) {
            newReturnBooks = joinarrays(returnBooks, data);
            returnBooks = newReturnBooks;
        }
        else {
            returnBooks = data;
        }
    }

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

    this.getBooksByCategoryId = function (id) {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/booksbycategory/" + id)
            .success(function (data) {
                var books = [], isBookAvailable;

                for (var i = 0; i < data.length; i++) {
                    var count = 0;
                    for (var j = 0; j < data[i].Issue_books.length; j++) {
                        if (data[i].Issue_books[j].pending) {
                            count++;
                        }
                    }
                    if (count < data[i].available) {
                        isBookAvailable = true;
                    } else {
                        isBookAvailable = false;
                    }
                    books.push({
                        "name": data[i].name,
                        "author": data[i].author,
                        "price": data[i].price,
                        "id": data[i].id,
                        "totalIssued": data[i].Issue_books.length,
                        "isBookAvailable": isBookAvailable,
                        "createdAt": data[i].createdAt,
                        "updatedAt": data[i].updatedAt
                    });
                }

                deferred.resolve(books);
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

    this.getAllIssueForUser = function (userId) {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/issuebyuserid/" + userId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                console.log(status + " Data: " + data);
            });
        return deferred.promise;
    };

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

    this.getAllIssuedBooks = function () {
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
    /*

     * */
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

    function joinarrays(dataset1, dataset2) {
        var dataset = [], hash = {};
        for (var i = 0; i < dataset1.length; i++) {
            if (!hash[dataset1[i].BookId]) {
                hash[dataset1[i].BookId] = true;
                dataset.push(dataset1[i]);
            }
        }
        for (var j = 0; j < dataset2.length; j++) {
            if (!hash[dataset2[j].BookId]) {
                hash[dataset2[j].BookId] = true;
                dataset.push(dataset2[j]);
            }
        }
        return dataset;
    }

};
module.service('Library', ['$http', '$q', '$cookieStore', service]);