const webVpnService = require('./service/webVpnService.js');
const videoLiver = require('./service/videoLiver.js');
const setting = require('./utils/setting.js');
const ResponseEntity = require('./entity/responseEntity');
const url = require('url')
const checkContentType = require('./utils/checkContentType');
const requestJson = require('./utils/requestJson');
const https = require('https');
const http = require('http');
const fs = require('fs');
const HTTPS = true; //https开关


const OPTIONS_SSL = {
    key: fs.readFileSync('SSL/key.pem'),
    cert: fs.readFileSync('SSL/one.pem')
}

/*创建http server*/
const server = HTTPS ? https.createServer(OPTIONS_SSL) : http.createServer();
const server_talk = HTTPS ? https.createServer(OPTIONS_SSL) : http.createServer();

/*创建服务端socket.io*/
const io = require('socket.io')(server_talk, {
    allowEIO3: true,
    cors: {
        origin: "*", // refer
        methods: ["GET", "POST"]
    }
});

/*消息缓存队列*/
const Message = {
    queue: [],
    store(data) {
        data.index = Counter.add();
        data.date = new Date().toISOString();
        this.queue.push(data);
        if (this.queue.length > 50) {
            this.queue.shift(); //大于50则删除头部元素
        }
    }
};

/**
 *计数器
 */
const Counter = {
    now: 0,
    add() {
        if (this.now > 110) {
            this.now = 0;
        }
        this.now++;
        return this.now;
    }
};


/*当所有用户建立连接时*/
io.on('connection', client => {
    //console.log("用户创建连接", client.id);
    client.send(Message.queue);
    //为已经连接的用户注册事件
    client.on('event', data => {
        //console.log("事件发生");
    });
    client.on('message', data => {
        try {
            let dataType = typeof data;
            if (dataType === 'string') {

            } else {
                data.id = client.id;
                Message.store(data);
                //向所有用户广播消息
                io.emit("message", Message.queue); //会自动转json
            }
        } catch (e) {
            console.log(e);
        }
    });
    client.on('disconnect', () => {
        //console.log("用户断开连接");
    });
});


/*webvpn代理请求*/
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
    '/live.flv':(req,res)=>{
	//console.log("live proxy");
	//res.writeHead(200,{'Content-Type':'video/x-flv'});
    	let preq = http.get({
	    hostname: '127.0.0.1',
	    port:'5559',
            path: `/live/cliver.flv`,
            headers: {
		Accept:"*/*",
		"Accept-Encoding":"gzip,deflate,br"
            }
        }, (pres) =>{
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
		GETWork(req,res);
		break;
            default:
                res.end();
        }
    }
});



/*监听端口*/
server.listen(5557); //webvpn
//console.log("webVpn port 5557".green);
server_talk.listen(5558); //talk
//console.log("talk port 5558".green);
//直播服务
videoLiver(); //rtmp port 1935 6000 http 5559
//console.log("live port rtmp 1935 http 5559".green);
