const https = require('https');
const http = require('http');
const talkRouter = require('./app/talkRouter');
const proxyRouter = require('./app/proxyRouter');
const coursConfig = require('./coursConfig');
const sslload = require('./SSL/sslload');

//Load SSL key and cert
const OPTIONS_SSL = sslload();

//Create http server
const server = coursConfig.HttpsOpen ? https.createServer(OPTIONS_SSL) : http.createServer(); //course proxy
const server_talk = coursConfig.HttpsOpen ? https.createServer(OPTIONS_SSL) : http.createServer(); //talk online room

//Config Server
talkRouter(server_talk)();
proxyRouter(server)();

//Server start to listen
server.listen(coursConfig.Ports.proxy.port); //webvpn 代理
server_talk.listen(coursConfig.Ports.talk.port); //socketIO 在线聊天室