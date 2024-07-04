const CACHE_NAME = 'framework-cache';
const urlsToCache = [
  '/',
  '/css/system.css',
  '/css/iconfont.css',
  '/element/element.plus.css',
  '/js/iconfont.js',
  '/flv/ezuikitflv.js',
  '/flv/ezuikit.js',
  '/map/baidu/TrackAnimation.min.js',
  '/easywasmplayer/EasyWasmPlayer.js',
  '/easywasmplayer/libDecoder.wasm',
  '/mcs8client/mcs8Client.js',
  '/js/mitt.umd.js',
  '/js/error.js',
  '/index.html',
  '/assets/index.js',
  // 不直接包含带 hash 值的资源，因为这些在安装时可能不可用
];

// 处理安装事件并缓存初始资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 处理激活事件并清除旧的缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 处理 fetch 事件并动态缓存哈希值文件
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // 如果缓存中有响应，返回缓存的响应，同时更新缓存
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const networkResponseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponseClone);
            });
          }
          return cachedResponse;
        }).catch(() => {
          return cachedResponse;
        });
      }

      // 如果缓存中没有响应，进行网络请求并缓存响应
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const networkResponseClone = networkResponse.clone();
          // 缓存带哈希值的文件
          if (requestUrl.pathname.match(/\/assets\/.*\..*/)) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponseClone);
            });
          }
        }
        return networkResponse;
      });
    })
  );
});

// 处理 service worker 消息
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 处理更新发现事件
self.addEventListener('updatefound', () => {
  const newWorker = self.installing;
  newWorker.onstatechange = () => {
    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
      newWorker.postMessage({ action: 'skipWaiting' });
    }
  };
});
