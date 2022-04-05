const cas = require("./cas.js");
require("colors");

/*
 * 将用户账号密码格式化为同一身份验证所接受的格式
 *@param {string} username 用户账号即学号
 *@param {string} password 用户密码
 * */
const setting = (username, password) => {
    return {
        username,
        password: cas(password)
    }
};


module.exports = setting;
