const mysql = require('mysql2');
const coursConfig = require('../coursConfig');


function connections() {
    return () => {
        const pool = mysql.createPool(coursConfig.DBInfo);
        return pool;
    }
}
//创建一个连接池
const pool = connections()();
//暴露
module.exports = {
    pool
};
