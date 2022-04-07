const babel_register = require("babel-register");
const babel_polyfill = require("babel-polyfill");
const Works = require('./works');
const worksConfig = require('./works.config.js');

/**
 * works初始化构造器
 * @returns
 */
function WorksCreator(config) {
    let worksInstance = null;
    return () => {
        if (worksInstance) {
            return worksInstance;
        } else {
            /*
             *Works namespace
             * */
            worksInstance = new Works(config);
            return worksInstance;
        }
    }
}

/**
 * 创建works实例
 */
const worksCreatorInstance = WorksCreator({
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