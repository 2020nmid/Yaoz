# ajax实现注册/登录/修改密码
参考资料：*1.*《JavaScript高级程序设计》—第21章 Ajax与Comet
*2.*[现代JavaScript教程]: https://zh.javascript.info/xmlhttprequest2

## 简述

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

## HTTP头部信息

XHR对象提供了操作请求头部和响应头部信息的方法。

在发送XHR请求的同时，还会发送下列头部信息：

- Accpet：浏览器能够处理的内容类型
- Accept-Charset：浏览器能够显示的字符集
- Accept-Encoding：浏览器能够处理的压缩编码
- Accpet-Language：浏览器当前设置的语言
- Cookie：当前页面设置的任何Cookie
- Host：发送请求的页面所在的域
- Referer：发送请求的页面的URI（统一资源标识符）
- User-Agent：浏览器的用户代理字符串

## POST和GET

1.GET是最常见的请求类型，常用于向服务器查询某些信息。必要时，可将查询字符串参数追加到open()方法的URL末尾，以便将信息发送给服务器。

比如任务中获取验证码传送邮箱地址：

```javascript
xhr.open("GET","http://120.24.93.68:8085/api/register/sendCheckCode?email="+email,true);
```

2.使用频率仅次于GET的是POST请求，通常用于向服务器发送应该被保存的数据。POST请求应该把数据作为请求的主体提交。发送POST请求的第二步是向send()方法中传入某些数据。

## 响应信息

收到响应后，响应的数据会自动填充XHR对象的属性。

- responseText：作为响应主体被返回的文本
- responseXML：若相应的内容类型是”text/xml“或”application/xml“，这个属性中将保存包含响应数据的XML DOM文档
- status：响应的HTTP状态
- statusText：HTTP状态的说明

在接收到响应后，第一步是检查status属性，以确定响应已经成功返回。一般可以将HTTP状态代码200作为成功的标志。304表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本。

```JavaScript
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status ==304){
    alert(xhr.responseText);
} else{
    alert("Request was unsuccessful: " + xhr.status);
}
```

发送异步请求才能让JavaScript继续执行而不必等待响应：检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：

- 0：未初始化。尚未调用open()方法
- 1：启动。已经调用open()方法，但尚未调用send()方法
- 2：发送。已经调用send()方法，但尚未接收到响应
- 3：接收。已经接收到部分响应数据
- 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了

只要readyState属性的值由一个值变成另一个值，都会触发一次readystatechange事件。可以利用这个事件来检测每次状态变化后readyState的值。

必须在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器兼容性。

```javascript
let xhr = createXHR();
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4){
    	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status ===304){
            alert(xhr.responseText);
        } else{
            alert("Request was unsuccessful: " + xhr.status);
        }
	}
}
xhr.open("get","example.txt",true);
xhr.send(null);
```

在收到响应之前还可以调用abort()方法来取消异步请求：

`xhr.abort();`

## 超时设定

```javascript
xhr.timeout = 1000; //1秒，仅适用于IE8+
xhr.ontimeout = function(){
    alert("Request did not return in a second.");
};
xhr.send(null);
```

