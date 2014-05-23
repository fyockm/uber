'use strict';

angular.module('mean').controller('UberController', ['$scope', '$stateParams', '$location', 'Global', 'Uber',
    function($scope, $stateParams, $location, Global, Uber) {
        $scope.global = Global;

        $scope.hasAuthorization = function(favorite) {
            if (!favorite || !favorite.user) return false;
            return $scope.global.isAdmin || favorite.user._id === $scope.global.user._id;
        };

        angular.extend($scope, {
            auto: {
                options: {
                    watchEnter: true
                },
                details: {
                    geometry: true
                }
            },
            favorite: {
                center: {},
                markers: {}
            },
            defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.upsert = function() {
            var favorite = {};
            if ($stateParams.favoriteId) {
                favorite = $scope.favorite;
                favorite.updated = favorite.updated || [];
                favorite.updated.push(new Date().getTime());
                favorite.$update(function() {
                    $location.path('uber');
                });
            } else {
                favorite = new Uber({
                    address: this.favorite.address,
                    name: this.favorite.name,
                    lat: this.auto.details.geometry.location ? this.auto.details.geometry.location.k : this.favorite.lat,
                    lng: this.auto.details.geometry.location ? this.auto.details.geometry.location.A : this.favorite.lng
                });
                if (!favorite.lat || !favorite.lng) return;
                favorite.$save(function() {
                    $location.path('uber');
                });
            }
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

        $scope.find = function() {
            Uber.query(function(uber) {
                $scope.uber = uber;

                for (var i in $scope.uber) {
                    if ($scope.uber[i].lat && $scope.uber[i].lng) {
                        $scope.uber[i].center = {
                            lat: $scope.uber[i].lat,
                            lng: $scope.uber[i].lng,
                            zoom: 16
                        };
                        $scope.uber[i].markers = {
                            mainMarker: {
                                lat: $scope.uber[i].lat,
                                lng: $scope.uber[i].lng,
                                focus: true,
                                message: $scope.uber[i].name,
                                draggable: false
                            }
                        };
                    }

                }
            });
        };

        $scope.findOne = function() {
            if ($stateParams.favoriteId) {
                Uber.get({
                    favoriteId: $stateParams.favoriteId
                }, function(favorite) {
                    $scope.favorite = favorite;
                });
            }
        };
    }
]);
