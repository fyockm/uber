'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Favorite Schema
 */
var FavoriteSchema = new Schema({
    lat: Number,
    lng: Number,
    address: {
        type: String,
        trim: true,
        default: '800 Market Street, San Francisco, CA 94114'
    },
    name: {
        type: String,
        trim: true,
        default: 'Work'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

FavoriteSchema.virtual('center').get(function() {
    return {
        latitude: this.lat,
        longitude: this.lng
    };
});

/**
 * Statics
 */
FavoriteSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Favorite', FavoriteSchema);
