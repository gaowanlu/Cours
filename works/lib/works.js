'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RouteRecognizer = require('route-recognizer');
var checkSession = require('./session');
var serverConfig = require('./serverConfig');
/**
 * 用于构造Works实例
 * @returns 返回一个Works实例对象
 */
function Works(port) {
    var _this = this;

    this.$server = serverConfig(port, this);
    //路由管理器
    this.router = new RouteRecognizer();
    //用于函数找到其相应的routes实例
    this.routesFinder = new WeakMap();
    /*@Works.route(path) 用于构建路由项
     *@param {string} path URL路径匹配
     * */
    this.route = function (path) {
        return function (target, name, descriptor) {
            _this.$addRoute(path, target[name], name, target);
        };
    };

    /*
     * 添加path到routeMap以及urlTree的修改
     * @param {string} path works路径
     * @param {function} func 当匹配到path时使用func进行处理
     * */
    this.$addRoute = function (path, func, name, target) {
        _this.$worksCheck(target);
        _this.routesFinder.set(func, target);
        //添加新的route到router
        _this.router.add([{
            path: path,
            handler: func
        }], {
            as: name
        });
    };

    /*
     *提供用户请求的path works对其进行处理
     *执行策略为将匹配的所有任务全部执行
     * */
    this.exec = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, req, res) {
            var result, i, context, target, allowedMethods;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log("exec " + path);
                            checkSession(req);
                            //从router中进行匹配
                            result = _this.router.recognize(path);

                            if (!result) {
                                _context.next = 15;
                                break;
                            }

                            i = 0;

                        case 5:
                            if (!(i < result.length)) {
                                _context.next = 14;
                                break;
                            }

                            context = result[i];
                            _context.next = 9;
                            return result[i].handler(req, res, context);

                        case 9:
                            //获取方法所在routes实例
                            target = _this.routesFinder.get(result[i].handler);
                            allowedMethods = target.$works.routeMethods.get(result[i].handler);
                            //console.log("exec allowedMethods", allowedMethods);

                        case 11:
                            i++;
                            _context.next = 5;
                            break;

                        case 14:
                            res.end(); //必须关闭 可能存在没有匹配到的情况

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();

    /*
     *Routes
     *用于对Routes Class的处理
     * */
    this.routes = function (CLASS) {
        //这里的target为其class本身
        console.log(CLASS);
    },

    /*
     *Method 闲置处理Route函数所接受的HTTP Method
     * */
    this.method = function (methodList) {
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
            _this.$worksCheck(target);
            target.$works.routeMethods.set(target[name], methods);
        };
    };

    this.$worksCheck = function (target) {
        if (target.$works === undefined) {
            target.$works = {
                routeMethods: new WeakMap()
            };
        }
    };

    return this;
}
module.exports = Works;