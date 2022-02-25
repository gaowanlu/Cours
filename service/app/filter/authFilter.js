const basicAuth = require('basic-auth');
const auth = require('../../utils/auth');
const contextPatchRequest = require('../../utils/contextPatchRequest');
/**
 * token 身份过滤器
 * @param {*} req 
 * @param {*} res 
 */
function authFilter(next) {
    return (req, res) => {
        const token = basicAuth(req);
        if (!token || token.name === 'null') {
            console.log("没有token");
        }
        console.log("拦截器获取token=", token.name);
        console.log("拦截器执行");
        let decoded = auth.decode(token.name);
        console.log("decoded", decoded);
        if (decoded === null) {
            decoded = {
                userid: 'none',
                password: 'none'
            };
            res.end(JSON.stringify({
                userid: decoded.userid,
                password: decoded.password
            }));
            return;
        };
        console.log("store", {
            userid: decoded.userid,
            password: decoded.password
        });
        contextPatchRequest(req).auth = {
            userid: decoded.userid,
            password: decoded.password
        }
        next(req, res); //下一步操作
    }
}
module.exports = authFilter;