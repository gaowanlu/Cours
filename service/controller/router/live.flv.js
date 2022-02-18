const http = require('http');

function liveFlv(req, res) {
    let preq = http.get({
        hostname: '127.0.0.1',
        port: '5559',
        path: `/live/cliver.flv`,
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip,deflate,br"
        }
    }, (pres) => {
        pres.on('data', (chunk) => {
            //console.log("响应数据");
            res.write(chunk);
        });
    });
    preq.on('error', (e) => {
        console.log(e);
        res.end();
    });
}
module.exports = liveFlv;