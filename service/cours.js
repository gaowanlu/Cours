const http = require('http');
const webVpnService = require('./service/webVpnService.js');
const setting = require('./utils/setting.js');
const ResponseEntity = require('./entity/responseEntity');
const url = require('url')
const checkContentType = require('./utils/checkContentType');
const requestJson = require('./utils/requestJson');

/*创建http server*/
const app = http.createServer();

/*代理请求*/
const proxyHTTPSRequest = (res, json) => {
    const {
        username,
        password
    } = setting(json['username'], json['password']);
    //代理请求服务
    webVpnService((result) => {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf8',
            'Access-Control-Allow-Origin': 'https://cours.vercel.app/*'
        });
        const RESPONSE_BODY = new ResponseEntity(200, '获取成功', result).toJson();
        res.end(RESPONSE_BODY);
    }, username, password);
};


/*处理POST请求*/
const POSTWork = (req, res) => {
    const pathname = url.parse(req.url, true).pathname;
    let runFun = map[pathname]; //根据路由选择响应服务
    if (runFun === undefined) {
        runFun = map['none'];
    }
    runFun(req, res);
}

/*路由映射*/
const map = {
    '/': (req, res) => {
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
                    map.none(req, res); //转发500
                })
            } else {
                map.none(req, res); //转发500
            }
        });
    },
    'none': (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf8'
        });
        const BODY = new ResponseEntity(500, '同学你好 欢迎你加入这项工作 通过邮箱联系我们 Email:heizuboriyo@gmail.com').toJson();
        res.end(BODY);
    }
};


/*接收请求配置*/
app.on('request', (req, res) => {
    switch (req.method) {
        case 'POST':
            POSTWork(req, res);
            break;
        default:
            res.end();
    }
});

/*监听端口*/
app.listen(5557);

console.log(`Cours Server Start`);