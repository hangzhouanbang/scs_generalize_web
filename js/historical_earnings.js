function init(page){
    ajax_method(map.localurl+map.findagenthistory,
        'token='+localStorage.getItem('token')+'&page='+page+'&size=15','post',function successCallBack(a) {
            console.log(JSON.parse(a))
            var data = JSON.parse(a).data.list
            if(data.length == 0){
                document.getElementsByClassName('no_data')[0].style.display='block';
                return;
            }
            if(page > JSON.parse(a).data.count){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            for(var i = 0;i < data.length;i++) {
                var li = document.createElement('li');
                if (localStorage.getItem('type') == '推广经理') {
                    li.innerHTML = ' <span>' + data[i].month + '</span>\n' +
                        '            <span>玩家：' + data[i].memberConsumer + '元</span>\n' +
                        '            <span>代理：' + data[i].agentConsumer + '元</span>\n' +
                        '            <span>总计：' + data[i].consumerSum + '元</span>'
                }else{
                    li.innerHTML = ' <span>' + data[i].month + '</span>\n' +
                        '            <span class="total_rebate">总返利：'+data[i].reward+'元</span>'
                }
                document.getElementsByTagName('ul')[0].appendChild(li)
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
