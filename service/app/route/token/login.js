const Auth = require('../../../utils/auth');
const requestJSON = require('../../../utils/requestJson');

async function login(req, res) {
    if (req.method !== 'POST') {
        res.end();
    }
    let json = await requestJSON.jsonReceiver(req);
    console.log(json);
    if (json.token) {
        console.log(json.token);
        if (!Auth.verifyToken(json.token)) {
            console.log("token 无效");
        } else {
            console.log("token 有效");
        }
    }
    if (json.username && json.password) {
        const token = Auth.generateToken(json.username, json.password);
        res.end(JSON.stringify({
            token
        }));
        console.log("token", token);
    }
    res.end();
}
module.exports = login;