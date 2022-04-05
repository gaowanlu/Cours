"use strict";

var babel_register = require("babel-register");
var babel_polyfill = require("babel-polyfill");
var works = require('./works');

/**
 * works初始化构造器
 * @returns 
 */
function WorksCreator() {
    var worksInstance = null;
    return function () {
        if (worksInstance) {
            return worksInstance;
        } else {
            /*
             *Works namespace
             * */
            worksInstance = works();
            return worksInstance;
        }
    };
}

var worksCreatorInstance = WorksCreator();

module.exports = worksCreatorInstance();