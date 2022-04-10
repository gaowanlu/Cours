const fs = require('fs');
const pathModule = require('path');

function findSync(startPath) {
    let result = [];

    function finder(path) {
        let files = null;
        try {
            files = fs.readdirSync(path);
        } catch (e) {
            console.warn(e);
        }
        if (files && files.length > 0) {
            files.forEach((val, index) => {
                let fPath = pathModule.join(path, val);
                let stats = fs.statSync(fPath);
                if (stats.isDirectory()) finder(fPath);
                if (stats.isFile()) result.push(fPath);
            });
        }
    }
    finder(startPath);
    return result;
}

module.exports = findSync;