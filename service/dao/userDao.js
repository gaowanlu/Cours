const pool = require('./pool');
const coursConfig = require('../coursConfig');
const mysql = require('mysql2');

//TABLE:user
const userDao = {
    /**
     * 检索出所有用户
     * @param {function} callback
     * @returns
     */
    SELECT: async (callback, resolve) => {
        if (!coursConfig.DBOpen) {
            resolve();
            return [];
        }
        try {
            let p = pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                connection.query('SELECT * FROM user', (error, results, fields) => {
                    //console.log(">>检索用户学号列表");
                    callback(results);
                    resolve();
                    connection.release();
                    if (error) throw error;
                });
            });
        } catch (e) {
            console.log(e);
            resolve();
            callback([]);
        }
    },
    /**
     * 插入新的用户账号
     * @param {string:用户输入账号} userid
     * @returns
     */
    INSERT: async (userid) => {
        if (!coursConfig.DBOpen) {
            return;
        }
        try {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                connection.query(mysql.format("REPLACE INTO ?? VALUES(?)", ['user', userid]), (error, results, fields) => {
                    //console.log(">>插入学号信息");
                    connection.release();
                    if (error) {
                        connection.release();
                        throw error;
                    };
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = userDao;
