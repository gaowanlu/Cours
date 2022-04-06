const Works = require('../lib/index.js');

@Works.routes
class UserController {
    @Works.route("/user/*")
    @Works.method(["PUT"])
    async user(req, res, context) {
        //console.log(req);
        console.log("/user",req.method);
        //console.log(context);
        res.write("view /user/*");
        res.end();
    }
}

const userController = new UserController();

module.exports = userController;
