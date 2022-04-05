const RouteRecognizer = require('route-recognizer');
/**
 * 用于构造Works实例
 * @returns 返回一个Works实例对象
 */
function works() {
    const Works = {
        router: new RouteRecognizer(),
        routesFinder: new WeakMap(),
        /*@Works.route(path) 用于构建路由项
         *@param {string} path URL路径匹配
         * */
        route: (path) => {
            return (target, name, descriptor) => {
                Works.$addRoute(path, target[name], name, target);
            }
        },

        /*
         * 添加path到routeMap以及urlTree的修改
         * @param {string} path works路径
         * @param {function} func 当匹配到path时使用func进行处理
         * */
        $addRoute: (path, func, name, target) => {
            Works.$worksCheck(target);
            Works.routesFinder.set(func, target);
            //添加新的route到router
            Works.router.add([{
                path,
                handler: func
            }], {
                as: name
            });
        },

        /*
         *提供用户请求的path works对其进行处理
         *执行策略为将匹配的所有任务全部执行 
         * */
        exec: async (path, req, res) => {
            //从router中进行匹配
            const result = Works.router.recognize(path);
            if (result) {
                for (let i = 0; i < result.length; i++) {
                    let context = result[i];
                    await result[i].handler(
                        req,
                        res,
                        context
                    );
                    //获取方法所在routes实例
                    const target = Works.routesFinder.get(result[i].handler);
                    const allowedMethods = target.$works.routeMethods.get(result[i].handler);
                    console.log("exec allowedMethods", allowedMethods);
                }
            }
        },

        /*
         *Routes
         *用于对Routes Class的处理
         * */
        routes: (CLASS) => {
            //这里的target为其class本身
            console.log(CLASS);
        },

        /*
         *Method 闲置处理Route函数所接受的HTTP Method
         * */
        method: (methodList) => {
            return (target, name, descriptor) => {
                let methods = [];
                if (Array.isArray(methodList)) {
                    methods = methodList;
                } else if (typeof methodList === "string") {
                    methods.push(methodList);
                } else {
                    methods.push("*"); //所有方法都接受
                }
                //forEach method
                methods.forEach(item => {
                    console.log("Allow Method", item);
                });
                //将method全部变为大写
                methods.forEach((item, index, arr) => {
                    arr[index] = item.toUpperCase();
                })
                //将其存入响应的routes上下文 即routesInstance.$works对象内
                Works.$worksCheck(target);
                target.$works.routeMethods.set(target[name], methods);
            }
        },

        $worksCheck: (target) => {
            if (target.$works === undefined) {
                target.$works = {
                    routeMethods: new WeakMap()
                };
            }
        }
    }
    return Works;
}
module.exports = works;