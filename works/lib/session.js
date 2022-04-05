'use strict';

var _require = require('uuid'),
    uuidv4 = _require.v4;

function checkSession(request) {
    console.log(uuidv4());
}

module.exports = checkSession;