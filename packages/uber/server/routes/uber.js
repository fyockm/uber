'use strict';

// The Package is past automatically as first parameter
module.exports = function(Uber, app, auth, database) {

    app.get('/uber/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/uber/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/uber/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/uber/example/render', function(req, res, next) {
        Uber.render('index', {
            package: 'uber'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
