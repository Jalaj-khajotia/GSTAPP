'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngCookies',
        'ngStorage',
        'ngTable'
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

      /*  $urlRouterProvider.otherwise('/login');*/

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
                                'scripts/controllers/dash-controller.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/header/header-notification/header-notification.js',
                                'scripts/directives/sidebar/sidebar.js',
                                'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                            ]
                        }),
                            $ocLazyLoad.load({
                                name: 'toggle-switch',
                                files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                ]
                            }),
                            $ocLazyLoad.load({
                                name: 'ngAnimate',
                                files: ['bower_components/angular-animate/angular-animate.js']
                            })
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
                templateUrl: 'views/dashboard/review-home.html',
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
            .state('dashboard.Customer', {
                url: '/customer',
                controller: 'CustomerCtrl',
                templateUrl: 'views/pages/customer.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'styles/dashboard.css',
                                'scripts/controllers/csearch-controller.js'
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
                                'styles/dashboard.css',
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
                                'styles/dashboard.css',
                                'scripts/controllers/return-controller.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.browseCatalog', {
                url: '/catalog/:type',
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
                            files: ['scripts/controllers/login-controller.js'
                            ]
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
    }]);
