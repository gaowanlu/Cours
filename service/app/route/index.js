const proxyHTTPSRequest = require('../../service/proxyHTTPSRequest');
const noneRoute = require('./none');
const requestJSON = require('../../utils/requestJson');

async function index(req, res) {
    let json = await requestJSON.jsonReceiver(req);
    console.log("Router Index ", json);
    if (json === null) {
        noneRoute(req, res); //转发
    }
    proxyHTTPSRequest(res, json);
}
module.exports = index;