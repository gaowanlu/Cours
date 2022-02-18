const ResponseEntity = require('../../entity/responseEntity');

function noneRoute(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    const BODY = new ResponseEntity(500, '同学你好 欢迎你加入这项工作 通过邮箱联系我们 Email:heizuboriyo@gmail.com').toJson();
    res.end(BODY);
}

module.exports = noneRoute;