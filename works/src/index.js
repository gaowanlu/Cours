const babel_register = require("babel-register");
const babel_polyfill = require("babel-polyfill");
const works = require('./works');

/**
 * works初始化构造器
 * @returns 
 */
function WorksCreator() {
    let worksInstance = null;
    return () => {
        if (worksInstance) {
            return worksInstance;
        } else {
            /*
             *Works namespace
             * */
            worksInstance = works();
            return worksInstance;
        }
    }
}

const worksCreatorInstance = WorksCreator();

module.exports = worksCreatorInstance();