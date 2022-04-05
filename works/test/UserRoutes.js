const Works = require('../lib/index.js');

@Works.routes
class UserController {
    @Works.route("/user/:id")
    @Works.method(["PUT"])
    async user(req, res, context) {
        console.log("欢迎访问work.js /user");
        console.log(context);
    }
}

const userController = new UserController();

module.exports = userController;