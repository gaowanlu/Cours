/*
import setting from './setting';
 * 声明:本工具禁止传播 传播者与使用者造成后果自负  
 */

const https = require('https');
const colors = require('colors');
const link = require('./utils/link.js')();

const {
    username,
    password
} = require('./setting.js');

//link.get().post().before().after().after().before();


const USER_AGENT = 'Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 96.0 .4664 .55 Safari / 537.36 Edg / 96.0 .1054 .34';

let counter = 0;



//-----------------------------------------------登录过程

/*
第2步
web vpn登录
*/
function login(wengine_vpn_ticket, show_vpn) {
    console.log(`wengine_vpn_ticket :${wengine_vpn_ticket}`.green);
    console.log(`show_vpn : ${show_vpn}`.green);
    const requestBody = `loginType=&password=${password}&service=https://v.guet.edu.cn/login?cas_login=true&username=${username}`;
    let req = https.request({
        method: 'POST',
        host: 'v.guet.edu.cn',
        path: '/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets',
        headers: {
            'User-Agent': USER_AGENT,
            'Content-Type': 'application/x-www-form-urlencoded;charset="UTF-8"',
            'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login',
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
        }
    }, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            //console.log(data);
        });
        //console.log(res.headers);
        let rpHeader = res.headers['location'];
        getST(wengine_vpn_ticket, show_vpn, rpHeader);
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
    /*获取TGT*/
    path = path.split("/");
    path = path[path.length - 1];
    let TGT = path;
    console.log(`${counter++}>>TGT ${TGT}`.green);
    let req = https.request({
        method: 'POST',
        host: 'v.guet.edu.cn',
        path: `/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets/${TGT}`,
        headers: {
            'user-agent': USER_AGENT,
            'content-type': 'application/x-www-form-urlencoded;charset="UTF-8"',
            'referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets',
            'cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
        },
    }, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            console.log(`${counter++}>>ST ${data}`.green);
            const ST = data;
            getToken(wengine_vpn_ticket, show_vpn, ST);
        });
    });
    req.write("service=https://v.guet.edu.cn/login?cas_login=true");
    req.end();
}



function getToken(wengine_vpn_ticket, show_vpn, ST) {
    https.get({
        hostname: 'v.guet.edu.cn',
        path: `/https/77726476706e69737468656265737421e6b94689222426557a1dc7af96/login?cas_login=true&ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        console.log("statusCode", res.statusCode);
        console.log(res.headers['location'].green);
        /*获取token*/
        const token = res.headers['location'].split('=')[1];
        console.log(`${counter++}>>token ${token}`.red);
        tokenTryLogin(wengine_vpn_ticket, show_vpn, token, ST);
    });
}

function tokenTryLogin(wengine_vpn_ticket, show_vpn, token, ST) {
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
        console.log(res.headers['location'].green);
        /*获取token*/
        const token_new = res.headers['location'].split('=')[1];
        console.log(`${counter++}>>token ${token_new}`.red);
        tokenLogin(wengine_vpn_ticket, show_vpn, token_new, ST);
    });
}

function tokenLogin(wengine_vpn_ticket, show_vpn, token, ST) {
    https.get({
        hostname: 'v.guet.edu.cn',
        path: `/token-login?token=${token}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
        }
    }, (res) => {
        console.log(`${counter++}>> tokenlogin success`.blue);
        reviewRoot(wengine_vpn_ticket, show_vpn);
    });
}




//----------------------------------------------重新来一遍 得到已经为登陆身份的ST,用于访问教务系统
function reviewRoot(wengine_vpn_ticket, show_vpn) {
    https.get({
        hostname: 'v.guet.edu.cn',
        path: `/`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fv.guet.edu.cn%2Flogin%3Fcas_login%3Dtrue',
        }
    }, (res) => {
        //console.log(`${counter++}>> ${res.headers}`.blue);
        //console.log(res.headers);
        console.log(`${counter++} >> review Root over`.magenta);
        regetTGT(wengine_vpn_ticket, show_vpn);
    });
}

function regetTGT(wengine_vpn_ticket, show_vpn) {
    const reqBody = `loginType=&password=${password}&service=http://172.16.13.22&username=${username}`;
    let req = https.request({
        method: 'POST',
        host: 'v.guet.edu.cn',
        path: `/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets`,
        headers: {
            'user-agent': USER_AGENT,
            'content-type': 'application/x-www-form-urlencoded;charset="UTF-8"',
            'referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/login',
            'cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
        },
    }, (res) => {
        res.setEncoding('utf8');
        let tempList = res.headers['location'].split('/');
        const TGT = tempList[tempList.length - 1];
        console.log(`${counter++} >> 教务系统TGT ${TGT}`.blue);
        regetST(wengine_vpn_ticket, show_vpn, TGT);
    });
    req.write(reqBody);
    req.end();
}

