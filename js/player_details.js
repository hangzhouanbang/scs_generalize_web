var memberId = window.location.href.slice(window.location.href.indexOf('id=')+3)
function init(page){
    ajax_method(map.localurl+map.querymemberrewarddetail,
        'token='+localStorage.getItem('token')+'&page='+page+'&size=10&memberId='+memberId,
        'post',function successCallBack(a) {
            var data = JSON.parse(a).data.items
            console.log(data)
            if(data == []){
                document.getElementsByClassName('no_data')[0].style.display='block';
                return;
            }
            if(page > JSON.parse(a).data.pageCount){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            for(var i = 0;i < data.length;i++){
                var li = document.createElement('li');
                data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
                li.innerHTML = ' <div class="top">\n' +
                    '                <span>时间：'+data[i].accountingTime+'</span>\n' +
                    '                <span>'+data[i].summary.text+'</span>\n' +
                    '            </div>\n' +
                    '            <div class="bottom">\n' +
                    '                <p>玩家昵称：'+data[i].memberName+'</p>\n' +
                    '                <p>玩家ID：'+data[i].memberId+'</p>\n' +
                    '                <p>消费'+data[i].totalamount+' 返'+data[i].accountingAmount+'</p>\n' +
                    '            </div>'
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
