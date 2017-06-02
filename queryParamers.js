let url = "www.baidu.com/s?wd=hh&kw=xx";
String.prototype.queryParamers = function() {
    let obj = {};
    let reg = /([^?=&]+)=([^?=&]+)/g;
    this.replace(reg, function() {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}
let res = url.queryParamers();
console.log(res);