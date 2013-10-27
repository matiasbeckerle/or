/**
 * AngularJS filter OR version 1.0
 * 2013-10-27
 * https://github.com/matiasbeckerle/or
 * Copyright Matias Beckerle
 * Licensed under The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

'use strict';

angular.module('orConditional', []).filter('or', [function() {
    return function(itemsToFilter, conditions) {
        var attrs = [];
        var results = [];

        // Only add an attr to search when it has a value
        for (var attr in conditions) {
            if (angular.isDefined(conditions[attr])) {
                attrs.push(attr);
            }
        }

        // No one attr has a value to search
        if (attrs.length === 0) {
            return itemsToFilter;
        }

        for (var i = 0; i < itemsToFilter.length; i++) {
            var h = 0;
            var found = false;

            while (!found && h < attrs.length) {
                if (angular.isDefined(itemsToFilter[i][attrs[h]])) {
                    // To avoid issues with non-string values
                    itemsToFilter[i][attrs[h]] += '';

                    // For the moment the check is case insensitive
                    if (itemsToFilter[i][attrs[h]].toLowerCase().indexOf(conditions[attrs[h]].toLowerCase()) != -1) {
                        results.push(itemsToFilter[i]);
                        found = true;
                    }
                }

                h++;
            }
        }

        return results;
    };
}]);