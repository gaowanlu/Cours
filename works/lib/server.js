"use strict";

var http = require("http");
var https = require('https');
var sslload = require("./sslload");

/*
 *@param  {open:boolean,cert:string,pem:string} ssl
 * */
function server(ssl) {
    if (ssl && ssl.open) {
        console.log("using https");
        var OPSTIONS = sslload(ssl.pem, ssl.cert);
        //console.log("OPTIONS", OPSTIONS);
        return https.createServer(OPSTIONS);
    }
    console.log("using http");
    return http.createServer();
}

module.exports = server;