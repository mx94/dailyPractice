//浅拷贝
function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    return c;
}

//深拷贝
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

// es6对象拷贝
var _defaultOptions = {
    url: '',
    async: true,
    dataType: 'text',
    type: 'get',
    data: null,
    success: null
};
var options = {
    url: '/aa',
    async: false
};
var a = {
    a: 1
};
console.log(Object.assign(_defaultOptions, options, a));