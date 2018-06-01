'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var local = 'http://localhost:80/v1/';
var server = 'http://ec2-52-90-92-197.compute-1.amazonaws.com:3000/v1/';
var api = local;
angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngCookies',
        'ngStorage',
        'MassAutoComplete',
        'ngSanitize',
        'ngDropdowns',
        'angucomplete-ie8',
        'smart-table',
        'LocalStorageModule',
        'toaster',
        'ngAnimate'
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
            });

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/main.html',
                    controller: 'DashboardCtrl',
                    resolve: {
                        loadMyDirectives: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: 'sbAdminApp',
                                    files: [
                                        'scripts/controllers/dash-controller.js'
                                    ]
                                }),
                                $ocLazyLoad.load({
                                    name: 'toggle-switch',
                                    files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                        "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                    ]
                                }),
                                $ocLazyLoad.load({
                                    name: 'ngCookies',
                                    files: ['bower_components/angular-cookies/angular-cookies.js']
                                })
                            $ocLazyLoad.load({
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            })
                            $ocLazyLoad.load({
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                            $ocLazyLoad.load({
                                name: 'ngTouch',
                                files: ['bower_components/angular-touch/angular-touch.js']
                            })
                        }
                    }
                })
                .state('dashboard.home', {
                    url: '/home',
                    controller: 'HomeCtrl',
                    templateUrl: 'views/dashboard/home.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [

                                    'styles/dashboard.css',
                                    'scripts/controllers/home-controller.js',
                                    'scripts/directives/notifications/notifications.js',
                                    'scripts/directives/chat/chat.js',
                                    'scripts/directives/dashboard/stats/stats.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.gstreport', {
                    url: '/gstreport',
                    controller: 'GSTReportCtrl',
                    templateUrl: 'views/pages/gstreport.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gstreport-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.client', {
                    url: '/addclient',
                    controller: 'GstCtrl',
                    templateUrl: 'views/pages/add-client.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gst-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.editClients', {
                    url: '/editclients',
                    controller: 'EditClientsCtrl',
                    templateUrl: 'views/pages/edit-clients.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/editclients-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.editGST', {
                    url: '/editclientgst',
                    controller: 'GstCtrl',
                    templateUrl: 'views/pages/edit-clientgst.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gst-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.viewClient', {
                    url: '/viewclient',
                    controller: 'GstCtrl',
                    templateUrl: 'views/pages/view-client.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gst-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.gst', {
                    url: '/gst',
                    controller: 'GstCtrl',
                    templateUrl: 'views/pages/view-gst.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gst-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.addGst', {
                    url: '/addgst',
                    controller: 'GstCtrl',
                    templateUrl: 'views/pages/add-gst.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gst-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.deleteClient', {
                    url: '/deleteclient',
                    controller: 'GstCtrl',
                    templateUrl: 'views/pages/delete-client.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/gst-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.manageCompany', {
                    url: '/company',
                    controller: 'CompanyCtrl',
                    templateUrl: 'views/pages/company.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/company-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.manageUser', {
                    url: '/users',
                    controller: 'UserCtrl',
                    templateUrl: 'views/pages/user.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/user-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.catalog', {
                    url: '/catalog',
                    controller: 'CatalogCtrl',
                    templateUrl: 'views/pages/browse-books.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/catalog-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.returns', {
                    url: '/returns',
                    controller: 'ReturnCtrl',
                    templateUrl: 'views/pages/returns-books.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/return-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.browseCatalog', {
                    url: '/catalog/:type/:id',
                    controller: 'BookCtrl',
                    templateUrl: 'views/pages/books.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'styles/dashboard.css',
                                    'scripts/controllers/books-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.cart', {
                    url: '/cart',
                    controller: 'CartCtrl',
                    templateUrl: 'views/pages/cart.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'styles/dashboard.css',
                                    'scripts/controllers/cart-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.issue', {
                    url: '/issue-history',
                    controller: 'IssueCtrl',
                    templateUrl: 'views/pages/issue-history.html',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'styles/dashboard.css',
                                    'scripts/controllers/issue-controller.js'
                                ]
                            })
                        }
                    }
                })
                .state('login', {
                    templateUrl: 'views/pages/login.html',
                    url: '/login',
                    controller: 'LoginCtrl',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/login-controller.js']
                            })
                        }
                    }
                })
                .state('dashboard.profile', {
                    templateUrl: 'views/pages/profile.html',
                    url: '/profile',
                    controller: 'ProfileCtrl',
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/profile-controller.js',
                                    'styles/profile.css'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.notifications', {
                    templateUrl: 'views/ui-elements/notifications.html',
                    url: '/notifications'
                })
        }
    ]);