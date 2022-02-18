const https = require('https');
const http = require('http');
const fs = require('fs');
const talkService = require('./service/talkService');
const proxy = require('./controller/proxy');
const coursConfig = require('./coursConfig');

/*加载SSL KEY*/
const OPTIONS_SSL = coursConfig.HttpsOpen && {
    key: fs.readFileSync(coursConfig.SSLPath.key),
    cert: fs.readFileSync(coursConfig.SSLPath.cert)
};

/*创建http server*/
const server = coursConfig.HttpsOpen ? https.createServer(OPTIONS_SSL) : http.createServer();
const server_talk = coursConfig.HttpsOpen ? https.createServer(OPTIONS_SSL) : http.createServer();

talkService(server_talk)(); //创建socketIO在线聊天室
proxy(server)(); //创建webvpn代理服务

/*监听端口*/
server.listen(5557); //webvpn 代理
server_talk.listen(5558); //socketIO 在线聊天室

