const cas = require("./cas.js");
require("colors");

const setting = (username, password) => {
    return {
        username,
        password: cas(password)
    }
};


module.exports = setting;