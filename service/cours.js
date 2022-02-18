const https = require('https');
const http = require('http');
const talkServer = require('./controller/talkServer');
const proxyServer = require('./controller/proxyServer');
const coursConfig = require('./coursConfig');
const sslload = require('./SSL/sslload');

//Load SSL key and cert
const OPTIONS_SSL = sslload();

//Create http server
const server = coursConfig.HttpsOpen ? https.createServer(OPTIONS_SSL) : http.createServer(); //course proxy
const server_talk = coursConfig.HttpsOpen ? https.createServer(OPTIONS_SSL) : http.createServer(); //talk online room

//Config Server
talkServer(server_talk)();
proxyServer(server)();

//Server start to listen
server.listen(coursConfig.Ports.proxy.port); //webvpn 代理
server_talk.listen(coursConfig.Ports.talk.port); //socketIO 在线聊天室