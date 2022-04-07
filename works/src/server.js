const http = require("http");
const sslload = require("./sslload");

/*
 *@param  {open:boolean,cert:string,pem:string} ssl
 * */
function server(ssl) {
    if (ssl && ssl.open) {
        return http.createServer(sslload(ssl.pem, ssl.cert));
    }
    return http.createServer();
}

module.exports = server;