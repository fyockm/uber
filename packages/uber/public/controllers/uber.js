'use strict';

angular.module('mean').controller('UberController', ['$scope', 'Global',
    function($scope, Global, Uber) {
        $scope.global = Global;
        $scope.package = {
            name: 'uber'
        };
    }
]);
