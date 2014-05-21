'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/favorite');

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
                    title: 'Favorite Title',
                    content: 'Favorite Content',
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

            it('should be able to show an error when try to save without title', function(done) {
                favorite.title = '';

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
