'use strict';

var fs = require('fs');

/*
 *加载SSL证书
 *@param {string} keyPath ssl key file 资源定位路径
 *@param {string} certPath ssl cert file 资源定位路径
 * */
function sslload(keyPath, certPath) {
    //Load SSL key and cert
    var OPTIONS_SSL = {
        key: '',
        cert: ''
    };
    if (coursConfig.HttpsOpen) {
        OPTIONS_SSL = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        };
    };
    return OPTIONS_SSL;
}

module.exports = sslload;