'use strict';

var findSync = require('./findSync');
var path = require('path');
var url = require("url");

var realtimeAllSource = new Set();
var lasttimeAllSource = new Set();
var setIntervalId = 0;

/**
 * init static route
 * @param {Works} target works instance 
 */
function initStaticRoute(target) {
    var static_path = path.join(require.main.path, './static');
    //loop assign
    console.log("static route loop assign start");
    setIntervalId = setInterval(function () {
        var allSource = findSync(static_path);
        realtimeAllSource = new Set(allSource); //update
        var allRoute = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = realtimeAllSource[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (lasttimeAllSource.has(item) == false) {
                    allRoute.push({
                        filePath: item,
                        routePath: url.format(item.replace(static_path, ""))
                    });
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        lasttimeAllSource = realtimeAllSource;
        target.$addStaticRoute(allRoute);
    }, 3000);
}

module.exports = initStaticRoute;