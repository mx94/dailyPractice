/**
 * Created by maxin on 2017/4/20.
 */

~function () {
    function getXhr() {
        var xhr = null;
        var ary = [function () {
            return new XMLHttpRequest;
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }];
        ;
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            try {
                xhr = curFn();
                getXhr = curFn; // 惰性载入函数
                break;
            } catch (e) {

            }
        }
        if (xhr == null) {
            throw Error('你的浏览器版本太低，更新以下');
        }
        return xhr;
    }
    function ajax(options) {
        var _defaultOptions = {
            url: '',
            async: true,
            dataType: 'text',
            type: 'get',
            data: null,
            success: null
        }
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _defaultOptions[key] = options[key];
            }
        }
        var xhr = getXhr();
        // 防止GET方法走缓存
        if (_defaultOptions.type.toUpperCase() == 'GET') {
            if (_defaultOptions.url.indexOf('?') > -1) {
                _defaultOptions.url += '&ran=' + Math.random();
            } else {
                _defaultOptions.url += '?ran=' + Math.random();
            }
        }
        xhr.open(_defaultOptions.type, _defaultOptions.url, _defaultOptions.async);
        xhr.responseType = _defaultOptions.dataType;
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && /^2\d{2}$/.test(this.status)) {
                if (typeof _defaultOptions.success == 'function') {
                    _defaultOptions.success.call(this, this.response);
                }
            }
        }
        xhr.send(_defaultOptions.data);
    }
    window.ajax = ajax;
}();