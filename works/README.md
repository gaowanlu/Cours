# works.js

一个使用解释器构建轻便的nodejs服务的框架

## 安装

```bash
npm install works.js
```

## 开发者文档

### 快速开始

node环境支持

* 请使用支持ES7 解释器的node版本 如 v16.13.1
* 或者将您的项目使用babel转译

配置您的works.js在您的项目根目录下

```json
{
    "port":5554,
    "ssl":{
        "open":false,
        "cert":"/.ssl/one.pem",
        "pem":"/.ssl/key.pem"
    }
}
```

创建您的控制器

```js
const Works = require('works.js');

@Works.routes
class UserController {
    @Works.route("/user/:id")
    @Works.method(["PUT"])
    async user(req, res, context) {
        console.log("欢迎访问work.js /user");
        console.log(context);
        res.end();
    }
}
//创建routes实例
const userController = new UserController();
```

### @Works.routes

在works.js中使用class自定义routes组件，并需要手动创建关于它的一个实例、在其内可以使用@Works.route(path)来自定义方法

### @Works.route(path)

`route方法永远使用async`

在works.js中工作以用户自定义的方法为单位、使用@Works.route(path)指定的方法、当path被匹配到时此方法将会被触发
使用 [route-recognizer](https://github.com/tildeio/route-recognizer) 作为works.js的路由管理工具、如需了解更多路由匹配规则请查看它

```js
const Works=require('works.js');
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
```

### @Works.method()

请求Method控制
works.js提供了限制request的Method的修饰器
使用方法

* @Works.method(string) 指定method
    ```js
    @Works.method("GET")
    ```
* @Works.method() 允许全部method
    ```js
    @Works.method()
    ```
* @Works.method([string]) 允许一系列method
    ```js
    @Works.method(["GET","PUT","POST"])
    ```

### Works.exec(path,request,response)

当path匹配多个任务时、将会按照顺序全部执行、如果您只限于业务开发无需关注此接口  
因为works.js集成了http server、会根据路由代理执行相应任务

* path为请求的要匹配的路径
* request为http server所接受到的Request对象
* response为http server所接收到的Request对象

## 关于babel

works.js开发使用了ES7等高级特性、因此您在开发中也应该使用babel进行node对解释器的支持

## 计划

* [x] 集成server
* [x] 完善method机制
* [x] 引入works.json配置文件
* [ ] session 也许在此环境下提供session机制并不是一件好事、视情况而定吧
* [ ] 拦截器机制
* [ ] 服务层
* [ ] DAO解决方案

## 开源协议

MIT

## 联系我们

邮箱 heizuboriyo@gmail.com
