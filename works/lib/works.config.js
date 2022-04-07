'use strict';

var path = require('path');
var fs = require('fs');
/**
 * 用于加载works.json
 * @returns 
 */
function worksProcess() {
    var config = null;
    return function () {
        var works_json_path = path.join(require.main.path, './works.json');
        if (config === null) {
            try {
                var configJSON = fs.readFileSync(works_json_path, 'utf8');
                config = JSON.parse(configJSON);
            } catch (e) {
                console.error(e);
                process.exit(-1);
            }
        }
        return config;
    };
}

module.exports = worksProcess();