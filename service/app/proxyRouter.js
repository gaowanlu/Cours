const url = require('url')
const master = require('../service/webVpnMasterService');
const coursConfig = require('../coursConfig');
const index = require('./route/index');
const liveFlv = require('./route/live.flv.js');
const movieSearch = require('./route/movie/search');
const movieDetail = require('./route/movie/detail');
const noneRoute = require('./route/none.js');
const analysis = require('./route/user/analysis');
const token_login = require('./route/token/login');
const token_get = require('./route/token/get');
const authFilter = require('./filter/authFilter');

/**
 * 业务代理请求服务器
 * @param {*} server 
 * @returns 
 */
function proxyServer(server) {
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
            '/': index,
            '/live.flv': liveFlv,
            '/movie/search': movieSearch,
            '/movie/detail': movieDetail,
            '/master': master,
            '/user/analysis': analysis,
            '/token/login': token_login,
            '/token/get': authFilter(token_get),
            'none': noneRoute
        };

        /*接收请求配置*/
        server.on('request', (req, res) => {
            //设置允许跨域的域名，*代表允许任意域名跨域
            res.setHeader("Access-Control-Allow-Origin", coursConfig.Ports.proxy.AccessControlAllowOrigin);
            //允许的header类型
            res.setHeader("Access-Control-Allow-Headers", "*");
            //跨域允许的请求方式
            res.setHeader("Access-Control-Allow-Methods", coursConfig.Ports.proxy.AccessControlAllowMethods);
            if (req.method.toLowerCase() === 'options') { //响应浏览器预检
                res.statusCode = 200; //让options尝试请求快速结束
                res.end();
            }
            //处理其他请求Method
            switch (req.method) {
                case 'POST': //POST
                    POSTWork(req, res);
                    break;
                case 'GET': //GET
                    GETWork(req, res);
                    break;
                default:
                    res.end();
            }
        });
    }
}


module.exports = proxyServer;