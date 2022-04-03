const webVpnService = require('./webVpnService.js');
const setting = require('../utils/setting.js');
const ResponseEntity = require('../entity/responseEntity');
/**
 * 桂电代理获取课程表
 * @param {*} res
 * @param {*} json
 */
const proxyHTTPSRequest = (res, json) => {
    //响应头部状态吗以及返回类型
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    if (!json.username || !json.password) {
        res.end(new ResponseEntity(200, '获取失败', {
            e: 'api use error'
        }).toJson());
        return;
    }
    const {
        username,
        password
    } = setting(json['username'], json['password']);
    //console.log([username, password]);
    //代理请求服务获取用户课表数据等待响应发送给用户
    webVpnService((result) => {
        const RESPONSE_BODY = new ResponseEntity(200, '获取成功', result).toJson();
        res.end(RESPONSE_BODY);
    }, username, password);
};

module.exports = proxyHTTPSRequest;
