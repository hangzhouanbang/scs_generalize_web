function back() {
    window.location.href = 'first_index.html?token='+localStorage.getItem('token')
}

//初始化数据
var html=[];
var data,tr,judge;
function init(page){
    ajax_method(map.localurl+map.queryscorerecord,
        'token='+localStorage.getItem('token')+'&type=exchange&page='+page+'&size=15',
        'post',function successCallBack(a){
        data = JSON.parse(a).data.listPage.items
        judge = JSON.parse(a).data
        var html = ' <span>当前推广积分：'+judge.score+'</span>\n' +
            '        <span onclick="javascript:location.href=\'membercard_conversion.html\'">兑换会员卡</span>';
        document.getElementsByClassName('record')[0].innerHTML = html;
        for(var i = 0;i < data.length;i++){
            tr = document.createElement('tr')
            data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
            tr.innerHTML =
                '<td>'+data[i].summary.text+'</td>\n' +
                '<td>'+data[i].accountingTime+'</td>\n' +
                '<td>'+data[i].balanceAfter+'</td>\n'
            document.getElementById('table').appendChild(tr)
        }
    })
}
init(1);
//加载更多
//滚动事件触发
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
        vid++;
        ajax_method(map.localurl+map.queryscorerecord,
            'token='+localStorage.getItem('token')+'&type=exchange&page='+vid+'&size=15',
            'post',function successCallBack(a){
            data = JSON.parse(a).data.listPage.items;
            if(vid > JSON.parse(a).data.listPage.pageCount){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            for(var i = 0;i < data.length;i++){
                tr = document.createElement('tr')
                data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
                tr.innerHTML =
                    '<td>'+data[i].summary.text+'</td>\n' +
                    '<td>'+data[i].accountingTime+'</td>\n' +
                    '<td>'+data[i].balanceAfter+'</td>\n'
                document.getElementById('table').appendChild(tr)
            }
        })
    }
};