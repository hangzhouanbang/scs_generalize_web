var type = localStorage.getItem('type')
document.getElementById('players').onclick = function(){
    if(type == '推广经理'){
        window.location.href = 'business_query.html'
    }else{
        window.location.href = 'earnings.html'
    }
}
if(type == '推广经理'){
    //推广经理
    //今日总消费和本月总消费
    ajax_method(map.localurl+map.querycost,
        'token='+localStorage.getItem('token'),'post',function successCallBack(a) {
        var data = JSON.parse(a).data
        console.log(data)
            var html = '<p class="consumption_statistics">消费统计（元）</p>\n' +
                '        <p class="consumption_statistics">\n' +
                '            <span>今日玩家：'+data.memebrDayCost+'</span>\n' +
                '            <span>当月玩家：'+data.memberMonthCost+'</span>\n' +
                '        </p>\n' +
                '        <p class="consumption_statistics">\n' +
                '            <span>今日代理：'+data.juniorDayCost+'</span>\n' +
                '            <span>当月代理：'+data.juniorMonthCost+'</span>\n' +
                '        </p>\n' +
                '        <p class="consumption_statistics">\n' +
                '            <span>今日总计：'+data.totalDayCost+'</span>\n' +
                '            <span>当月总计：'+data.totalMonthCost+'</span>\n' +
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
    if(type == '推广经理') {
        ajax_method(map.localurl+map.queryagentcost,
            'token='+localStorage.getItem('token')+'&page='+page+'&size=10',
            'post',function successCallBack(a) {
                var data = JSON.parse(a).data.listPage.items
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
                        '            <img src="' + data[i].headimgurl + '" alt="">\n' +
                        '        </div>\n' +
                        '        <div class="center">\n' +
                        '            <div class="top">\n' +
                        '                <span>代理昵称：' + data[i].agentName + '</span>\n' +
                        '            </div>\n' +
                        '            <p>代理ID：' + data[i].agentId + '</p>\n' +
                        '            <div class="bottom">\n' +
                        '                <span>今日消费：' + data[i].agentDayCost + '</span>\n' +
                        '                <span>当月消费：' + data[i].agentMonthCost + '</span>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <div class="right" style="background: #FAFAFA;">\n' +
                        '        </div>'
                    document.getElementById('recruitment_agents').appendChild(li)
                }
            })
    }else{
        ajax_method(map.localurl+map.queryagentreward,
            'token='+localStorage.getItem('token')+'&page='+page+'&size=10',
            'post',function successCallBack(a) {
                var data = JSON.parse(a).data.listPage.items
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
                        '        <div class="right" style="background:#FAFAFA;">\n' +
                        '        </div>'
                    document.getElementById('recruitment_agents').appendChild(li)
                }
            })
    }
}
init(1)
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
        vid++;
        init(vid)
    }
};