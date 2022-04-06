const RouteRecognizer = require('route-recognizer');
const checkSession = require('./session');
const serverConfig = require('./serverConfig');
/**
 * 用于构造Works实例
 * @returns 返回一个Works实例对象
 */
function Works(port) {
        this.$server=serverConfig(port,this);
        //路由管理器
        this.router=new RouteRecognizer();
        //用于函数找到其相应的routes实例
        this.routesFinder=new WeakMap();
        /*@Works.route(path) 用于构建路由项
         *@param {string} path URL路径匹配
         * */
        this.route=(path) => {
            return (target, name, descriptor) => {
                this.$addRoute(path, target[name], name, target);
            }
        };

        /*
         * 添加path到routeMap以及urlTree的修改
         * @param {string} path works路径
         * @param {function} func 当匹配到path时使用func进行处理
         * */
        this.$addRoute=(path, func, name, target) => {
            this.$worksCheck(target);
            this.routesFinder.set(func, target);
            //添加新的route到router
            this.router.add([{
                path,
                handler: func
            }], {
                as: name
            });
        };

        /*
         *提供用户请求的path works对其进行处理
         *执行策略为将匹配的所有任务全部执行
         * */
        this.exec=async (path, req, res) => {
            console.log("exec "+path);
            checkSession(req);
            //从router中进行匹配
            const result = this.router.recognize(path);
            if (result) {
                for (let i = 0; i < result.length; i++) {
                    let context = result[i];
                    await result[i].handler(
                        req,
                        res,
                        context
                    );
                    //获取方法所在routes实例
                    const target = this.routesFinder.get(result[i].handler);
                    const allowedMethods = target.$works.routeMethods.get(result[i].handler);
                    //console.log("exec allowedMethods", allowedMethods);
                }
                res.end();//必须关闭 可能存在没有匹配到的情况
            }
        };

        /*
         *Routes
         *用于对Routes Class的处理
         * */
        this.routes= (CLASS) => {
            //这里的target为其class本身
            console.log(CLASS);
        },

        /*
         *Method 闲置处理Route函数所接受的HTTP Method
         * */
        this.method=(methodList) => {
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
                this.$worksCheck(target);
                target.$works.routeMethods.set(target[name], methods);
            }
        };

        this.$worksCheck=(target) => {
            if (target.$works === undefined) {
                target.$works = {
                    routeMethods: new WeakMap()
                };
            }
        };

        return this;
}
module.exports = Works;

