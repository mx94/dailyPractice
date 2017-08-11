;(function () {
    function animate(opt) {
        var ele = opt.ele;
        var target = opt.target;
        var duration = opt.duration || 1000;
        var callback = opt.callback;
        var time = 0;
        var begin = {};
        var change = {};
        var effect = {
            Linear: function (t, b, c, d) {
                return t / d * c + b;
            }
        };
        for (var key in target) {
            begin[key] = kirin.css(ele, key);
            change[key] = target[key] - begin[key];
        }
        ele.timer && window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function () {
            time += 10;
            if (time >= duration) {
                window.clearInterval(ele.timer);
                kirin.css(ele, target);
                if (typeof callback == 'function') {
                    callback.call(ele);
                }
                return;
            }
            for (var key in change) {
                if (change[key]) {
                    var val = effect.Linear(time, begin[key], change[key], duration);
                    kirin.css(ele, key, val);
                }
            }
        }, 10);
    }

    window.animate = animate;
})();