const Works = require('../index.js');

@Works.routes
class Routes {
    @Works.route("/")
    @Works.method(["GET", "POST"])
    async index(req, res, context) {
        console.log("欢迎使用works.js");
    }
}

const route = new Routes();
module.exports = route;