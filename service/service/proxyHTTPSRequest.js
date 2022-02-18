const webVpnService = require('./webVpnService.js');
const setting = require('../utils/setting.js');
const ResponseEntity = require('../entity/responseEntity');
/**
 * 桂电代理获取课程表
 * @param {*} res 
 * @param {*} json 
 */
const proxyHTTPSRequest = (res, json) => {
    const {
        username,
        password
    } = setting(json['username'], json['password']);
    //代理请求服务
    webVpnService((result) => {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf8'
        });
        const RESPONSE_BODY = new ResponseEntity(200, '获取成功', result).toJson();
        res.end(RESPONSE_BODY);
    }, username, password);
};

module.exports = proxyHTTPSRequest;