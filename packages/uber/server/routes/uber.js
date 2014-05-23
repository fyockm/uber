'use strict';

var uber = require('../controllers/uber');

// Favorite authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.user.roles.indexOf('admin') === -1 && req.favorite.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Uber, app, auth) {

    app.route('/uber')
        .get(uber.all)
        .post(auth.requiresLogin, uber.upsert);
    app.route('/uber/:favoriteId')
        .get(uber.show)
        .put(auth.requiresLogin, hasAuthorization, uber.upsert)
        .delete(auth.requiresLogin, hasAuthorization, uber.destroy);

    // Finish with setting up the favoriteId param
    app.param('favoriteId', uber.favorite);
};
