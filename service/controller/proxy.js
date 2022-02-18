const ResponseEntity = require('../entity/responseEntity');
const url = require('url')
const checkContentType = require('../utils/checkContentType');
const requestJson = require('../utils/requestJson');
const http = require('http');
const proxyHTTPSRequest = require('../service/proxyHTTPSRequest');
const userDao = require('../dao/userDao');
const movie = require('../service/movie/movie');
const master = require('../service/webVpnMasterService');

/**
 * 业务代理请求服务器
 * @param {*} server 
 * @returns 
 */
function proxy(server) {
    return () => {
        /*处理POST请求*/
        const POSTWork = (req, res) => {
            const pathname = url.parse(req.url, true).pathname;
            let runFun = map[pathname]; //根据路由选择响应服务
            if (runFun === undefined) {
                runFun = map['none'];
            }
            runFun(req, res);
        }

        /*处理GET请求*/
        const GETWork = (req, res) => {
            const pathname = url.parse(req.url, true).pathname;
            let runFun = map[pathname]; //根据路由选择响应服务
            if (runFun === undefined) {
                runFun = map['none'];
            }
            runFun(req, res);
        }

        /*路由映射*/
        const map = {
            //root————————————————————
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
            //直播拉流————————————————————
            '/live.flv': (req, res) => {
                //console.log("live proxy");
                //res.writeHead(200,{'Content-Type':'video/x-flv'});
                let preq = http.get({
                    hostname: '127.0.0.1',
                    port: '5559',
                    path: `/live/cliver.flv`,
                    headers: {
                        Accept: "*/*",
                        "Accept-Encoding": "gzip,deflate,br"
                    }
                }, (pres) => {
                    pres.on('data', (chunk) => {
                        //console.log("响应数据");
                        res.write(chunk);
                    });
                });
                preq.on('error', (e) => {
                    console.log(e);
                    res.end();
                });
            },
            //数据库————————————————————
            '/coursbase': (req, res) => {
                res.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf8'
                });
                //获取所有使用过代理业务的用户
                userDao.SELECT((result) => {
                    res.end(JSON.stringify(result));
                });
                //res.end();
            },
            //电影搜索————————————————————
            '/movie/search': movie.search,
            //电影详情————————————————————
            '/movie/detail': movie.detail,
            //研究生课表
            '/master': master,
            //未知路由————————————————————
            'none': (req, res) => {
                res.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf8'
                });
                const BODY = new ResponseEntity(500, '同学你好 欢迎你加入这项工作 通过邮箱联系我们 Email:heizuboriyo@gmail.com').toJson();
                res.end(BODY);
            }
        };

        /*接收请求配置*/
        server.on('request', (req, res) => {
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
                    case 'GET':
                        GETWork(req, res);
                        break;
                    default:
                        res.end();
                }
            }
        });
    }
}


module.exports = proxy;
