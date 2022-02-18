const url = require('url')
const master = require('../service/webVpnMasterService');
const coursConfig = require('../coursConfig');
const index = require('./router/index');
const liveFlv = require('./router/live.flv.js');
const courseBase = require('./router/coursbase');
const movieSearch = require('./router/movie/search');
const movieDetail = require('./router/movie/detail');
const noneRoute = require('./router/none.js');

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
            '/coursbase': courseBase,
            '/movie/search': movieSearch,
            '/movie/detail': movieDetail,
            '/master': master,
            'none': noneRoute
        };

        /*接收请求配置*/
        server.on('request', (req, res) => {
            //设置允许跨域的域名，*代表允许任意域名跨域
            res.setHeader("Access-Control-Allow-Origin", coursConfig.Ports.proxy.AccessControlAllowOrigin);
            //允许的header类型
            res.setHeader("Access-Control-Allow-Headers", "content-type");
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