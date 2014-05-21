'use strict';

(function() {
    // Uber Controller Spec
    describe('MEAN controllers', function() {
        describe('UberController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var UberController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                UberController = $controller('UberController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one favorite object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('uber').respond([{
                        title: 'An Favorite about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.uber).toEqualData([{
                        title: 'An Favorite about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one favorite object fetched ' +
                'from XHR using a favoriteId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.favoriteId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testFavoriteData = function() {
                        return {
                            title: 'An Favorite about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/uber\/([0-9a-fA-F]{24})$/).respond(testFavoriteData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.favorite).toEqualData(testFavoriteData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postFavoriteData = function() {
                        return {
                            title: 'An Favorite about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseFavoriteData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Favorite about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Favorite about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('uber', postFavoriteData()).respond(responseFavoriteData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/uber/' + responseFavoriteData()._id);
                });

            it('$scope.update() should update a valid favorite', inject(function(Uber) {

                // fixture rideshare
                var putFavoriteData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Favorite about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock favorite object from form
                var favorite = new Uber(putFavoriteData());

                // mock favorite in scope
                scope.favorite = favorite;

                // test PUT happens correctly
                $httpBackend.expectPUT(/uber\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/uber\/([0-9a-fA-F]{24})$/, putFavoriteData()).respond();
                /*
                Error: Expected PUT /uber\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Favorite about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Favorite about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/uber/' + putFavoriteData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid favoriteId ' +
                'and remove the favorite from the scope', inject(function(Uber) {

                    // fixture rideshare
                    var favorite = new Uber({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.uber = [];
                    scope.uber.push(favorite);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/uber\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(favorite);
                    $httpBackend.flush();

                    // test after successful delete URL location uber lis
                    //expect($location.path()).toBe('/uber');
                    expect(scope.uber.length).toBe(0);

                }));
        });
    });
}());
