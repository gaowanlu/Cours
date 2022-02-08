const fs = require("fs");

const testJSON = fs.readFileSync('service/test1.json', 'utf8');

/*测试账号*/
const testAccount = {
    '0': '5ffd89c446aa010bed7cfafa35d4cb32c7219a915eef219baf1254ac162a457010356172626b567eb77fa9522c7cf9e9ce9c58dd7476a67a479e927ec371640cc06ad52531ce11fd0a5f47fad2b6ce7243166a0ad3426261c48305acc28736210403d3e30f0bc38dd0fe66edeb1847b90a3773768aa2edde21518e5f75b35ec4',
    match(username, password) {
        if (this.hasOwnProperty(username) && this[username] === password) {
            return true;
        }
        return false;
    }
};

/**
 * 
 * @param
 function ({sctCourse}) callback 代理服务回调
 * @param string username 学号
 * @param string password 密码
 * @return boolean true:返回结果 false:非进行测试
 */
function webVpnServiceTest(callback, username, password) {
    if (testAccount.match(username, password)) {
        //请求响应
        callback(JSON.parse(testJSON).data);
        return true;
    }
    return false;
}

module.exports = webVpnServiceTest;