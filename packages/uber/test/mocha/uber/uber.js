'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/uber');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Favorite = mongoose.model('Favorite');

//Globals
var user;
var favorite;

//The tests
describe('<Unit Test>', function() {
    describe('Model Favorite:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                favorite = new Favorite({
                    address: '800 Market Street, San Francisco, CA 94114',
                    name: 'Uber',
                    lat: 37.7854699,
                    lng: -122.40661599999999,
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return favorite.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
            
            it('should be able to show an error when try to save without address', function(done) {
                favorite.address = '';

                return favorite.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                favorite.name = '';

                return favorite.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            favorite.remove();
            user.remove();
            done();
        });
    });
});
