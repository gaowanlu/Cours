/*
 * 用于爬取教务系统本科课程表数据
 * 声明:本工具禁止传播 传播者与使用者造成后果自负
 */
require('colors');
const https = require('https');
const webVpnServiceTest = require('./webVpnService.test.js');
const userDao = require('../dao/userDao');
const setting = require('../utils/setting');

//是否进行调试 console.log open?
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

const USER_AGENT = 'insomnia/2021.7.2';
const VPN_HOST = 'v.guet.edu.cn';
const VPN_HASH = '77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d';
const BKJW_HTTPS_HASH = () => {
    return `/https/77726476706e69737468656265737421f2fc4b8b69377d556a468ca88d1b203b`;
}
//现在的学期编号
const NOW_TERM = '2021-2022_2';

const BKJW_Referer = (ST) => {
    return `https://v.guet.edu.cn${BKJW_HTTPS_HASH()}/?ticket=${ST}`;
}


/**
 * 代理服务函数
 * @param function  callback 响应回调函数
 * @param string username 学号
 * @param string password 密码
 * @returns
 */
function service(callback, username, password) {
    if (DEBUG) console.log(username, password);
    //用户使用测试接口
    if (webVpnServiceTest(callback, username, password)) {
        return;
    }
    // console.log(`username ${username}`.green);
    // console.log(`pwd ${password}`.green);

    const RETURN_RESULT = {};

    //-----------------------------------------------登录过程

    /*
    第2步
    web vpn登录
    */
    function getTGT(wengine_vpn_ticket, show_vpn) {
        if (DEBUG) console.log(`getTGT wengine_vpn_ticket :${wengine_vpn_ticket}`.green);
        if (DEBUG) console.log(`getTGT show_vpn : ${show_vpn}`.green);
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
            if (DEBUG) console.log("getTGT", res.headers);
            res.on('data', (chunk) => {
                //console.log(chunk);
            })
            let location = res.headers['location'];
            if (DEBUG) console.log("getTGT location", location);
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
                errorBack(() => {
                    postTicket(wengine_vpn_ticket, show_vpn, rawData);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
        req.write("service=https://bkjw.guet.edu.cn"); //
        req.end();
    }

    //使用教务系统ST登录
    function postTicket(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421f2fc4b8b69377d556a468ca88d1b203b/?ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            if (DEBUG) console.log('使用教务系统ST登录', res.headers);
            let rawData = ""
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                if (DEBUG) console.log('rawData', rawData);
                errorBack(() => {
                    getPerson(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }


    //获取个人信息
    function getPerson(wengine_vpn_ticket, show_vpn, ST) {
        if (DEBUG) console.log(`ST ${ST}`.red.bgGreen);
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/Student/GetPerson`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn};refresh=1;`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            if (DEBUG) console.log('头部', res.headers);
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    RETURN_RESULT.personInfo = JSON.parse(rawData);
                    getTermTime(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    //获取学期对应时间
    function getTermTime(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/Comm/GetTerm`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    if (DEBUG) console.log(`获取学期时间对照成功 ${rawData}`.red);
                    const TIME = JSON.parse(rawData);
                    RETURN_RESULT.terTime = TIME;
                    //console.log(parsedData);
                    if (DEBUG) console.log("获取学期结束");
                    getAllStuCourse(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    /*课程课表*/
    function getAllStuCourse(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/getstutable`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const stuTable = JSON.parse(rawData);
                    RETURN_RESULT.stuTable = stuTable;
                    if (DEBUG) console.log(`获取所有课程课表成功`.red);
                    if (DEBUG) console.log(stuTable);
                    getyxxf(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    /*已修课程情况信息*/
    function getyxxf(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/Getyxxf`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const yxxf = JSON.parse(rawData);
                    RETURN_RESULT.yxxf = yxxf;
                    if (DEBUG) console.log(`获取已修课程情况成功`.red);
                    //console.log(parsedData);
                    getplancj(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    //获取个人专业课程计划
    function getplancj(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/getplancj`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const plancj = JSON.parse(rawData);
                    RETURN_RESULT.plancj = plancj;
                    if (DEBUG) console.log(`获取专业课程计划成功`.red);
                    //console.log(parsedData);
                    gethours(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    /*获取上课时间表*/
    function gethours(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/comm/gethours?ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const hours = JSON.parse(rawData);
                    RETURN_RESULT.hours = hours;
                    if (DEBUG) console.log(`获取上课时间成功`.red);
                    //console.log(parsedData);
                    getStuScore(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    /*获取课程成绩*/
    function getStuScore(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/Student/GetStuScore?term=&ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const stuScore = JSON.parse(rawData);
                    RETURN_RESULT.stuScore = stuScore;
                    if (DEBUG) console.log(`获取课程成绩成功`.red);
                    //console.log(parsedData);
                    getexamap(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    //获取考试安排
    function getexamap(wengine_vpn_ticket, show_vpn, ST) {
        const req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/Student/getexamap?term=&ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const exampap = JSON.parse(rawData);
                    RETURN_RESULT.examap = exampap;
                    if (DEBUG) console.log(`获取考试安排成功`.red);
                    //console.log(parsedData);
                    getbk(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    //getbk 不知道是啥
    function getbk(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/getbk?ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const bk = JSON.parse(rawData);
                    RETURN_RESULT.bk = bk;
                    if (DEBUG) console.log(`获取getbk 成功`.red);
                    //console.log(parsedData);
                    getlabtable(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    /*根据学期 获取实验课程表*/
    function getlabtable(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/getlabtable?term=${NOW_TERM}&ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const labTable = JSON.parse(rawData);
                    RETURN_RESULT.labTable = labTable;
                    if (DEBUG) console.log('lab', labTable);
                    if (DEBUG) console.log(`根据学期 获取实验课程表成功`.red);
                    //console.log(rawData);
                    //console.log(parsedData);
                    getSctCourse(wengine_vpn_ticket, show_vpn, ST);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    /*获取已修通识课
    2019 - 2020 _2 soon..
    */
    function getSctCourse(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/GetSctCourse?term=2019-2020_1&comm=1%25401&ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': BKJW_Referer(ST),
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                errorBack(() => {
                    const sctCourse = JSON.parse(rawData);
                    RETURN_RESULT.sctCourse = sctCourse;
                    if (DEBUG) console.log(`根据学期范围 获取已修通识课成功`.red);
                    //console.log(rawData);
                    //console.log(parsedData);
                    if (DEBUG) console.log('/********全部数据获取成功********/');
                    //执行回调函数
                    userDao.INSERT(username); //记录此用户账号
                    callback(RETURN_RESULT);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
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
            res.on('data', (slice) => {})
            res.on('end', () => {
                errorBack(() => {
                    let wengine_vpn_ticket = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
                    let show_vpn = res.headers['set-cookie'][1].split(';')[0].split('=')[1];
                    if (DEBUG) console.log("init", res.headers);
                    if (DEBUG) console.log("init", JSON.stringify({
                        wengine_vpn_ticket,
                        show_vpn
                    }).red);
                    getTGT(wengine_vpn_ticket, show_vpn);
                }, callback);
            });
        });
        req.on('error', (e) => {
            responseError(callback, e);
        });
    }

    init(); //开始执行
}

// (() => {
//     const {
//         username,
//         password
//     } = setting('1901420313', '');
//     //代理请求服务
//     service((result) => {
//         console.log("测试完毕");
//     }, username, password);
// })();

module.exports = service;
