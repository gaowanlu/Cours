const RouteRecognizer = require('route-recognizer');
const serverConfig = require('./serverConfig');
const initStaticRoute = require('./initStaticRoute');
const staticRoute = require('./staticRoute');

/**
 * Used to construct Works instances
 * @returns Returns a Works instance object
 */
function Works(config) {

    this.$server = serverConfig(config.port, config.ssl, this);

    //Task Routing Manager
    this.router = new RouteRecognizer();

    //Interceptor Route Manager
    this.filterRouter = new RouteRecognizer();

    //Static Route Manager
    this.staticRouter = new RouteRecognizer();
    //file path mapping route path
    this.staticPathMap = new Map();

    //Used by a function to find its corresponding routes instance
    this.routesFinder = new WeakMap();

    /**
     * @Works.route interpreter
     * @param {string} path route path
     * @returns 
     */
    this.route = (path) => {
        return (target, name, descriptor) => {
            this.$addRoute(path, descriptor.value, name, target);
        }
    };

    /**
     * There are two routers, one is responsible
     * for task triggering, and the other is responsible
     * for executing the task bound to the filter before the task starts.
     * @param {*} path 
     */
    this.filter = (path) => {
        return (target, name, descriptor) => {
            this.$addFilterRoute(path, descriptor.value, name, target);
        }
    }

    /**
     * add route to router
     * @param {string} path route path
     * @param {function} func handler function
     * @param {string} name method name
     * @param {object} target routes instance
     */
    this.$addRoute = (path, func, name, target) => {
        this.$worksCheck(target);
        this.routesFinder.set(func, {
            target,
            name
        });
        //add new route to router
        this.router.add([{
            path,
            handler: func
        }], {
            as: name
        });
    };

    /**
     * Add route to filterRouter
     * @param {string} path interception path
     * @param {*} func handler function
     * @param {*} name method name
     * @param {*} target routes instance
     */
    this.$addFilterRoute = (path, func, name, target) => {
        //Intercept Route and task Route share a routesFinder
        this.$worksCheck(target);
        this.routesFinder.set(func, {
            target,
            name
        });
        //Add new route to filterRouter
        this.filterRouter.add([{
            path,
            handler: func
        }], {
            as: name
        });
    };

    /**
     * add static routes
     * @param {[{filePath,routePath},]} staticRoutes from initStaticRoute 
     */
    this.$addStaticRoute = (staticRoutes) => {
        staticRoutes.forEach((item, index, arr) => {
            console.log(item);
            this.staticPathMap.set(item.routePath, item.filePath);
            //添加到staticRouter
            this.staticRouter.add([{
                path: item.routePath,
                handler: (req, res, context) => {
                    staticRoute(req, res, context, item.filePath);
                }
            }]);
        });
    }

    /**
     * Provide the path works requested by the user to process it, and the execution strategy is to execute all matching tasks
     * @param {string} path 
     * @param {HttpRequest} req 
     * @param {HttpResponse} res 
     */
    this.exec = async (path, req, res) => {

        /**
         * task refusal
         * @param {HttpResponse} res 
         */
        function rejectToDo(res) {
            //No corresponding resource returns 404
            res.writeHead(404, {
                'Content-Length': 0,
                'Content-Type': 'text/plain'
            });
            res.end(); //Must be closed There may be no match
        }

        //First, you need to execute the interceptor and get the interceptor that needs to be executed.
        const filterResult = this.filterRouter.recognize(path);

        if (filterResult) {
            //iterate over all interceptors
            for (let i = 0; i < filterResult.length; i++) {
                /*As long as there is an interceptor that returns a class value in the middle, 
                the processing of the request will be terminated in advance,
                and if it returns true, 
                the execution of the next interceptor will be performed.*/
                //Get the routes instance where the method is located
                const {
                    target,
                    name
                } = this.routesFinder.get(filterResult[i].handler);
                let allowedMethods = target.$works.routeMethods.get(filterResult[i].handler);
                //If no method decorator is used, all methods are allowed by default
                if (!allowedMethods) {
                    allowedMethods = ['*'];
                }
                //Check if allowed
                if (allowedMethods.includes('*') || allowedMethods.includes(req.method.toUpperCase())) {
                    let context = filterResult[i];
                    //Execute interceptor tasks
                    let execResult = await target[name].bind(target)(
                        req,
                        res,
                        context
                    );
                    if (!execResult) { //Returning a false value will stop processing this request directly
                        return res.end(); //stop the process about this request 
                    }
                }
            }
        }

        //Match static router
        const staticResult = this.staticRouter.recognize(path);
        if (staticResult && staticResult.length === 1) {
            //find filePath
            const filePath = this.staticPathMap.get(path);
            if (filePath) {
                return staticResult[0].handler(req, res, staticResult[0], filePath); //returning if match static route successfully
            }
        }

        //After the interceptor is executed, the matching task from the router will be performed
        const result = this.router.recognize(path);

        if (result) {
            for (let i = 0; i < result.length; i++) {
                //Get the routes instance where the method is located
                const {
                    target,
                    name
                } = this.routesFinder.get(result[i].handler);
                let allowedMethods = target.$works.routeMethods.get(result[i].handler);
                //If no method decorator is used, all methods are allowed by default
                if (!allowedMethods) {
                    allowedMethods = ['*'];
                }
                //Check if allowed
                if (allowedMethods.includes('*') || allowedMethods.includes(req.method.toUpperCase())) {
                    let context = result[i];
                    await target[name].bind(target)(
                        req,
                        res,
                        context
                    );
                } else { //not allowed
                    rejectToDo(res);
                }
            }
        } else {
            rejectToDo(res);
        }
    };

    /**
     * Routes is used
     for processing Routes Class
     * @param {*} CLASS 
     */
    this.routes = (CLASS) => {
        //The target here is the class itself
        //console.log(CLASS);
    };

    /**
     * Method limits the processing of HTTP methods accepted by the Route
     * function
     * @param {string[]} methodList 
     * @returns 
     */
    this.method = (methodList) => {
        return (target, name, descriptor) => {
            let methods = [];
            if (Array.isArray(methodList)) {
                methods = methodList;
            } else if (typeof methodList === "string") {
                methods.push(methodList);
            } else {
                methods.push("*"); //All methods are accepted
            }
            //Make the method all uppercase
            methods.forEach((item, index, arr) => {
                arr[index] = item.toUpperCase();
            })
            //Store it in the routes context of the response, i.e. the routesInstance.$works object
            this.$worksCheck(target);
            target.$works.routeMethods.set(target[name], methods);
        }
    };

    /**
     * Check
     * if there is a works context in the routes instance $works
     * if not create it
     * @param {object} target routes instacne
     */
    this.$worksCheck = (target) => {
        if (target.$works === undefined) {
            target.$works = {
                routeMethods: new WeakMap()
            };
        }
    };

    //load static dir and add route to handler router
    initStaticRoute(this);

    return this;
}
module.exports = Works;