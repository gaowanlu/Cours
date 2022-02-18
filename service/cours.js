const videoLiver = require('./service/videoLiver.js');
const https = require('https');
const http = require('http');
const fs = require('fs');
const talkService = require('./service/talkService');
const proxy = require('./controller/proxy');

//https开关 是否启用HTTPS
const HTTPS = false;

/*加载SSL KEY*/
const OPTIONS_SSL = {
    key: fs.readFileSync('SSL/key.pem'),
    cert: fs.readFileSync('SSL/one.pem')
}

/*创建http server*/
const server = HTTPS ? https.createServer(OPTIONS_SSL) : http.createServer();
const server_talk = HTTPS ? https.createServer(OPTIONS_SSL) : http.createServer();
talkService(server_talk)(); //创建socketIO在线聊天室
proxy(server)(); //创建webvpn代理服务

/*监听端口*/
server.listen(5557); //webvpn 代理
server_talk.listen(5558); //socketIO 在线聊天室
//直播服务
videoLiver(); //rtmp port 1935 6000 http 5559