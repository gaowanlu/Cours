const findSync = require('./findSync');
const path = require('path');
const url = require("url");

let realtimeAllSource = new Set();
let lasttimeAllSource = new Set();
let setIntervalId = 0;

/**
 * init static route
 * @param {Works} target works instance 
 */
function initStaticRoute(target) {
    const static_path = path.join(require.main.path, './static');
    //loop assign
    console.log("static route loop assign start");
    setIntervalId = setInterval(() => {
        const allSource = findSync(static_path);
        realtimeAllSource = new Set(allSource); //update
        let allRoute = [];
        for (let item of realtimeAllSource) {
            if (lasttimeAllSource.has(item) == false) {
                allRoute.push({
                    filePath: item,
                    routePath: url.format(item.replace(static_path, ""))
                });
            }
        }
        lasttimeAllSource = realtimeAllSource;
        target.$addStaticRoute(allRoute);
    }, 3000);
}

module.exports = initStaticRoute;