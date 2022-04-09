'use strict';

var fs = require('fs');

/*
 * Load SSL certificate
 *@param {string} keyPath ssl key file path
 *@param {string} certPath ssl cert file path
 * */
function sslload(keyPath, certPath) {
    //Load SSL key and cert
    var opstions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };
    return opstions;
}

module.exports = sslload;