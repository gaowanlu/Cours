/**
 * works.js design by @gaowanlu , 2022
 * github: https://github.com/gaowanlu/Cours/tree/main/works
 * npm package: https: //www.npmjs.com/package/works.js
 */
require("babel-register");
require("babel-polyfill");
const Works = require('./works');
const worksConfig = require('./works.config.js');

/**
 * works initializer
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
 * Create a works instance
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
 * exposed
 */
module.exports = worksCreatorInstance;