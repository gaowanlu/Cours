# works.js

A framework for building lightweight nodejs services using javascript decorators, we provide solutions for decorator-based control layers

## quick start

1、Install

```bash
    npm install works.js
```

2、node environment support

* Please use a version of node that supports ES7 decorator syntax
* Or use babel for your project so that it supports ES7 decorator syntax
* Use the [works-create-app](https://github.com/gaowanlu/works-create-app) project template

```bash
    git clone https://github.com/gaowanlu/works-create-app.git
```

3、Configure your works.json in your project root directory

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

4、Create your controller

```js
const Works = require('works.js');

@Works.routes
class UserController {
    @Works.route("/user/:id")
    @Works.method(["PUT"])
    async user(req, res, context) {
        console.log("Welcome to work.js /user");
        console.log(context);
        res.end();
    }
}
//Create a routes instance
const userController = new UserController();
```

## decorator

### @Works.routes

Use class to customize the routes component in works.js, and you need to manually create an instance of it, in which you can use @Works.route(path) to customize the method

### @Works.route(path)

`route methods always use async`

Work in works.js is based on user-defined methods, using the method specified by @Works.route(path), this method will be triggered when the path is matched
Use [route-recognizer](https://github.com/tildeio/route-recognizer) as the routing management tool of works.js, please check it for more route matching rules

```js
const Works=require('works.js');
@Works.routes
class UserController {
    @Works.route("/user/:id")
    @Works.method(["PUT"])
    async user(req, res, context) {
        console.log("work.js /user");
        console.log(context);
    }
}

const userController = new UserController();
```

### @Works.method()

Request Method control
works.js provides a decorator that restricts the Method of the request
Instructions

* @Works.method(string) specify method
    ```js
    @Works.method("GET")
    handler(req,res,context){
        res.end();
    }
    ```
* @Works.method() allow all methods
    ```js
    @Works.method()
    handler(req,res,context){
        res.end();
    }
    ```
* @Works.method([string]) allows a series of methods
    ```js
    @Works.method(["GET","PUT","POST"])
    handler(req,res,context){
        res.end();
    }
    ```
* Use @Works.route but not @Works.method
    will indicate that all methods are allowed

### @Works.filter(string)

Interceptor, which now matches the interceptor before task matching. When the interceptor returns true, it means that it is allowed to pass, and false means that it is not allowed to pass. Filter is actually a special route, which is executed in the task route and we call it filter route

```js
@Works.routes
class MyFilter{
    @Works.filter("/user/*")
    @Works.method(["GET","POST"])//Intercept when the path matches and when it is a GET or POST request
    async user(req,res,context){
        //return true;//Indicates permission to pass
        return false;//reject
    }
}
```

### this in route and filter methods

Do not use this in route and filter. The works convention is to use the following form to use the routes itself. This in the filter and route methods does not point to the routes instance.

* in filter method

```js
@Works.routes
class Routes {
    constructor() {
        this.routes = {
            name: 'MyFilter'
        }
    }

    @Works.filter("/user/*")
    @Works.method(["GET", "POST"])
    async user(req, res, context) {
        console.log("filter exec" + " Routes.user /user/*");
        console.log("routes", route);//routes Routes { routes: { name: 'MyFilter' } }
        return true;
    }
}

const route = new Routes();
module.exports = route;
```

* The same is true in the @works.route method

## About babel

The development of works.js uses advanced features such as ES7, so you should also use babel to support node's interpreter in development

1、The following is a brief configuration

```shell
npm install -D babel-polyfill babel-preset-es2015 babel-preset-stage-3 babel-register babel-cli babel-plugin-transform-decorators-legacy
```

2、Configure .babelrc in the project root directory

```json
{
    "presets":["es2015","stage-3"],
    "plugins":["transform-decorators-legacy"]
}
```

3、configure package.json
For more information on how to use babel, see the babel-cli documentation

```json
  "scripts": {
    "build":"babel index.js --out-file main.js"
  },
```

4、run

```bash
npm run build
node main.js
```

## License

MIT

## contact us

email heizuboriyo@gmail.com
