const babel_register = require("babel-register");
const babel_polyfill = require("babel-polyfill");
const Works = require('./works');

/**
 * works初始化构造器
 * @returns
 */
function WorksCreator(port) {
    let worksInstance = null;
    return () => {
        if (worksInstance) {
            return worksInstance;
        } else {
            /*
             *Works namespace
             * */
            worksInstance = new Works(port);
            return worksInstance;
        }
    }
}

const worksCreatorInstance = WorksCreator(5553)();

module.exports = worksCreatorInstance;
