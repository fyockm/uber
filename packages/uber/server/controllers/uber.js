'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Favorite = mongoose.model('Favorite'),
    _ = require('lodash');


/**
 * Find favorite by id
 */
exports.favorite = function(req, res, next, id) {
    Favorite.load(id, function(err, favorite) {
        if (err) return next(err);
        if (!favorite) return next(new Error('Failed to load favorite ' + id));
        req.favorite = favorite;
        next();
    });
};

/**
 * Create an favorite
 */
exports.create = function(req, res) {
    var favorite = new Favorite(req.body);
    favorite.user = req.user;

    favorite.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                favorite: favorite
            });
        } else {
            res.jsonp(favorite);
        }
    });
};

/**
 * Update an favorite
 */
exports.update = function(req, res) {
    var favorite = req.favorite;

    favorite = _.extend(favorite, req.body);

    favorite.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                favorite: favorite
            });
        } else {
            res.jsonp(favorite);
        }
    });
};

/**
 * Delete an favorite
 */
exports.destroy = function(req, res) {
    var favorite = req.favorite;

    favorite.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                favorite: favorite
            });
        } else {
            res.jsonp(favorite);
        }
    });
};

/**
 * Show an favorite
 */
exports.show = function(req, res) {
    res.jsonp(req.favorite);
};

/**
 * List of Uber
 */
exports.all = function(req, res) {
    Favorite.find().sort('-created').populate('user', 'name username').exec(function(err, uber) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(uber);
        }
    });
};
