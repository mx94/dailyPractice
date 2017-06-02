function Girl() {
    this._events = {};
}

/**
 * 将事件名和回调函数组成一个对象，并且是一对多的关系
 * @param eventName 事件名
 * @param callback 回调函数
 */
Girl.prototype.on = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};

// 通过发射的事件名 将数组里的每一项执行
Girl.prototype.emit = function (eventName, ...others) {
    // 1. [].slice.call(arguments, 1);
    // 2. Array.from(arguments).slice(1)
    // 3. (eventName, ...others)
    if (this._events[eventName]) {
        this._events[eventName].forEach((callback) => {
            callback.apply(this, others);   // 这里的this是上一级的this
        });
    }
};
// 移除绑定
Girl.prototype.removeListener = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return callback != item;
        });
    }
};

var girl = new Girl();

var shopping = function (who) {
    console.log(who + '逛')
}
var eat = function (who) {
    console.log(who + '吃')
}
var cry = function (who) {
    console.log(who + '呜呜呜')
}
girl.on('变漂亮', shopping);
girl.on('变漂亮', eat);
girl.on('变漂亮', cry);
girl.removeListener('变漂亮', cry);

girl.emit('变漂亮', '我');