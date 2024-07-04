window.addEventListener("error", function(event, error) {
  console.error("全局监听异常.addEventListener error, event==================", event);
  if (event?.target?.tagName === 'LINK') {
    console.error("全局监听异常.addEventListener有新版本更新");
    if (window.self == window.top) {
      window.location.hostname === 'localhost' ? null : window.top.location.reload();
    }
  }
});
