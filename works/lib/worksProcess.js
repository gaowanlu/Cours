'use strict';

var path = require('path');
var fs = require('fs');

function worksProcess() {
    var works_json_path = path.join(require.main.path, './works.json');
    try {
        var config = fs.readFileSync(works_json_path, 'utf8');
        console.log(JSON.parse(config));
    } catch (e) {
        console.error(e);
        process.exit(-1);
    }
}
module.exports = worksProcess;