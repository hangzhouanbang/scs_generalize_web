if(localStorage.getItem('type') == '推广经理'){
    //推广经理
    //今日总消费和本月总消费
    ajax_method(map.localurl+map.managequeryconsumer,
        'token='+localStorage.getItem('token'),'post',function successCallBack(a) {
        var data = JSON.parse(a).data
        console.log(data)
        var html = '<p class="consumption_statistics">消费统计（元）</p>\n' +
            '        <p class="consumption_statistics">\n' +
            '            <span>今日玩家：'+data.todaySum.memberConsumer+'</span>\n' +
            '            <span>当月玩家：'+data.monthSum.memberConsumer+'</span>\n' +
            '        </p>\n' +
            '        <p class="consumption_statistics">\n' +
            '            <span>今日代理：'+data.todaySum.agentConsumer+'</span>\n' +
            '            <span>当月代理：'+data.monthSum.agentConsumer+'</span>\n' +
            '        </p>\n' +
            '        <p class="consumption_statistics">\n' +
            '            <span>今日总计：'+data.todaySum.total+'</span>\n' +
            '            <span>当月总计：'+data.monthSum.total+'</span>\n' +
            '        </p>'
        document.getElementsByClassName('rebate')[0].innerHTML = html
    })
}else{
    //今日收益和本月收益
    ajax_method(map.localurl+map.queryreward,
        'token='+localStorage.getItem('token'),'post',function successCallBack(a) {
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
}


//下级代理
var vid = 1;
function init(page){
    ajax_method(map.localurl+map.queryagentreward,
        'token='+localStorage.getItem('token')+'&page='+page+'&size=10',
        'post',function successCallBack(a) {
        var data = JSON.parse(a).data.items
        var type = JSON.parse(a).data.type
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
            if(type == '推广经理') {
                li.innerHTML = '<div class="left">\n' +
                    '            <img src="' + data[i].headimgurl + '" alt="">\n' +
                    '        </div>\n' +
                    '        <div class="center">\n' +
                    '            <div class="top">\n' +
                    '                <span>代理昵称：' + data[i].agentName + '</span>\n' +
                    '            </div>\n' +
                    '            <p>代理ID：' + data[i].agentId + '</p>\n' +
                    '            <div class="bottom">\n' +
                    '                <span>今日消费：' + data[i].dailyTotalAmount + '</span>\n' +
                    '                <span>当月消费：' + data[i].monthlyTotalAmount + '</span>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="right" style="background: #FAFAFA;">\n' +
                    '        </div>'
            }else{
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
                    '        <div class="right" style="background:#FAFAFA;">\n' +
                    '        </div>'
            }
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