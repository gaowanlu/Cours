require("babel-register");
const works = require('./src/works');

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