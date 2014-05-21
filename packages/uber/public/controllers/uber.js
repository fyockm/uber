'use strict';

angular.module('mean').controller('UberController', ['$scope', '$stateParams', '$location', 'Global', 'Uber',
    function($scope, $stateParams, $location, Global, Uber) {
        $scope.global = Global;

        $scope.hasAuthorization = function(favorite) {
            if (!favorite || !favorite.user) return false;
            return $scope.global.isAdmin || favorite.user._id === $scope.global.user._id;
        };

        $scope.options = {
            watchEnter: true
        };
        $scope.details = {
            geometry: true
        };

        $scope.create = function() {
            console.log(this.address);
            console.log(this.options);
            console.log(this.details);
            var favorite = new Uber({
                address: this.address,
                name: this.name,
                lat: this.details.geometry.location.k,
                lng: this.details.geometry.location.A
            });
            favorite.$save(function(response) {
                $location.path('uber/' + response._id);
            });

            this.address = '';
            this.name = '';
        };

        $scope.remove = function(favorite) {
            if (favorite) {
                favorite.$remove();

                for (var i in $scope.uber) {
                    if ($scope.uber[i] === favorite) {
                        $scope.uber.splice(i, 1);
                    }
                }
            } else {
                $scope.favorite.$remove(function(response) {
                    $location.path('uber');
                });
            }
        };

        $scope.update = function() {
            var favorite = $scope.favorite;
            if (!favorite.updated) {
                favorite.updated = [];
            }
            favorite.updated.push(new Date().getTime());

            favorite.$update(function() {
                $location.path('uber/' + favorite._id);
            });
        };

        $scope.find = function() {
            Uber.query(function(uber) {
                $scope.uber = uber;
            });
        };

        $scope.findOne = function() {
            Uber.get({
                favoriteId: $stateParams.favoriteId
            }, function(favorite) {
                $scope.favorite = favorite;
                $scope.favorite.center = {
                    latitude: favorite.lat,
                    longitude: favorite.lng
                };
                $scope.favorite.zoom = 8;
            });
        };
    }
]);
