const Works = require('../lib/index.js');

@Works.routes
class UserController {
    @Works.route("/user/:id")
    @Works.method(["GET"])
    async user(req, res, context) {
        //console.log(req);
        console.log("/user", req.method);
        console.log("context", context);
        res.write("view /user/*");
        res.end();
        return;
    }
}

const userController = new UserController();

module.exports = userController;