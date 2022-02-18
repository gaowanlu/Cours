const checkContentType = require('../../utils/checkContentType');
const requestJson = require('../../utils/requestJson');
const proxyHTTPSRequest = require('../../service/proxyHTTPSRequest');
const noneRoute = require('./none');

function index(req, res) {
    //获取请求体
    let rawData = '';
    req.on('data', (chunk) => {
        rawData += chunk;
    });
    req.on('end', () => {
        if (checkContentType['application/json'](req.headers['content-type'])) {
            requestJson.json2Object(rawData, (json) => {
                proxyHTTPSRequest(res, json);
            }, (e) => {
                noneRoute(req, res); //转发
            })
        } else {
            noneRoute(req, res); //转发
        }
    });
}
module.exports = index;