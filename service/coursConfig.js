//Cours Service Config Info Object
const config = {
    //服务是否使用数据库
    DBOpen: true, //是否开启数据库使用
    //mysql2 config info
    DBInfo: {
        connectionLimit: 20,
        host: 'localhost',
        user: 'cours',
        password: 'cours',
        database: 'cours'
    },
    //是否使用Https
    HttpsOpen: true,
    //SSL路径
    SSLPath: {
        key: 'SSL/key.pem',
        cert: 'SSL/one.pem'
    },
    //服务器端口
    Ports: {
        talk: {
            port: 5558,
            AccessControlAllowOrigin: '*'
        },
        proxy: {
            port: 5557,
            AccessControlAllowOrigin: '*',
            AccessControlAllowMethods: 'DELETE,PUT,POST,GET,OPTIONS',
        }
    },
    //JWT Config
    JWT: {
        secretKey: '&#@*$#yfgue&$*@^#&gyvy*%&$)@JKFBWBCR*&RF#*HF*E#*',
        expiresIn: 24 * 60 * 60
    }
};
module.exports = config;