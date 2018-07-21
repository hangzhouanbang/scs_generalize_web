// var ajax = new XMLHttpRequest();
//
// // 使用post请求
// ajax.open('post',map.localurl+map.invitation);
//
// // 如果 使用post发送数据 必须 设置 如下内容
// // 修改了 发送给 服务器的 请求报文的 内容
// // 如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
// ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// // 发送
// // post请求 发送的数据 写在 send方法中
// // 格式 name=jack&age=18 字符串的格式
// ajax.send('token=&page=1&size=10');
//
// // 注册事件
// ajax.onreadystatechange = function () {
//     if (ajax.readyState==4&&ajax.status==200) {
//         console.log(ajax.responseText);
//     }
// }

ajax_method(map.localurl+map.invitation,'token=2ace59cc-762a-4b60-aa9c-4230f214095e&page=1&size=10','post','')