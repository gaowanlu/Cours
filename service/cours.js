const webVpnService = require('./service/webVpnService.js');
const setting = require('./utils/setting.js');
const ResponseEntity = require('./entity/responseEntity');
const url = require('url')
const checkContentType = require('./utils/checkContentType');
const requestJson = require('./utils/requestJson');
const https = require('https');
const fs = require('fs');

const OPTIONS_SSL = {
    pfx: fs.readFileSync('./linkway.site.pfx'),
    passphrase: fs.readFileSync('./keystorePass.txt'),
}
console.log(OPTIONS_SSL);


/*创建http server*/
const app = https.createServer(OPTIONS_SSL);


/*代理请求*/
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
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options') {
        res.statusCode = 200; //让options尝试请求快速结束
        res.end();
    } else {
        switch (req.method) {
            case 'POST':
                POSTWork(req, res);
                break;
            default:
                res.end();
        }
    }
});

/*监听端口*/
app.listen(5557);

console.log(`Cours Server Start`);