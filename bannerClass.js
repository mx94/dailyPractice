/**
 * 轮播图封装
 * @param container 轮播图最外层的元素
 * @param url 接口 后台提供
 * @param interval 图片播放的频率
 */
function Banner(container, url, interval) {
    this.container = container;
    this.inner = kirin.getElementsByClass('inner', this.container)[0];
    this.focusList = kirin.getElementsByClass('focusList', this.container)[0];
    this.left = kirin.getElementsByClass('left', this.container)[0];
    this.right = kirin.getElementsByClass('right', this.container)[0];
    this.imgs = this.inner.getElementsByTagName('img');
    this.lis = this.focusList.getElementsByTagName('li');
    this.data = null;
    this.url = url;
    this.interval = interval || 2000;
    this.index = 0;
    this.timer = null;
    this.init();
}

Banner.prototype.getData = function () {
    var that = this;    // 要时刻保证this是实例
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.url + '?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            that.data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
}
Banner.prototype.bindData = function () {
    if (this.data && this.data.length) {
        var strImg = '';
        var strLi = '';
        for (var i = 0; i < this.data.length; i++) {
            strImg += '<img real="' + this.data[i].src + '">';
            strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        }
        this.inner.innerHTML = strImg;
        this.focusList.innerHTML = strLi;
    }
}
Banner.prototype.checkImg = function () {
    var that = this;
    for (var i = 0; i < this.imgs.length; i++) {
        var tempImg = document.createElement('img');
        tempImg.index = i;
        tempImg.src = this.imgs[i].getAttribute('real');
        tempImg.onload = function () {
            that.imgs[this.index].src = this.src;
            if (this.index == 0) {
                kirin.css(that.imgs[0], 'zIndex', 1);
                animate({
                    ele: that.imgs[0],
                    target: {
                        opacity: 1
                    },
                    duration: 300
                });
            }
        }
    }
}
Banner.prototype.autoMove = function () {
    this.index++;
    this.index = this.index == this.data.length ? 0 : this.index;
    this.setImg();
}
Banner.prototype.setImg = function () {
    for (var i = 0; i < this.imgs.length; i++) {
        if (i == this.index) {
            kirin.css(this.imgs[i], 'zIndex', 1);
            animate({
                ele: this.imgs[i],
                target: {
                    opacity: 1
                },
                duration: 300,
                callback: function () {
                    var otherImgs = kirin.siblings(this);
                    for (var i = 0; i < otherImgs.length; i++) {
                        kirin.css(otherImgs[i], 'opacity', 0);
                    }
                }
            });
        } else {
            kirin.css(this.imgs[i], 'zIndex', 0);
        }
    }
    ;
    // 焦点切换
    for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].className = i == this.index ? 'cur' : '';
    }
}
Banner.prototype.bindEvent = function () {
    var that = this;
    this.container.onmouseover = function () {
        window.clearInterval(that.timer);
        that.left.style.display = that.right.style.display = 'block';
    };
    this.container.onmouseout = function () {
        that.timer = window.setInterval(function () {
            that.autoMove();
        }, that.interval);
        that.left.style.display = that.right.style.display = 'none';
    };
}
Banner.prototype.bindEventForBtn = function () {
    var that = this;
    this.left.onclick = function () {
        that.index--;
        if (that.index == -1) {
            that.index = that.data.length - 1;
        }
        ;
        that.setImg();
    };
    this.right.onclick = function () {
        that.autoMove();
    };
}
Banner.prototype.bindEventForLis = function () {
    var that = this;
    for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].index = i;
        this.lis[i].onclick = function () {
            that.index = this.index;
            that.setImg();
        }
    }
}
Banner.prototype.init = function () {
    var that = this;
    this.getData();
    this.bindData();
    this.checkImg();
    this.timer = window.setInterval(function () {
        that.autoMove();
    }, this.interval);
    this.bindEvent();
    this.bindEventForBtn();
    this.bindEventForLis();
}

var wrap = kirin.getElementsByClass('wrap')[0];
var a = new Banner(wrap, 'json/data.txt', 2000);