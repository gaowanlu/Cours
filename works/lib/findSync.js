'use strict';

var fs = require('fs');
var pathModule = require('path');

function findSync(startPath) {
    var result = [];

    function finder(path) {
        var files = null;
        try {
            files = fs.readdirSync(path);
        } catch (e) {
            console.warn(e);
        }
        if (files && files.length > 0) {
            files.forEach(function (val, index) {
                var fPath = pathModule.join(path, val);
                var stats = fs.statSync(fPath);
                if (stats.isDirectory()) finder(fPath);
                if (stats.isFile()) result.push(fPath);
            });
        }
    }
    finder(startPath);
    return result;
}

module.exports = findSync;