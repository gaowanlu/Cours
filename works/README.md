# works.js

使用nodejs构建轻便的后端服务，旨在简便业务开发

## Install

```bash
npm install works.js
```

## 开发者文档

### 快速开始

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

/**
 * 模拟请求 这里只是展示我们的原理 
 * 我们在框架中已经配置好了request机制
 * 当然您有权利不使用它们
 */
let request={name: 'request'};
let response={name: 'response'};
Works.exec("/user/743843",request,response);
//使用exec将会执行与其相匹配的@Works.route 方法
//并将request response作为参数调用时进行使用

// 欢迎访问work.js /user
// {
//   handler: [Function: user],
//   params: { id: '743843' },
//   isDynamic: true
// }
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

当path匹配多个任务时、将会按照顺序全部执行

* path为请求的要匹配的路径
* request为http server所接受到的Request对象
* response为http server所接收到的Request对象

## 我们使用的node

v16.13.1

## 计划

* [ ] 集成server
* [ ] 完善method机制
* [ ] session 也许在此环境下提供session机制并不是一件好事、视情况而定吧
* [ ] 拦截器机制
* [ ] 服务层
* [ ] DAO解决方案

## 开源协议

MIT

## 联系我们

邮箱 heizuboriyo@gmail.com
