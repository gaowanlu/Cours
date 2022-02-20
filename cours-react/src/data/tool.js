let x = [1, 2, 3, 4];
const [a, b, c] = x;
console.log([a, b, c]); //[1,2,3]

//迭代器
console.log(x[Symbol.iterator]); //[Function: values]
//数组默认有实现迭代器

//构造迭代器
let iterator = x[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
/**
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: undefined, done: true }
 */

//迭代器是从头向后迭代、如果迭代器使用时中间插入了新的元素只要在迭代器或之后则迭代器也会做出变化

//类迭代器接口,方法实现
class Foo {
    [Symbol.iterator]() {
        return {
            next() {
                return {
                    done: false,
                    value: 'foo'
                }
            }
        }
    }
}
let f = new Foo();
console.log(f[Symbol.iterator]); //[Function: [Symbol.iterator]]


//自定义迭代器
class Counter {
    constructor(limit) {
        this.count = 1;
        this.limit = limit;
    }
    next() {
            if (this.count <= this.limit) {
                return {
                    done: false,
                    value: this.count++
                };
            } else {
                return {
                    done: true,
                    value: undefined
                };
            }
        }
        [Symbol.iterator]() {
            return this;
        }
}
let counter = new Counter(3);
for (let i of counter) {
    console.log(i); //1 2 3
}

//可以利用闭包 返回多个迭代器
/*
[Symbol.iterator](){
    let count=1,limit=this.limit;
    return {
    next(){
    
    }
    }
}
*/


//提前终止迭代器 hook
//当在使用for of 时可能会提前结束 使用 break
//提前结束时 会自动调用 迭代器的return方法
class T {
    [Symbol.iterator]() {
        return {
            next() {
                return {
                    done: false
                };
            },
            return () {
                console.log("提前终止迭代器");
                return {
                    done: true
                };
            }
        }
    }
}
let t = new T();
for (let i of t) {
    break; //提前终止迭代器
}

counter = '121';
d = {
    [c]: '121'
}

function TT() {
    this.a = 122;
}
TT.prototype.name = 'TT';
t = new TT();
console.log(t);
console.log("t.name", t.name); //TT
console.log(t.__proto__); //{ name: 'TT' }
console.log(t.__proto__.constructor); //[Function: TT]
let q = new t.__proto__.constructor(); //TT { a: 122 }
console.log(q);
console.log(t.__proto__.__proto__); //[Object: null prototype] {}
console.log(t.__proto__.__proto__.__proto__); //null
q = t.__proto__.__proto__.constructor();
console.log(typeof q); //Object

function RR() {
    this.name = () => {
        console.log('hello');
        this.__proto__.name(); //pro name
    }
}
RR.prototype.name = function () {
    console.log("pro name");
}
let rr = new RR();
rr.name();

Object.prototype.gaowanlu = function () {
    console.log("高万禄" + this.toString());
}
x = new String("2");
x.gaowanlu(); //gaowanlu
'dsvfdvd'.gaowanlu(); //gaowanlu

console.log(('gaowanlu' in x)); //true
console.log(Object.hasOwnProperty("gaowanlu")); //false

console.log(Object.getOwnPropertySymbols(x)); //[]
console.log(Object.getOwnPropertyDescriptors(x));


function PP() {
    this.value = 'ewew';
}
PP.prototype.name = function () {
    console.log(this.value); //这里的this是谁 ？ 谁调用的name谁就是this
    //this.name();//p.__proto__.name();
}
let p = new PP();
p.name(); //ewew 里的this是p




//原型链继承
function A() {

}
A.prototype.helloa = function () {
    console.log("A");
}

function B() {

}
B.prototype = new A();
B.prototype.hellob = function () {
    console.log("B");
}
e = new B();
e.helloa(); //A
e.hellob(); //B
//重写
B.prototype.helloa = function () {
    console.log("B");
    //在此调用父类的方法
    this.__proto__.__proto__.helloa(); //A
}
e.helloa();
//B
//A


//组合继承==>盗用构造函数 同时使用 原型链继承
function AA(say) {
    this.say = say;
}
AA.prototype.name = function () {
    console.log("AA");
}

function BB() {
    AA.call(this, "HELLO");
}
//e.name(); e.name is not a function
BB.prototype = new AA();
e = new BB();
e.name();
console.log(e); //BB { name: 'HELLO' }



//原型式继承
//主要用于在多个对象中共享内容 不同的对象共享同一个__proto__
//Object.create();提供了相应的功能
function K(object) {
    function t() {

    }
    t.prototype = object;
    return new t();
}
x = {
    name: 'x'
}
l = K(x);
console.log(l.name); //x
m = K(x);
console.log(m.name); //x
console.log(m.__proto__); //{ name: 'x' }


class OO {
    constructor() {
        this.O = '1';
    }
    static hello() {
        console.log("HELLO");
    }
}
OO.hello();
x = new OO();
//x.hello();//error

class QQ extends OO {
    constructor() {
        super(); //super只能在派生类和静态方法中使用 \ 调用super()相当于调用super.constructor() \ 会将super()返回的结果给this
        this.Q = '1';
        QQ.q(); //HELLO
    }
    static q() { //在静态方法内才能用super来调用父类的静态方法
        super.hello();
    }
}
OO.hello(); //HELLO
q = new QQ();
console.log(q); //QQ { O: '1', Q: '1' }


//抽象类
class V {
    constructor() {
        if (new.target === V) { //当V被实例化时
            throw new Error('V is a abstruct class');
        }
        if (!this.foo) {
            throw new Error('not found foo method');
        }
    }
}

class G extends V {
    foo() {//实现抽象类的方法

    }
}
g = new G();

//允许继承内置的引用类型 如Array等