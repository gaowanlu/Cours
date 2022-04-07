'use strict';

var fs = require('fs');

/*
 *加载SSL证书
 *@param {string} keyPath ssl key file 资源定位路径
 *@param {string} certPath ssl cert file 资源定位路径
 * */
function sslload(keyPath, certPath) {
    //Load SSL key and cert
    return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };
}

module.exports = sslload;