function regetST(wengine_vpn_ticket, show_vpn, TGT) {
    console.log(`${counter++}>>TGT ${TGT}`.green);
    let req = https.request({
        method: 'POST',
        host: 'v.guet.edu.cn',
        path: `/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets/${TGT}`,
        headers: {
            'user-agent': USER_AGENT,
            'content-type': 'application/x-www-form-urlencoded;charset="UTF-8"',
            'referer': 'https://v.guet.edu.cn/https/77726476706e69737468656265737421f3f652d220256d44300d8db9d6562d/cas/v1/tickets',
            'cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
        },
    }, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            console.log(`${counter++}>>教务系统 ST ${data}`.green);
            const ST = data;
            postTicket(wengine_vpn_ticket, show_vpn, ST);
        });
    });
    req.write("service=http://172.16.13.22");
    req.end();
}

function postTicket(wengine_vpn_ticket, show_vpn, ST) {
    https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let location = res.headers['location'];
        //console.log(location.green);
        toTargetRoot(wengine_vpn_ticket, show_vpn, ST);
    });
}

//访问教务系统根
function toTargetRoot(wengine_vpn_ticket, show_vpn, ST) {
    https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        console.log(`${counter++}>>教务系统 访问成功`.yellow.bgGreen);
        console.log(`${counter++}>>尝试获取数据`.red);
        getPerson(wengine_vpn_ticket, show_vpn, ST);
        // res.on('data', (data) => {
        //console.log(data);
        // });
    });
}

//获取个人信息
function getPerson(wengine_vpn_ticket, show_vpn, ST) {
    console.log(`ST ${ST}`.red.bgGreen);
    https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Student/GetPerson?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        res.on('data', (data) => {
            let obj = JSON.parse(data);
            //console.log(obj);
            console.log(`${counter++}>>获取个人信息成功 你好 ${obj.data.name}`.red);
            //console.log(data);
            getTermTime(wengine_vpn_ticket, show_vpn, ST);
        });
    });
}

//获取学期对应时间
function getTermTime(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Comm/GetTerm?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取学期时间对照成功 ${parsedData.data[0].termname}`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        console.log("获取学期结束");
        getAllStuCourse(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

function getAllStuCourse(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/getstutable?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取所有课程课表成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        console.log("获取课程课表结束");
        genstufee(wengine_vpn_ticket, show_vpn, ST);
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
        host: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/genstufee/?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Content-Type': 'application/x-www-form-urlencoded;charset="UTF-8"',
            'Referer': 'https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe',
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
        }
    }, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取费用信息成功 ${parsedData.msg}`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getyxxf(wengine_vpn_ticket, show_vpn, ST);
    });
    req.write(requestBody);
    req.end();
}

/*已修课程情况信息*/
function getyxxf(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/Getyxxf?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取已修课程情况成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getplancj(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

//获取个人专业课程计划
function getplancj(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/getplancj?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取专业课程计划成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        gethours(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

/*获取上课时间表*/
function gethours(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/comm/gethours?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取上课时间成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getStuScore(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

/*获取课程成绩*/
function getStuScore(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Student/GetStuScore?term=&ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Login/MainDesktop`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取课程成绩成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getexamap(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

//获取考试安排
function getexamap(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Student/getexamap?term=&ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Login/MainDesktop`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取考试安排成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getbk(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

//getbk 不知道是啥
function getbk(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/getbk?ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Login/MainDesktop`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>获取getbk 成功`.red);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getlabtable(wengine_vpn_ticket, show_vpn, ST);
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
}

/*根据学期 获取实验课程表*/
function getlabtable(wengine_vpn_ticket, show_vpn, ST) {
    var req = https.get({
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/getlabtable?term=2021-2022_1&ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Login/MainDesktop`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>根据学期 获取实验课程表成功`.red);
                //console.log(rawData);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        getSctCourse(wengine_vpn_ticket, show_vpn, ST);
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
        hostname: 'v.guet.edu.cn',
        path: `/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/student/GetSctCourse?term=2019-2020_1&comm=1%25401&ticket=${ST}`,
        headers: {
            'User-Agent': USER_AGENT,
            'Cookie': `wengine_vpn_ticket=${wengine_vpn_ticket}; show_vpn=${show_vpn}`,
            'Referer': `https://v.guet.edu.cn/http/77726476706e69737468656265737421a1a013d2766626012d46dbfe/Login/MainDesktop`
        }
    }, (res) => {
        res.setEncoding("UTF-8");
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(`${counter++}>>根据学期范围 获取已修通识课成功`.red);
                //console.log(rawData);
                //console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
    req.on('close', () => {
        //init();
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
    console.log(`${counter++}>>尝试初始化`);

    let req = https.get({
        hostname: 'v.guet.edu.cn',
        path: '/login',
        userAgent: USER_AGENT,
        'Referer': 'https://v.guet.edu.cn/login',
        'Connection': ' keep-alive'
    }, (res) => {
        let wengine_vpn_ticket = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
        let show_vpn = res.headers['set-cookie'][1].split(';')[0].split('=')[1];
        login(wengine_vpn_ticket, show_vpn);
    });
}

(() => {
    init();
})();