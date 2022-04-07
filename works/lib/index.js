"use strict";

var babel_register = require("babel-register");
var babel_polyfill = require("babel-polyfill");
var Works = require('./works');
var worksConfig = require('./works.config.js');

/**
 * works初始化构造器
 * @returns
 */
function WorksCreator(config) {
    var worksInstance = null;
    return function () {
        if (worksInstance) {
            return worksInstance;
        } else {
            /*
             *Works namespace
             * */
            worksInstance = new Works(config);
            return worksInstance;
        }
    };
}

/**
 * 创建works实例
 */
var worksCreatorInstance = WorksCreator({
    port: worksConfig().port,
    ssl: {
        open: worksConfig().ssl.open,
        cert: worksConfig().ssl.cert,
        pem: worksConfig().ssl.pem
    }
})();

/**
 * 暴露
 */
module.exports = worksCreatorInstance;