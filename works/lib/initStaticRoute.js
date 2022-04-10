'use strict';

var findSync = require('./findSync');
var path = require('path');
var url = require("url");

/**
 * init static route
 * @param {Works} target works instance 
 */
function initStaticRoute(target) {
    var static_path = path.join(require.main.path, './static');
    var allSource = findSync(static_path);
    //format route path form
    var allRoute = allSource.map(function (item) {
        return {
            filePath: item,
            routePath: url.format(item.replace(static_path, ""))
        };
    });
    target.$addStaticRoute(allRoute);
}

module.exports = initStaticRoute;