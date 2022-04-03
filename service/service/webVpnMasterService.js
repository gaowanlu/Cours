/*
 *用于研究生课表数据的爬取 暂不能适应
 *欢迎进行测试提交PR
 * */

const https = require('https');
const http2 = require('http2');
const cheerio = require('cheerio');
const colors = require('colors');
const iconv = require('iconv-lite');
const setting = require('../utils/setting');
const zlib = require('zlib');

const USER_AGENT = 'insomnia/2021.7.2';
const VPN_HOST = 'v.guet.edu.cn';
const VPN_HASH = '77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d';
const DEBUG = true;

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
            console.log(res.headers);
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
                    reviewRoot(wengine_vpn_ticket, show_vpn, TGT, ST);
                }
            }, callback);
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    function reviewRoot(wengine_vpn_ticket, show_vpn, TGT, ST) {
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
                    getNavData(wengine_vpn_ticket, show_vpn, TGT, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }


    function getNavData(wengine_vpn_ticket, show_vpn, TGT, ST) {
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
                    regetST(wengine_vpn_ticket, show_vpn, TGT, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }


    //获取教务系统ST
    function regetST(wengine_vpn_ticket, show_vpn, TGT, ST) {
        if (DEBUG) console.log(`TGT ${TGT}`.green);
        const req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets/${TGT}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'X-Requested-With': `XMLHttpRequest`,
                'Connection': 'keep-alive'
            },
        }, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (ST) => {
                rawData += ST;
            });
            res.on('end', () => {
                if (DEBUG) console.log(`教务系统 ST ${rawData}`.green);
                ilogin(wengine_vpn_ticket, show_vpn, TGT, rawData);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.write("service=http%3A%2F%2Fyjsgl.guet.edu.cn%2Filogin.aspx"); //
        req.end();
    }

    //访问主页
    function ilogin(wengine_vpn_ticket, show_vpn, TGT, ST) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/ilogin.aspx?ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
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
                //let nav = JSON.parse(rawData);
                console.log(rawData.yellow);
                LoginRedirect(wengine_vpn_ticket, show_vpn, TGT, ST);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    } //


    function LoginRedirect(wengine_vpn_ticket, show_vpn, TGT, ST) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/LoginRedirect.aspx`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
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
                //let nav = JSON.parse(rawData);
                console.log(rawData.yellow);
                IndexPage(wengine_vpn_ticket, show_vpn, TGT);
                console.log(res.headers);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    } //	/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/LoginRedirect.aspx


    //访问主页
    function IndexPage(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.get({
            hostname: 'v.guet.edu.cn',
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/Default.aspx`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
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
                //let nav = JSON.parse(rawData);
                console.log(rawData.yellow);
                if (DEBUG) console.log("IndexPage进入成功".blue.bgYellow);
                console.log(res.headers);
                TopASPX(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    //课程内容
    function TopASPX(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/top.aspx`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData);
                let str = iconv.decode(buf, 'gb2312');
                console.log(str);
                const $ = cheerio.load(str);
                let scriptSrcs = [];
                $('script').each((i, el) => {
                    let src = $(el).attr('src');
                    if (src) {
                        let target = src.indexOf('WebResource.axd') != -1 ||
                            src.indexOf('ScriptResource.axd') != -1 ||
                            src.indexOf('ScriptResource.axd') != -1;
                        if (target) {
                            console.log("script", src);
                            scriptSrcs.push(src);
                        }
                    }
                });
                scriptRequest(wengine_vpn_ticket, show_vpn, TGT, scriptSrcs, 0, () => {
                    TopMiddleASPX(wengine_vpn_ticket, show_vpn, TGT);
                });
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //课程内容
    function TopMiddleASPX(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/topMiddle.aspx`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData);
                let str = iconv.decode(buf, 'gb2312');
                console.log(str);
                LeftASPX(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //课程内容
    function LeftASPX(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/left.aspx?name=1`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2'
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData);
                let str = iconv.decode(buf, 'gb2312');
                console.log(str);
                changeASPX(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //课程内容
    function changeASPX(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/change.aspx`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData);
                let str = iconv.decode(buf, 'gb2312');
                console.log(str);
                mainASPX(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //课程内容
    function mainASPX(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/main.aspx`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData);
                let str = iconv.decode(buf, 'gb2312');
                console.log(str);
                studentCoursePrePre(wengine_vpn_ticket, show_vpn, TGT);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }


    //课程内容
    function studentCoursePrePre(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/BringUp/KC_studentcourse.aspx?vpn-12-o2-yjsgl.guet.edu.cn&cxsn=&sn=1004`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData, size);
                let str = '';
                zlib.gunzip(buf, (err, decoded) => {
                    str = decoded.toString();
                    console.log(str.bgMagenta);
                    studentCoursePre(wengine_vpn_ticket, show_vpn, TGT);
                });
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }


    //课程内容
    function studentCoursePre(wengine_vpn_ticket, show_vpn, TGT) {
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/BringUp/KC_studentcourse.aspx?vpn-12-o2-yjsgl.guet.edu.cn&cxsn=&sn=1004`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            },
        }, (res) => {
            console.log(res.headers);
            let rawData = [];
            let size = 0;
            res.on('data', (chunk) => {
                rawData.push(chunk);
                size += chunk.length;
            });
            res.on('end', () => {
                let buf = Buffer.concat(rawData, size);
                let str = '';
                zlib.gunzip(buf, (err, decoded) => {
                    str = decoded.toString();
                    console.log(str.cyan);
                    //开始进行DOM解析获取表单值
                    const $ = cheerio.load(str);
                    const __VIEWSTATE = $('#__VIEWSTATE').attr('value');
                    const __VIEWSTATEGENERATOR = $('#__VIEWSTATEGENERATOR').attr('value');
                    const __EVENTVALIDATION = $('#__EVENTVALIDATION').attr('value');
                    console.log([__VIEWSTATE, __VIEWSTATEGENERATOR, __EVENTVALIDATION]);
                    let scriptSrcs = [];
                    $('script').each((i, el) => {
                        let src = $(el).attr('src');
                        if (src) {
                            let target = src.indexOf('WebResource.axd') != -1 ||
                                src.indexOf('ScriptResource.axd') != -1 ||
                                src.indexOf('ScriptResource.axd') != -1;
                            if (target) {
                                console.log("script", src);
                                scriptSrcs.push(src);
                            }
                        }
                    });
                    scriptRequest(wengine_vpn_ticket, show_vpn, TGT, scriptSrcs, 0, () => {
                        studentCourse(wengine_vpn_ticket, show_vpn, TGT, __VIEWSTATE, __VIEWSTATEGENERATOR, __EVENTVALIDATION);
                    });
                });
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //script request
    function scriptRequest(wengine_vpn_ticket, show_vpn, TGT, scriptSrcs, nowIndex, callback) {
        if (nowIndex >= scriptSrcs.length) {
            return callback();
        }
        const req = https.request({
            method: 'GET',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: scriptSrcs[nowIndex],
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive'
            },
        }, (res) => {
            let rawData = [];
            res.on('data', (chunk) => {
                rawData.push(chunk);
            });
            res.on('end', () => {
                //console.log(rawData.join(''));
                console.log("request.end");
                console.log(res.headers);
                nowIndex++;
                scriptRequest(wengine_vpn_ticket, show_vpn, TGT, scriptSrcs, nowIndex, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.end();
    }

    //课程内容
    function studentCourse(wengine_vpn_ticket, show_vpn, TGT, __VIEWSTATE, __VIEWSTATEGENERATOR, __EVENTVALIDATION) {
        //if (DEBUG) console.log(`TGT ${TGT}`.green);
        const req = https.request({
            method: 'POST',
            host: VPN_HOST,
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421e9fd529b2b7e6f457b1cc7a99c406d3670/admin/BringUp/KC_studentcourse.aspx?vpn-12-o2-yjsgl.guet.edu.cn&cxsn=&sn=1004`,
            headers: {
                'User-Agent': ` Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0`,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=1;refresh=1`,
                'Connection': 'keep-alive',
                'Content-Type': ' application/x-www-form-urlencoded; charset=utf-8',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'frame',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
                'X-Requested-With': 'XMLHttpRequest',
                'X-MicrosoftAjax': 'Delta=true',
                'origin': ' https://v.guet.edu.cn'
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
                console.log(str.cyan);
                //callback(str);
            });
        });
        const ScriptManager1 = 'UpdatePanel1|btnQueryCourse';
        console.log(`ScriptManager1=${ScriptManager1}&ddlTerm=20212&txt%E5%AD%A6%E5%8F%B7=${username}&btnQueryCourse=查询&__ASYNCPOST=true&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=${__VIEWSTATE}&__VIEWSTATEGENERATOR=${__VIEWSTATEGENERATOR}&__EVENTVALIDATION=${__EVENTVALIDATION}`);
        req.write(`ddlTerm=20212&txt学号=${username}&btnQueryCourse=查询&__ASYNCPOST=true&__VIEWSTATE=${__VIEWSTATE}&__VIEWSTATEGENERATOR=${__VIEWSTATEGENERATOR}&__EVENTVALIDATION=${__EVENTVALIDATION}`);
        //&__EVENTTARGET=&__EVENTARGUMENT=
        //ScriptManager1=${ScriptManager1}&
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
        }, username, password);
    } catch (e) {
        res.end();
    }
}

(function () {
    const {
        username,
        password
    } = setting('21062301013', '');
    webVpnMasterService((result) => {
        console.log(result.green);
    }, username, password);
})();

module.exports = master;
