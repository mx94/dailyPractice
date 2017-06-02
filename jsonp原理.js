function fn(data) {
    document.body.innerHTML = data;
}
var oScript = document.createElement('script');

// 将全局函数fn的名字 传递给服务器 是否叫cb跟后端约定好
oScript.src = 'http://localhost:8080/getDate?cb=fn';
document.body.appendChild(oScript);

// jquery中的jsonp
$.ajax({
    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + val,
    type: 'get',
    dataType: 'jsonp',
    jsonp: 'cb',
    success: function (res) {
        let datas = res.s;
        console.log(datas);
        var str = ``;
        $.each(datas, function (idx, item) {
            str += `<li>${item}</li>`
        });
        $ul.append(str);
    }
});