const connections = require('./connections');
const coursConfig = require('../coursConfig');
const mysql = require('mysql2');

const userDao = {
    SELECT: async (callback) => {
        if (!coursConfig.DBOpen) {
            return;
        }
        try {
            connections.pool.getConnection((err, connection) => {
                if (err) {connection.release();throw err;}
                connection.query('SELECT * FROM user', (error, results, fields) => {
		    console.log(">>检索用户学号列表");
                    callback(results);
                    connection.release();
                    if (error) throw error;
                });
            });
        } catch (e) {
            console.log(e);
            callback([]);
        }
    },
    INSERT: async (userid) => {
        if (!coursConfig.DBOpen) {
            return;
        }
        try {
            connections.pool.getConnection((err, connection) => {
                if (err) {connection.release();throw err;}
                connection.query(mysql.format("REPLACE INTO ?? VALUES(?)",['user',userid]), (error, results, fields) => {
                    console.log(">>插入学号信息");
                    connection.release();
                    if (error) {connection.release();throw error;};
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = userDao;
