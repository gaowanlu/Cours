const Works = require('../lib/index.js');

@Works.routes
class Routes {
    @Works.route("/")
    @Works.method(["GET", "POST"])
    async index(req, res, context) {
        //console.log(req);
        console.log("/", req.method);
        console.log("欢迎使用works.js");
        res.write("view /");
        res.end();
        return;
    }
}

const route = new Routes();
module.exports = route;