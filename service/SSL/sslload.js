const coursConfig = require('../coursConfig');
const fs = require('fs');

function sslload() {
    //Load SSL key and cert
    let OPTIONS_SSL = {
        key: '',
        cert: ''
    };
    if (coursConfig.HttpsOpen) {
        OPTIONS_SSL = {
            key: fs.readFileSync(coursConfig.SSLPath.key),
            cert: fs.readFileSync(coursConfig.SSLPath.cert)
        }
    };
    return OPTIONS_SSL;
}

module.exports = sslload;