const jwt = require('jsonwebtoken');
const config = require('../coursConfig');

class Auth {
    /**
     * 生成Token
     * @param {string} userid 
     * @param {string} password 
     * @returns 
     */
    static generateToken(userid, password) {
        const token = jwt.sign({
            userid,
            password
        }, config.JWT.secretKey, {
            expiresIn: config.JWT.expiresIn
        });
        return token;
    }

    /**
     * 校验身份token是否有效
     * @param {string} token 
     */
    static verifyToken(token) {
        try {
            jwt.verify(token, config.JWT.secretKey);
            return true;
        } catch (e) {
            if (e.name === 'tokenExpiredError') {
                console.log('token 已过期');
            } else {
                console.log("token 不合法");
            }
            return false;
        }
    }

    /**
     * token解析
     * @param {string} token 
     */
    static decode(token) {
        if (Auth.verifyToken(token)) {
            return jwt.decode(token);
        } else {
            return null;
        }
    }
}

module.exports = Auth;