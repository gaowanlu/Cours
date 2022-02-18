const config = {
    DBOpen: true, //是否开启数据库使用
    DBInfo:{
    	connectionLimit: 20,
        host: 'localhost',
        user: 'cours',
        password: 'cours',
        database: 'cours'
    },
    HttpsOpen:true,
    SSLPath:{
	key:'SSL/key.pem',
	cert:'SSL/one.pem'
    },
    Ports:{
	talk:5558,
	proxy:5557
    }
};
module.exports = config;
