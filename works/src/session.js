const {
    v4: uuidv4
} = require('uuid');

/**
 * works session 机制
 * @param {*} request 
 */
function checkSession(request) {
    console.log(uuidv4());
}

module.exports = checkSession;