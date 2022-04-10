const findSync = require('./findSync');
const path = require('path');
const url = require("url");

/**
 * init static route
 * @param {Works} target works instance 
 */
function initStaticRoute(target) {
    const static_path = path.join(require.main.path, './static');
    const allSource = findSync(static_path);
    //format route path form
    let allRoute = allSource.map((item) => {
        return {
            filePath: item,
            routePath: url.format(item.replace(static_path, ""))
        };
    });
    target.$addStaticRoute(allRoute);
}

module.exports = initStaticRoute;