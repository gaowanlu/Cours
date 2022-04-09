const url = require('url');
const server = require('./server');

/*
 * Bind the created server to the works mechanism
 * @param {HttpServer} server unconfigured http server
 * @param {number} port server needs
 * @param {Works} worksInstance works instance
 * */
function serverConfig(port, ssl, worksInstance) {
    const serverInstance = server(ssl);
    serverInstance.on('request', (req, res) => {
        const pathname = url.parse(req.url, true).pathname;
        //Use works to make decisions
        worksInstance.exec(pathname, req, res);
    });
    //console.log(serverInstance);
    serverInstance.listen(port);
    console.log("works server listen start");
    return serverInstance;
}

module.exports = serverConfig;