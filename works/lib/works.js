'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RouteRecognizer = require('route-recognizer');
var serverConfig = require('./serverConfig');
var initStaticRoute = require('./initStaticRoute');
var staticRoute = require('./staticRoute');

/**
 * Used to construct Works instances
 * @returns Returns a Works instance object
 */
function Works(config) {
    var _this = this;

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
    this.route = function (path) {
        return function (target, name, descriptor) {
            _this.$addRoute(path, descriptor.value, name, target);
        };
    };

    /**
     * There are two routers, one is responsible
     * for task triggering, and the other is responsible
     * for executing the task bound to the filter before the task starts.
     * @param {*} path 
     */
    this.filter = function (path) {
        return function (target, name, descriptor) {
            _this.$addFilterRoute(path, descriptor.value, name, target);
        };
    };

    /**
     * add route to router
     * @param {string} path route path
     * @param {function} func handler function
     * @param {string} name method name
     * @param {object} target routes instance
     */
    this.$addRoute = function (path, func, name, target) {
        _this.$worksCheck(target);
        _this.routesFinder.set(func, {
            target: target,
            name: name
        });
        //add new route to router
        _this.router.add([{
            path: path,
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
    this.$addFilterRoute = function (path, func, name, target) {
        //Intercept Route and task Route share a routesFinder
        _this.$worksCheck(target);
        _this.routesFinder.set(func, {
            target: target,
            name: name
        });
        //Add new route to filterRouter
        _this.filterRouter.add([{
            path: path,
            handler: func
        }], {
            as: name
        });
    };

    /**
     * add static routes
     * @param {[{filePath,routePath},]} staticRoutes from initStaticRoute 
     */
    this.$addStaticRoute = function (staticRoutes) {
        staticRoutes.forEach(function (item, index, arr) {
            console.log(item);
            _this.staticPathMap.set(item.routePath, item.filePath);
            //添加到staticRouter
            _this.staticRouter.add([{
                path: item.routePath,
                handler: function handler(req, res, context) {
                    staticRoute(req, res, context, item.filePath);
                }
            }]);
        });
    };

    /**
     * Provide the path works requested by the user to process it, and the execution strategy is to execute all matching tasks
     * @param {string} path 
     * @param {HttpRequest} req 
     * @param {HttpResponse} res 
     */
    this.exec = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, req, res) {
            var rejectToDo, filterResult, i, _routesFinder$get, target, name, allowedMethods, context, execResult, staticResult, filePath, result, _i, _routesFinder$get2, _allowedMethods, _context;

            return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            rejectToDo = function rejectToDo(res) {
                                //No corresponding resource returns 404
                                res.writeHead(404, {
                                    'Content-Length': 0,
                                    'Content-Type': 'text/plain'
                                });
                                res.end(); //Must be closed There may be no match
                            };

                            /**
                             * task refusal
                             * @param {HttpResponse} res 
                             */


                            //First, you need to execute the interceptor and get the interceptor that needs to be executed.
                            filterResult = _this.filterRouter.recognize(path);

                            if (!filterResult) {
                                _context2.next = 18;
                                break;
                            }

                            i = 0;

                        case 4:
                            if (!(i < filterResult.length)) {
                                _context2.next = 18;
                                break;
                            }

                            /*As long as there is an interceptor that returns a class value in the middle, 
                            the processing of the request will be terminated in advance,
                            and if it returns true, 
                            the execution of the next interceptor will be performed.*/
                            //Get the routes instance where the method is located
                            _routesFinder$get = _this.routesFinder.get(filterResult[i].handler), target = _routesFinder$get.target, name = _routesFinder$get.name;
                            allowedMethods = target.$works.routeMethods.get(filterResult[i].handler);
                            //If no method decorator is used, all methods are allowed by default

                            if (!allowedMethods) {
                                allowedMethods = ['*'];
                            }
                            //Check if allowed

                            if (!(allowedMethods.includes('*') || allowedMethods.includes(req.method.toUpperCase()))) {
                                _context2.next = 15;
                                break;
                            }

                            context = filterResult[i];
                            //Execute interceptor tasks

                            _context2.next = 12;
                            return target[name].bind(target)(req, res, context);

                        case 12:
                            execResult = _context2.sent;

                            if (execResult) {
                                _context2.next = 15;
                                break;
                            }

                            return _context2.abrupt('return', res.end());

                        case 15:
                            i++;
                            _context2.next = 4;
                            break;

                        case 18:

                            //Match static router
                            staticResult = _this.staticRouter.recognize(path);

                            if (!(staticResult && staticResult.length === 1)) {
                                _context2.next = 23;
                                break;
                            }

                            //find filePath
                            filePath = _this.staticPathMap.get(path);

                            if (!filePath) {
                                _context2.next = 23;
                                break;
                            }

                            return _context2.abrupt('return', staticResult[0].handler(req, res, staticResult[0], filePath));

                        case 23:

                            //After the interceptor is executed, the matching task from the router will be performed
                            result = _this.router.recognize(path);

                            if (!result) {
                                _context2.next = 42;
                                break;
                            }

                            _i = 0;

                        case 26:
                            if (!(_i < result.length)) {
                                _context2.next = 40;
                                break;
                            }

                            //Get the routes instance where the method is located
                            _routesFinder$get2 = _this.routesFinder.get(result[_i].handler), target = _routesFinder$get2.target, name = _routesFinder$get2.name;
                            _allowedMethods = target.$works.routeMethods.get(result[_i].handler);
                            //If no method decorator is used, all methods are allowed by default

                            if (!_allowedMethods) {
                                _allowedMethods = ['*'];
                            }
                            //Check if allowed

                            if (!(_allowedMethods.includes('*') || _allowedMethods.includes(req.method.toUpperCase()))) {
                                _context2.next = 36;
                                break;
                            }

                            _context = result[_i];
                            _context2.next = 34;
                            return target[name].bind(target)(req, res, _context);

                        case 34:
                            _context2.next = 37;
                            break;

                        case 36:
                            //not allowed
                            rejectToDo(res);

                        case 37:
                            _i++;
                            _context2.next = 26;
                            break;

                        case 40:
                            _context2.next = 43;
                            break;

                        case 42:
                            rejectToDo(res);

                        case 43:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();

    /**
     * Routes is used
     for processing Routes Class
     * @param {*} CLASS 
     */
    this.routes = function (CLASS) {
        //The target here is the class itself
        //console.log(CLASS);
    };

    /**
     * Method limits the processing of HTTP methods accepted by the Route
     * function
     * @param {string[]} methodList 
     * @returns 
     */
    this.method = function (methodList) {
        return function (target, name, descriptor) {
            var methods = [];
            if (Array.isArray(methodList)) {
                methods = methodList;
            } else if (typeof methodList === "string") {
                methods.push(methodList);
            } else {
                methods.push("*"); //All methods are accepted
            }
            //Make the method all uppercase
            methods.forEach(function (item, index, arr) {
                arr[index] = item.toUpperCase();
            });
            //Store it in the routes context of the response, i.e. the routesInstance.$works object
            _this.$worksCheck(target);
            target.$works.routeMethods.set(target[name], methods);
        };
    };

    /**
     * Check
     * if there is a works context in the routes instance $works
     * if not create it
     * @param {object} target routes instacne
     */
    this.$worksCheck = function (target) {
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