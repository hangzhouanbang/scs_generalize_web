//今日收益和本月收益
ajax_method(map.localurl+map.queryreward,'token='+localStorage.getItem('token'),'post',function successCallBack(a) {
    var data = JSON.parse(a)
    var html = '<div class="today">\n' +
        '            <p>今日返利（元)</p>\n' +
        '            <p>'+data.data.dayReward+'</p>\n' +
        '        </div>\n' +
        '        <div class="current">\n' +
        '            <p>当月返利（元)</p>\n' +
        '            <p>'+data.data.monthReward+'</p>\n' +
        '        </div>'
    document.getElementsByClassName('rebate')[0].innerHTML = html
})
//我的玩家
var vid = 1;
function init(page){
    ajax_method(map.localurl+map.queryagentreward,'token='+localStorage.getItem('token')+'&page='+page+'&size=10','post',function successCallBack(a) {
        var data = JSON.parse(a).data.items
        console.log(data)
        if(data == []){
            document.getElementsByClassName('no_data')[0].style.display='block';
            return;
        }
        if(JSON.parse(a).data.pageCount != 0 && page > JSON.parse(a).data.pageCount){
            document.getElementsByClassName('loadmore')[0].style.display='block';
            return;
        }
        for(var i = 0;i < data.length;i++){
            var li = document.createElement('li');
            li.innerHTML = '<div class="left">\n' +
                '            <img src="'+data[i].headimgurl+'" alt="">\n' +
                '        </div>\n' +
                '        <div class="center">\n' +
                '            <div class="top">\n' +
                '                <span>代理昵称：'+data[i].agentName+'</span>\n' +
                '            </div>\n' +
                '            <p>代理ID：'+data[i].agentId+'</p>\n' +
                '            <div class="bottom">\n' +
                '                <span>今日返利'+data[i].agentReward+'</span>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="right">\n' +
                '            <p onclick="javascript :window.location.href=\'agent_player.html?id='+data[i].agentId+'\'">查 <br> 看</p>\n' +
                '        </div>'
            document.getElementById('recruitment_agents').appendChild(li)
        }
    })
}
init(1)
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
        vid++;
        init(vid)
    }
};