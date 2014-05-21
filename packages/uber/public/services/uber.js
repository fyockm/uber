'use strict';

//Uber service used for uber REST endpoint
angular.module('mean').factory('Uber', ['$resource',
	function($resource) {
		return $resource('uber/:favoriteId', {
			favoriteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
