var util = require('util');

// 1. call
function Parent() {
    this.wife = 'xxx';
}
Parent.prototype.drink = function () {
    console.log('喝酒');
}
function Child() {
    Parent.call(this); // 将parent函数中的this改变成child的实例
    // 只继承私有属性
}

// 2. new
function Parent() {
    this.wife = 'xxx';
}
Parent.prototype.drink = function () {
    console.log('喝酒');
}
function Child() {

}
Child.prototype = new Parent(); // 由于实例既有私有又有公有
var child = new Child();    // 儿子可以通过原型链找到 父亲公有和私有的方法

// 3. 继承公有属性
function Parent() {
    this.wife = 'xxx';
}
Parent.prototype.drink = function () {
    console.log('喝酒');
}
function Child() {

}
Child.prototype.__proto__ = Parent.prototype;
var child = new Child();
child.drink();
// 通过原型链连接父亲的原型

// 4. Object.create() es5的继承 只继承公有属性
function Parent() {
    this.wife = 'xxx';
}
Parent.prototype.drink = function () {
    console.log('喝酒');
}
function Child() {

}
Child.prototype = Object.create(Parent.prototype);
var child = new Child();
child.drink();

// 自己实现 Object.create方法
function create(proto) {
    var Fn = function () {};    // 先构造一个空函数 函数没有公有 也没有私有
    Fn.prototype = proto;   // 函数的公有属性 变成父亲的公有属性
    return new Fn;  //  new出来的实例 只有公有的方法
}

// 5. setPrototypeOf es6继承
function Parent() {
    this.wife = 'xxx';
}
Parent.prototype.drink = function () {
    console.log('喝酒');
}
function Child() {

}
Object.setPrototypeOf(Child.prototype, Parent.prototype);
// 原理 Child.prototype.__proto__ = Parent.prototype
var child = new Child();
child.drink();

// 6. node 中的继承用 util模块的 util.inherits() 只能继承公有属性、方法
util.inherits(Child, Parent);