document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';


//ajax原生请求
function ajax_method(url,data,method,success) {
    // 异步对象
    var ajax = new XMLHttpRequest();

    // get 跟post  需要分别写不同的代码
    if (method=='get') {
        // get请求
        if (data) {
            // 如果有值
            url+='';
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
            // console.log(ajax.responseText);
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

//滚动加载事件
//加载更多
var vid=1;
//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if(document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//数组去重
Array.prototype.distinct = function(){
    var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
    for(i = 0; i < len; i++){
        for(j = i + 1; j < len; j++){
            if(arr[i] === arr[j]){
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}



var map = {
    queryinvitation:'/invitation/queryinvitation',
    info:'/agent/info',
    recharge:'/member/recharge',
    giveclubcard:'/clubcard/giveclubcard',
    queryclubcardrecord:'/agent/queryclubcardrecord',
    queryscorerecord:'/agent/queryscorerecord',
    queryjunior:'/agent/queryjunior',
    agentapply:'/apply/agentapply',
    uptoken:'/apply/uptoken',
    queryagentclubcard:'/clubcard/queryagentclubcard',
    buyscoreclubcard:'/clubcard/buyscoreclubcard',
    buycostclubcard:'/clubcard/buycostclubcard',
    getconfig:'/access/getconfig',
    downloadimg:'/apply/downloadimg',
    queryaccount:'/agent/queryaccount',
    applyinfo:'/apply/applyinfo'
};
map.localurl = "http://www.linshaocong.cn:96";

// 七牛云的上传地址，根据自己所在地区选择，这里是华东区
map.domain = 'http://up.qiniu.com'
// 这是七牛云空间的外链默认域名
map.qiniuaddr = 'http://qiniu.3cscy.com'


