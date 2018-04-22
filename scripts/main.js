/*
 *  Main website JavaScript
 *  处理全局性事物
 *
 */

(function(){

// unsupported browser
if (!window.addEventListener ||
    !window.history ||
    !window.requestAnimationFrame ||
    !document.getElementsByClassName) {
    return;
}


/*
 *  注册serviceWorker
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

/*
 *  当执行”添加到主屏幕“的操作时，内部会触发相应的事件beforinstallprompt
 */
window.addEventListener('beforeinstallprompt', function(e) {
    e.userChoice.then(function(result) {
        if (result.outcome == 'dismissed') {
            // 发送数据进行分析
            // 用户取消了
        } else {
            // 发送数据进行分析
            // 用户注册了
        }
    })
})


})();



