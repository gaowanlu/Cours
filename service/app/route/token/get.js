const contextPatchRequest = require('../../../utils/contextPatchRequest');
async function get(req, res) {
    console.log("context", contextPatchRequest(req));
    res.end(JSON.stringify(contextPatchRequest(req)));
}
module.exports = get;