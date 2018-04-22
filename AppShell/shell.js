/*
 *
 *	统一处理应用壳的事件
 *
 *
 **/

var indexUrls = ['/weather/index.html', '/news/index.html', '/other/index.html'];
var btns = [].slice.call(document.getElementsByClassName("toolbar__Item__Button"));
btns.forEach(function(v, i) { //v==value　为arr项，i==index　为arr索引

    v.onclick = function() {

        var pathname = window.location.pathname;
        var target = indexUrls[this.getAttribute('tag')];

        if (pathname != target) {
            window.location.href = target;
        }
        console.log(target);
    };
});
