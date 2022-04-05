"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RouteRecognizer = require('route-recognizer');
/**
 * 用于构造Works实例
 * @returns 返回一个Works实例对象
 */
function works() {
    var _this = this;

    var Works = {
        router: new RouteRecognizer(),
        routesFinder: new WeakMap(),
        /*@Works.route(path) 用于构建路由项
         *@param {string} path URL路径匹配
         * */
        route: function route(path) {
            return function (target, name, descriptor) {
                Works.$addRoute(path, target[name], name, target);
            };
        },

        /*
         * 添加path到routeMap以及urlTree的修改
         * @param {string} path works路径
         * @param {function} func 当匹配到path时使用func进行处理
         * */
        $addRoute: function $addRoute(path, func, name, target) {
            Works.$worksCheck(target);
            Works.routesFinder.set(func, target);
            //添加新的route到router
            Works.router.add([{
                path: path,
                handler: func
            }], {
                as: name
            });
        },

        /*
         *提供用户请求的path works对其进行处理
         *执行策略为将匹配的所有任务全部执行 
         * */
        exec: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, req, res) {
                var result, i, context, target, allowedMethods;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                //从router中进行匹配
                                result = Works.router.recognize(path);

                                if (!result) {
                                    _context.next = 13;
                                    break;
                                }

                                i = 0;

                            case 3:
                                if (!(i < result.length)) {
                                    _context.next = 13;
                                    break;
                                }

                                context = result[i];
                                _context.next = 7;
                                return result[i].handler(req, res, context);

                            case 7:
                                //获取方法所在routes实例
                                target = Works.routesFinder.get(result[i].handler);
                                allowedMethods = target.$works.routeMethods.get(result[i].handler);

                                console.log("exec allowedMethods", allowedMethods);

                            case 10:
                                i++;
                                _context.next = 3;
                                break;

                            case 13:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function exec(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            };
        }(),

        /*
         *Routes
         *用于对Routes Class的处理
         * */
        routes: function routes(CLASS) {
            //这里的target为其class本身
            console.log(CLASS);
        },

        /*
         *Method 闲置处理Route函数所接受的HTTP Method
         * */
        method: function method(methodList) {
            return function (target, name, descriptor) {
                var methods = [];
                if (Array.isArray(methodList)) {
                    methods = methodList;
                } else if (typeof methodList === "string") {
                    methods.push(methodList);
                } else {
                    methods.push("*"); //所有方法都接受
                }
                //forEach method
                methods.forEach(function (item) {
                    console.log("Allow Method", item);
                });
                //将method全部变为大写
                methods.forEach(function (item, index, arr) {
                    arr[index] = item.toUpperCase();
                });
                //将其存入响应的routes上下文 即routesInstance.$works对象内
                Works.$worksCheck(target);
                target.$works.routeMethods.set(target[name], methods);
            };
        },

        $worksCheck: function $worksCheck(target) {
            if (target.$works === undefined) {
                target.$works = {
                    routeMethods: new WeakMap()
                };
            }
        }
    };
    return Works;
}
module.exports = works;