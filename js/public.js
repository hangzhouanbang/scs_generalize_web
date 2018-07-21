document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

function back() {
    window.location.href = 'first_index.html'
}

//ajax原生请求
function ajax_method(url,data,method,success) {
    // 异步对象
    var ajax = new XMLHttpRequest();

    // get 跟post  需要分别写不同的代码
    if (method=='get') {
        // get请求
        if (data) {
            // 如果有值
            url+='?';
            url+=data;
        }else{

        }
        // 设置 方法 以及 url
        ajax.open(method,url);

        // send即可
        ajax.send();
    }else{
        // post请求
        // post请求 url 是不需要改变
        ajax.open(method,url,true);

        // 需要设置请求报文
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        // 判断data send发送数据
        if (data) {
            // 如果有值 从send发送
            ajax.send(data);
        }else{
            // 木有值 直接发送即可
            ajax.send();
        }
    }

    // 注册事件
    ajax.onreadystatechange = function () {
        // 在事件中 获取数据 并修改界面显示
        if (ajax.readyState==4&&ajax.status==200) {
            console.log(ajax.responseText);
            success(ajax.responseText);
        }
    }

}

//时间戳转为日期
function formatDate(now) {
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

var map = {
    invitation:'/invitation/queryinvitation',
    info:'/agent/info',
    recharge:'/member/recharge',
    giveclubcard:'/clubcard/giveclubcard'
};
map.localurl = "http://192.168.0.116:96";