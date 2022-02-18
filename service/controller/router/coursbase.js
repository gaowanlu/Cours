const userDao = require('../../dao/userDao');

function courseBase(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    //获取所有使用过代理业务的用户
    userDao.SELECT((result) => {
        res.end(JSON.stringify(result));
    });
    //res.end();
}
module.exports = courseBase;