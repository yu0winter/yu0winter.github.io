

/*
 * 处理静态缓存
 * 首先定义需要缓存的路径, 以及需要缓存的静态文件的列表
 * */
var cacheName = 'helloWorld'
var filesToCache = [
   '/';
   'styles/inline.css',
   'index.html',
];

/// 借助 Service Worker, 可以在注册完成安装 Service Worker 时, 抓取资源写入缓存:
self.addEventListener('install', event => {
  event.waitUntil(
//	 caches.open(cacheName).then(function(cache) {
//    console.log('[ServiceWorker] Caching app shell');
//    return cache.addAll(filesToCache);
//  })
  	
    caches.open(cacheName)
    .then(cache => cache.addAll([
      'index.html'
    ]))
    // 调用 self.skipWaiting() 方法是为了在页面更新的过程当中, 新的 Service Worker 脚本能立即激活和生效。
    // .then(() => self.skipWaiting())
  )
})

/*
 处理动态缓存

网页抓取资源的过程中, 在 Service Worker 可以捕获到 fetch 事件, 可以编写代码决定如何响应资源的请求:

在真实的项目当中, 可以根据资源的类型, 站点的特点, 可以专门设计复杂的策略。
fetch 事件当中甚至可以手动生成 Response 返回给页面。
  */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
})

/// 更新静态资源 .详情有待描述
self.addEventListener('activate', function(e) {
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      return self.clients.claim()
    })
  )
})