'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Uber = new Module('Uber');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Uber.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Uber.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Uber.menus.add({
        'roles': ['authenticated'],
        'title': 'Uber',
        'link': 'all uber',
    });
    Uber.menus.add({
        'roles': ['authenticated'],
        'title': 'Create Favorite',
        'link': 'create favorite'
    });
    
    Uber.angularDependencies(['ngAutocomplete', 'leaflet-directive']);

    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Uber.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Uber.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    Uber.settings(function (err, settings) {
      //you now have the settings object
    });
    */
    Uber.aggregateAsset('css', 'uber.css');

    return Uber;
});
