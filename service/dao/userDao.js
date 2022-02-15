const connections = require('./connections');
const config = require('./config');

const userDao = {
    SELECT: async (callback) => {
        if (!config.open) {
            return;
        }
        try {
            connections.pool.getConnection((err, connection) => {
                if (err) {connection.release();throw err;}
                connection.query('SELECT * FROM user', (error, results, fields) => {
		    console.log(results);
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
        if (!config.open) {
            return;
        }
        try {
            connections.pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(`INSERT INTO user VALUES ('${userid}')`, (error, results, fields) => {
                    //console.log(`INSERT INTO user VALUES ('${userid}')`);
                    //console.log(results);
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
