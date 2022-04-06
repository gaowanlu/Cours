const http=require("http");

/*
 *@param config {ssl:sslLoad()}
 * */
function server(config){
    if(config&&config.ssl){
        return http.createServer(config.ssl);
    }
    return http.createServer();
}

module.exports=server;
