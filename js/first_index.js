//初始化数据
function init(){
    ajax_method(map.localurl+map.info,'token='+localStorage.getItem('token'),'post',function successCallBack(a){
        var data = JSON.parse(a)
        data.agent.createTime = formatDate(new Date(data.agent.createTime))
        localStorage.setItem('type',data.agent.agentType.type)
        if(data.agent.agentType.type == '推广经理'){
            document.getElementsByClassName('sytx')[0].style.display = 'none'
        }else{
            document.getElementsByClassName('sytx')[0].style.display = 'block'
        }
        document.getElementsByClassName('title')[0].innerHTML = data.agent.agentType.type + '管理后台'
        var html = '<div class="left">\n' +
            '        <img src="'+data.agent.headimgurl+'">\n' +
            '    </div>\n' +
            '    <div class="right">\n' +
            '        <div class="name">\n' +
            '            <span>昵称：</span>\n' +
            '            <span>'+data.agent.nickname+'</span>\n' +
            '        </div>\n' +
            '        <div class="agentid">\n' +
            '            <span>推广员ID：</span>\n' +
            '            <span>'+data.agent.id+'</span></div>\n' +
            '        <div class="time">\n' +
            '            <span>注册时间：</span>\n' +
            '            <span>'+data.agent.createTime+'</span>\n' +
            '        </div>\n' +
            '    </div>'
        var html2 = '<div class="left">推广积分:'+data.score+'</div>\n' +
            '    <div class="right">\n' +
            '        <a class="btn_member exchange" href="membercard_conversion.html">积分商城</a>\n' +
            '        <a class="btn_member purchase" href="membercard_buy.html">代理商城</a>\n' +
            '    </div>'
        document.getElementById('table1').innerHTML = html;
        document.getElementById('table2').innerHTML = html2;
    })
}
init();
