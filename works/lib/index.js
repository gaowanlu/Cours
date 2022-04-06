"use strict";

var babel_register = require("babel-register");
var babel_polyfill = require("babel-polyfill");
var Works = require('./works');

/**
 * works初始化构造器
 * @returns
 */
function WorksCreator(port) {
    var worksInstance = null;
    return function () {
        if (worksInstance) {
            return worksInstance;
        } else {
            /*
             *Works namespace
             * */
            worksInstance = new Works(port);
            return worksInstance;
        }
    };
}

var worksCreatorInstance = WorksCreator(5553)();

module.exports = worksCreatorInstance;