const Works = require('../../lib/index.js');

@Works.routes
class Routes {
    constructor() {
        this.routes = {
            name: 'MyFilter',
            count: 0
        }
    }

    @Works.filter("/")
    @Works.method(["GET", "POST"])
    async index(req, res, context) {
        console.log("filter exec" + " Routes.index /");
        return true;
    }

    @Works.filter("/*")
    @Works.method(["GET", "POST"])
    async indexAll(req, res, context) {
        console.log("filter exec" + " Routes.index /*");
        return this.index(req, res, context);
    }

    @Works.filter("/user/*")
    @Works.method(["GET", "POST"])
    async user(req, res, context) {
        console.log("filter exec" + " Routes.user /user/*");
        return true;
    }
}

const route = new Routes();
module.exports = route;