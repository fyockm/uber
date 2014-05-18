'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('uber example page', {
            url: '/uber/example',
            templateUrl: 'uber/views/index.html'
        });
    }
]);
