const mysql = require('mysql2');

function connections() {
    return () => {
        const pool = mysql.createPool({
            connectionLimit: 20,
            host: 'localhost',
            user: 'cours',
            password: 'cours',
            database: 'cours'
        });
        return pool;
    }
}

const pool = connections()();

module.exports = {
    pool
};
