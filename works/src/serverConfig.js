const url = require('url');
const server = require('./server');

/*
 * 将创建好的server 绑定到works机制
 * @param {HttpServer} server 没有配置过的http server
 * @param {number} port server需要
 * @param {Works} worksInstance works实例
 * */
function serverConfig(port, ssl, worksInstance) {
    const serverInstance = server(ssl);
    serverInstance.on('request', (req, res) => {
        //在此应该为开发者留出自定义的空间，允许开发者在所有请求时先做一些事情
        //TO DO
        const pathname = url.parse(req.url, true).pathname;
        //让works进行决策
        //console.log(worksInstance);
        //console.log(req);
        worksInstance.exec(pathname, req, res);
    });
    //console.log(serverInstance);
    serverInstance.listen(port);
    console.log("works server listen start");
    return serverInstance;
}

module.exports = serverConfig;