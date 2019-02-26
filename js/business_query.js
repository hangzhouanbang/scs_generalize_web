 //推广经理
// 今日总消费和本月总消费
ajax_method(map.localurl+map.querycost,'token='+localStorage.getItem('token'),'post',function successCallBack(a) {
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

//我的玩家
var vid = 1;
function init(page){
    ajax_method(map.localurl+map.querymembercost,'token='+localStorage.getItem('token')+'&page='+page+'&size=10','post',function successCallBack(a) {
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
            data[i].inviteTime = formatDate(new Date(data[i].inviteTime))
                li.innerHTML = ' <div class="left">\n' +
                '                <img src="'+data[i].headimgurl+'" alt="">\n' +
                '            </div>\n' +
                '            <div class="center">\n' +
                '                <div class="top">\n' +
                '                    <p>玩家昵称：'+data[i].nickname+'</p>\n' +
                '                    <p>玩家ID：'+data[i].id+'</p>\n' +
                '                </div>\n' +
                '                <p>绑定时间：'+data[i].inviteTime+'</p>\n' +
                '                <div class="bottom">\n' +
                '                    <span>今日消费：'+data[i].memebrDayCost+'</span>\n' +
                '                    <span></span>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="right">\n' +
                '                <p onclick="javascript :window.location.href=\'player_details.html?id='+data[i].id+'\'">详 <br> 情</p>\n' +
                '            </div>'
            document.getElementById('my_players').appendChild(li)
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