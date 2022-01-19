const http = require('http');
const service = require('./service.js');
const setting = require('./setting.js');

const app = http.createServer();

const proxyHTTPSRequest = (res, username, password) => {
    service((result) => {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf8',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(result));
    }, username, password);
};

app.on('request', (req, res) => {
    const fake_username = "";
    const fake_password = "";
    const {
        username,
        password
    } = setting(fake_username, fake_password);
    if (req.method === 'GET') {
        proxyHTTPSRequest(res, username, password);
    } else if (req.method === 'POST') {
        proxyHTTPSRequest(res, username, password);
    }
});

app.listen(8080);
console.log(`Cours Server Start`);