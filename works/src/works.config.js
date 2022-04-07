const path = require('path');
const fs = require('fs')
/**
 * 用于加载works.json
 * @returns 
 */
function worksProcess() {
    let config = null;
    return () => {
        const works_json_path = path.join(require.main.path, './works.json');
        if (config === null) {
            try {
                const configJSON = fs.readFileSync(works_json_path, 'utf8');
                config = JSON.parse(configJSON);
            } catch (e) {
                console.error(e);
                process.exit(-1);
            }
        }
        return config;
    }
}

module.exports = worksProcess();