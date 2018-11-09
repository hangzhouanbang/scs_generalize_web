var agentId = window.location.href.slice(window.location.href.indexOf('id=')+3)
function init(page){
    ajax_method(map.localurl+map.queryagent_member_reward,
        'token='+localStorage.getItem('token')+'&page='+page+'&size=10&agentId='+agentId,
        'post',function successCallBack(a) {
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
                data[i].inviteTime = formatDate(new Date(data[i].inviteTime))
                li.innerHTML = ' <div class="left">\n' +
                    '            <img src="'+data[i].headimgurl+'" alt="">\n' +
                    '        </div>\n' +
                    '        <div class="center">\n' +
                    '            <div class="top">\n' +
                    '                <p>玩家昵称：'+data[i].nickname+'</p>\n' +
                    '                <p>玩家ID：'+data[i].id+'</p>\n' +
                    '            </div>\n' +
                    '            <p>绑定时间：'+data[i].inviteTime+'</p>\n' +
                    '            <div class="bottom">\n' +
                    '                <span>今日消费'+data[i].totalamount+'</span>\n' +
                    '                <span>返'+data[i].agentReward+'</span>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="right">\n' +
                    '            <p onclick="javascript :window.location.href=\'player_details.html?id='+data[i].id+'\'">详 <br> 情</p>\n' +
                    '        </div>'
                document.getElementById('my_players').appendChild(li)
            }
        })
}
init(1)
var vid = 1;
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
        vid++;
        init(vid)
    }
};
