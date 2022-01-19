/*
import setting from './setting';
 * 声明:本工具禁止传播 传播者与使用者造成后果自负  
 */
require('colors');
const https = require('https');
const setting = require('./setting.js');
const link = require('./utils/link.js')();

function service(callback, username, password) {

    console.log(`username ${username}`.green);
    console.log(`pwd ${password}`.green);


    const USER_AGENT = 'insomnia/2021.7.2';
    const VPN_HOST = 'v.guet.edu.cn';
    const VPN_HASH = '77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d';
    const BKJW_HTTPS_HASH = () => {
        return `/https/77726476706e69737468656265737421f2fc4b8b69377d556a468ca88d1b203b`;
    }

    const BKJW_Referer = (ST) => {
        return `https://v.guet.edu.cn${BKJW_HTTPS_HASH()}/?ticket=${ST}`;
    }


    const RETURN_RESULT = {};


    //-----------------------------------------------登录过程

    /*
    第2步
    web vpn登录
    */
    function getTGT(wengine_vpn_ticket, show_vpn) {
        console.log(`wengine_vpn_ticket :${wengine_vpn_ticket}`.green);
        console.log(`show_vpn : ${show_vpn}`.green);
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
            getST(wengine_vpn_ticket, show_vpn, location);
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
        console.log('path', path);
        let TGT = path.split("/");
        TGT = TGT[TGT.length - 1];
        console.log(`TGT ${TGT}`.red);
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
                console.log(`ST ${ST}`.green);
                ST = ST.replace(" ", "");
                stLogin(wengine_vpn_ticket, show_vpn, ST, TGT);
            });
        });
        let body = `service=https://${VPN_HOST}/login?cas_login=true`;
        console.log(body);
        req.write(body);
        req.end();
    }


    function stLogin(wengine_vpn_ticket, show_vpn, ST, TGT) {
        https.get({
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
            console.log("statusCode", res.statusCode);
            console.log(res.headers);
            let token = res.headers['location'];
            token = token.split('=');
            token = token[token.length - 1];
            tokenTryLogin(wengine_vpn_ticket, show_vpn, token, ST, TGT);
        });
    }


    function tokenTryLogin(wengine_vpn_ticket, show_vpn, token, ST, TGT) {
        https.get({
            hostname: 'v.guet.edu.cn',
            path: `/https/77726476706e69737468656265737421e6b94689222426557a1dc7af96/wengine-vpn-token-login?token=${token}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            console.log("statusCode", res.statusCode);
            console.log(`location ${res.headers['location']}`.green);
            /*获取token*/
            const token_new = res.headers['location'].split('=')[1];
            console.log(`new token ${token_new}`.green);
            tokenLogin(wengine_vpn_ticket, show_vpn, token_new, ST, TGT);
        });
    }

    function tokenLogin(wengine_vpn_ticket, show_vpn, token, ST, TGT) {
        https.get({
            hostname: 'v.guet.edu.cn',
            path: `/token-login?token=${token}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
            }
        }, (res) => {
            if (res.headers['location'] && res.headers['location'] === '/') {
                console.log(`tokenlogin success`.green);
                console.log(`location ${res.headers['location']}`.green);
                reviewRoot(wengine_vpn_ticket, show_vpn, TGT);
            } else {
                console.log(`login error: tokenLogin`.red);
            }
        });
    }

    function reviewRoot(wengine_vpn_ticket, show_vpn, TGT) {
        https.get({
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
            console.log(`review Root over`.magenta);
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    getNavData(wengine_vpn_ticket, show_vpn, TGT);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
    }


    function getNavData(wengine_vpn_ticket, show_vpn, TGT) {
        https.get({
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
            console.log(`review Root over`.magenta);
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    let nav = JSON.parse(rawData);
                    //console.log(rawData.yellow);
                    console.log("桂林电子科技大学WebVPN导航进入成功".blue.bgYellow);
                    regetST(wengine_vpn_ticket, show_vpn, TGT);
                } catch (e) {
                    console.error(e.message.red);
                }
            });
        });
    }





    //获取教务系统ST
    function regetST(wengine_vpn_ticket, show_vpn, TGT) {
        console.log(`TGT ${TGT}`.green);
        let req = https.request({
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
                console.log(`教务系统 ST ${rawData}`.green);
                postTicket(wengine_vpn_ticket, show_vpn, rawData);
            });
        });
        console.log(req.headers);
        req.write("service=https://bkjw.guet.edu.cn"); //
        req.end();
    }

    //使用教务系统ST登录
    function postTicket(wengine_vpn_ticket, show_vpn, ST) {
        https.get({
            hostname: VPN_HOST,
            path: `/https/77726476706e69737468656265737421f2fc4b8b69377d556a468ca88d1b203b/?ticket=${ST}`,
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding("UTF-8");
            console.log('使用教务系统ST登录', res.headers);
            let rawData = ""
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                //console.log('rawData', rawData);
                getPerson(wengine_vpn_ticket, show_vpn, ST);
            });
        });
    }


    //获取个人信息
    function getPerson(wengine_vpn_ticket, show_vpn, ST) {
        console.log(`ST ${ST}`.red.bgGreen);
        https.get({
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
            console.log('头部', res.headers);
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                RETURN_RESULT.personInfo = JSON.parse(rawData);
                getTermTime(wengine_vpn_ticket, show_vpn, ST);
            });
        });
    }

    //获取学期对应时间
    function getTermTime(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
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
                try {
                    //console.log(`获取学期时间对照成功 ${rawData}`.red);
                    const TIME = JSON.parse(rawData);
                    RETURN_RESULT.terTime = TIME;
                    //console.log(parsedData);
                    console.log("获取学期结束");
                    getAllStuCourse(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }

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
                try {
                    const stuTable = JSON.parse(rawData);
                    RETURN_RESULT.stuTable = stuTable;
                    console.log(`获取所有课程课表成功`.red);
                    //console.log(parsedData);
                    genstufee(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }


    /*获得是否欠费*/
    function genstufee(wengine_vpn_ticket, show_vpn, ST) {
        const requestBody = "ctype=byyqxf&stid=1901420313&grade=2019&spno=080611W";
        let req = https.request({
            method: 'POST',
            host: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/genstufee`,
            headers: {
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded;charset="UTF-8"',
                'Referer': BKJW_Referer(ST),
                'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
                'x-requested-with': 'XMLHttpRequest'
            }
        }, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const fee = JSON.parse(rawData);
                    RETURN_RESULT.fee = fee;
                    console.log(`获取费用信息成功 ${fee.msg}`.red);
                    //console.log(parsedData);
                    getyxxf(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.write(requestBody);
        req.end();
    }

    /*已修课程情况信息*/
    function getyxxf(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
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
                try {
                    const yxxf = JSON.parse(rawData);
                    RETURN_RESULT.yxxf = yxxf;
                    console.log(`获取已修课程情况成功`.red);
                    //console.log(parsedData);
                    getplancj(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }

    //获取个人专业课程计划
    function getplancj(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
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
                try {
                    const plancj = JSON.parse(rawData);
                    RETURN_RESULT.plancj = plancj;
                    console.log(`获取专业课程计划成功`.red);
                    //console.log(parsedData);
                    gethours(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }

    /*获取上课时间表*/
    function gethours(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
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
                try {
                    const hours = JSON.parse(rawData);
                    RETURN_RESULT.hours = hours;
                    console.log(`获取上课时间成功`.red);
                    //console.log(parsedData);
                    getStuScore(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }

    /*获取课程成绩*/
    function getStuScore(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
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
                try {
                    const stuScore = JSON.parse(rawData);
                    RETURN_RESULT.stuScore = stuScore;
                    console.log(`获取课程成绩成功`.red);
                    //console.log(parsedData);
                    getexamap(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }

    //获取考试安排
    function getexamap(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
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
                try {
                    const exampap = JSON.parse(rawData);
                    RETURN_RESULT.examap = exampap;
                    console.log(`获取考试安排成功`.red);
                    //console.log(parsedData);
                    getbk(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
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
                try {
                    const bk = JSON.parse(rawData);
                    RETURN_RESULT.bk = bk;
                    console.log(`获取getbk 成功`.red);
                    //console.log(parsedData);
                    getlabtable(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }

    /*根据学期 获取实验课程表*/
    function getlabtable(wengine_vpn_ticket, show_vpn, ST) {
        var req = https.get({
            hostname: VPN_HOST,
            path: `${BKJW_HTTPS_HASH()}/student/getlabtable?term=2019-2020_1&ticket=${ST}`,
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
                try {
                    const labTable = JSON.parse(rawData);
                    RETURN_RESULT.labTable = labTable;
                    console.log('lab', labTable);
                    console.log(`根据学期 获取实验课程表成功`.red);
                    //console.log(rawData);
                    //console.log(parsedData);
                    getSctCourse(wengine_vpn_ticket, show_vpn, ST);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
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
                try {
                    const sctCourse = JSON.parse(rawData);
                    RETURN_RESULT.sctCourse = sctCourse;
                    console.log(`根据学期范围 获取已修通识课成功`.red);
                    //console.log(rawData);
                    //console.log(parsedData);
                    console.log('/********全部数据获取成功********/');
                    //执行回调函数
                    callback(RETURN_RESULT);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
    }



    //----------------------------------------------开始
    /*
    第1步
    初始化cookie*/
    function init() {
        console.log(`尝试初始化`.green);
        let req = https.get({
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
            console.log(res.headers);
            getTGT(wengine_vpn_ticket, show_vpn);
        });
    }
    init();
}

(() => {
    //let setting=setting('','');
    // service((res,setting.username,setting.password) => {
    //     console.log('RETURN_RESULT', JSON.stringify(res));
    // });
})();

module.exports = service;