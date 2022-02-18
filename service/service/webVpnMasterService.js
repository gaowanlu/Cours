const https = require('https');
const cheerio = require('cheerio');
const colors = require('colors');
var iconv = require('iconv-lite');

const USER_AGENT = 'insomnia/2021.7.2';
const VPN_HOST = 'v.guet.edu.cn';
const VPN_HASH = '77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d';
const DEBUG = false;

/*请求链出错处理*/
function responseError(callback, e) {
    callback({
        e: e.message
    });
}

/*请求链 连接处 处理*/
function errorBack(next, callback) {
    try {
        next();
    } catch (e) {
        responseError(callback, e);
    }
}

/**
 * 硕士课程表获取
 */
function webVpnMasterService(callback, username, password) {
    /*
    第2步
    web vpn登录
    */
    function getTGT(wengine_vpn_ticket, show_vpn) {
        if (DEBUG) console.log(`wengine_vpn_ticket :${wengine_vpn_ticket}`.green);
        if (DEBUG) console.log(`show_vpn : ${show_vpn}`.green);
        const requestBody = `loginType=&password=${password}&username=${username}`;
        let req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/${VPN_HASH}/cas/v1/tickets`,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept-Encoding': 'gzip',
                'Connection': 'keep-alive',
            }
        }, (res) => {
            res.setEncoding('utf8');
            //console.log(res.headers);
            res.on('data', (chunk) => {
                //console.log(chunk);
            })
            let location = res.headers['location'];
            errorBack(() => {
                getST(wengine_vpn_ticket, show_vpn, location);
            }, callback)
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.write(requestBody);
        req.end();
    }

    /*
    第3步
    获得ST-2903410-MFjwdFx3rlAMaDKmXJ7vHkEJCY4-9612900499e8 格式的东西
    教务系统的ticket
    */
    function getST(wengine_vpn_ticket, show_vpn, path) {
        path = path.replace("https://v.guet.edu.cn", "");
        if (DEBUG) console.log('path', path);
        let TGT = path.split("/");
        TGT = TGT[TGT.length - 1];
        if (DEBUG) console.log(`TGT ${TGT}`.red);
        const req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept-Encoding': 'gzip',
                'Connection': 'keep-alive'
            },
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (ST) => {
                if (DEBUG) console.log(`ST ${ST}`.green);
                ST = ST.replace(" ", "");
                errorBack(() => {
                    stLogin(wengine_vpn_ticket, show_vpn, ST, TGT);
                }, callback)
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        let body = `service=https://${VPN_HOST}/login?cas_login=true`;
        req.write(body);
        req.end();
    }

    function stLogin(wengine_vpn_ticket, show_vpn, ST, TGT) {
        const req = https.get({
            hostname: VPN_HOST,
            host: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e6b94689222426557a1dc7af96/login?cas_login=true&ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn};refresh=1`,
                'X-Requested-With': 'XMLHttpRequest',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            if (DEBUG) console.log("statusCode", res.statusCode);
            if (DEBUG) console.log(res.headers);
            let token = res.headers['location'];
            token = token.split('=');
            token = token[token.length - 1];
            errorBack(() => {
                tokenTryLogin(wengine_vpn_ticket, show_vpn, token, ST, TGT);
            }, callback);
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    function tokenTryLogin(wengine_vpn_ticket, show_vpn, token, ST, TGT) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/https/77726476706e69737468656265737421e6b94689222426557a1dc7af96/wengine-vpn-token-login?token=${token}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            if (DEBUG) console.log("statusCode", res.statusCode);
            if (DEBUG) console.log(`location ${res.headers['location']}`.green);
            /*获取token*/
            const token_new = res.headers['location'].split('=')[1];
            if (DEBUG) console.log(`new token ${token_new}`.green);
            errorBack(() => {
                tokenLogin(wengine_vpn_ticket, show_vpn, token_new, ST, TGT);
            }, callback);
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    function tokenLogin(wengine_vpn_ticket, show_vpn, token, ST, TGT) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/token-login?token=${token}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
            }
        }, (res) => {
            errorBack(() => {
                if (res.headers['location'] && res.headers['location'] === '/') {
                    if (DEBUG) console.log(`tokenlogin success`.green);
                    if (DEBUG) console.log(`location ${res.headers['location']}`.green);
                    reviewRoot(wengine_vpn_ticket, show_vpn, TGT);
                }
            }, callback);
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    function reviewRoot(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
            }
        }, (res) => {
            res.setEncoding("utf-8");
            //console.log(res.headers);
            if (DEBUG) console.log(`review Root over`.magenta);
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    getNavData(wengine_vpn_ticket, show_vpn, TGT);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }


    function getNavData(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/user/portal_groups`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': 'https://v.guet.edu.cn/',
            }
        }, (res) => {
            res.setEncoding("utf-8");
            //console.log(res.headers);
            if (DEBUG) console.log(`review Root over`.magenta);
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    let nav = JSON.parse(rawData);
                    //console.log(rawData.yellow);
                    if (DEBUG) console.log("桂林电子科技大学WebVPN导航进入成功".blue.bgYellow);
                    regetST(wengine_vpn_ticket, show_vpn, TGT);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    //获取教务系统ST
    function regetST(wengine_vpn_ticket, show_vpn, TGT) {
        if (DEBUG) console.log(`TGT ${TGT}`.green);
        const req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/Default.aspx`,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'X-Requested-With': `XMLHttpRequest`,
                'Connection': 'keep-alive',
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=http://yjsgl.guet.edu.cn/ilogin.aspx'
            },
        }, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (ST) => {
                rawData += ST;
            });
            res.on('end', () => {
                submitQuery(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //提交搜索项目
    function submitQuery(wengine_vpn_ticket, show_vpn, TGT) {
        console.log('提交搜索项目'.green);
        if (DEBUG) console.log(`TGT ${TGT}`.green);
        const req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/wengine-vpn/input`,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/json',
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'X-Requested-With': `XMLHttpRequest`,
                'Connection': 'keep-alive',
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/BringUp/KC_studentcourse.aspx'
            },
        }, (res) => {
            res.on('data', (chunk) => {
                console.log("Query响应");
            });
            res.on('end', () => {
                console.log("提交Query完毕");
                studentCourse(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.write(`{"name":"ddlTerm","type":"select-one","value":"20212"}`);
        req.end();
    }

    //课程内容
    function studentCourse(wengine_vpn_ticket, show_vpn, TGT) {
        if (DEBUG) console.log(`TGT ${TGT}`.green);
        const req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/BringUp/KC_studentcourse.aspx?vpn-12-o2-yjsgl.guet.edu.cn&cxsn=&sn=1004`,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'X-Requested-With': `XMLHttpRequest`,
                'Connection': 'keep-alive',
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/BringUp/KC_studentcourse.aspx?vpn-12-o2-yjsgl.guet.edu.cn&cxsn=&sn=1004'
            },
        }, (res) => {
            //res.setEncoding('GB2312');
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData, size);
                let str = iconv.decode(buf, 'gb2312'); //编码gb2312
                callback(str);
            });
        });
        req.write(`ScriptManager1=UpdatePanel1%7CbtnQueryCourse&ddlTerm=20211&txt学号=21062301013`);
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }



    //----------------------------------------------开始
    /*
    第1步
    初始化cookie*/
    function init() {
        if (DEBUG) console.log(`尝试初始化`.green);
        const req = https.get({
            hostname: VPN_HOST,
            host: VPN_HOST,
            path: '/login',
            userAgent: USER_AGENT,
            headers: {
                'Connection': ' keep-alive',
                'Accept-Encoding': 'gzip',
            }
        }, (res) => {
            let wengine_vpn_ticket = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
            let show_vpn = res.headers['set-cookie'][1].split(';')[0].split('=')[1];
            if (DEBUG) console.log(res.headers);
            try {
                getTGT(wengine_vpn_ticket, show_vpn);
                //console.log("wengine_vpn", wengine_vpn_ticket);
                //console.log("show_vpn", show_vpn);
            } catch (e) {
                callback({});
            }
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    init(); //开始执行
}

function master(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=gb2312'
    });
    try {
        webVpnMasterService((result) => {
            //console.log(result.green);
            //res.write(result);
            res.end();
        }, '', '');
    } catch (e) {
        res.end();
    }
}

module.exports = master;