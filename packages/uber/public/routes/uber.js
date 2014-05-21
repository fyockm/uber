'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all uber', {
                url: '/uber',
                templateUrl: 'uber/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create favorite', {
                url: '/uber/create',
                templateUrl: 'uber/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit favorite', {
                url: '/uber/:favoriteId/edit',
                templateUrl: 'uber/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('favorite by id', {
                url: '/uber/:favoriteId',
                templateUrl: 'uber/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
