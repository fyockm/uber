'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('favorites', {
            url: '/uber/favorites',
            templateUrl: 'uber/views/index.html'
        });
    }
]);
