# ajax实现注册/登录/修改密码
AJAX = 异步 JavaScript 和 XML。

AJAX 是一种用于创建快速动态网页的技术。

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

XMLHttpRequest 是一个内建的浏览器对象，它允许使用 JavaScript 发送 HTTP 请求。
```javascript
let xhr = new XMLHttpRequest();//创建 XMLHttpRequest
xhr.open(method, URL, [async, user, password]);// 初始化
// open 调用与其名称相反，不会建立连接。它仅配置请求，而网络活动仅以 send 调用开启。
xhr.setRequestHeader(name, value);
xhr.send();
xhr.onload = function() { 
    //↑ load:请求完成并且响应已完全下载
    //error:无法发出请求，例如网络中断或者无效的 URL
    //progress: 在下载响应期间定期触发，报告已经下载了多少
    
}
```
提取接收到的message信息：服务器返回的是JSON数据，需将其转为对象。
```javascript
let response_message = JSON.parse(xhr.response);
alert(response_message.data) //data信息
```
