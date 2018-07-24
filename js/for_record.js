//初始化数据
var html=[];
var data,tr;
function init(page){
    ajax_method(map.localurl+map.queryscorerecord,'token='+token+'&type=兑换&page='+page+'&size=15','post',function successCallBack(a){
        data = JSON.parse(a).data.items
        console.log(data)
        for(var i = 0;i < data.length;i++){
            tr = document.createElement('tr')
            data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
            tr.innerHTML =
                '<td>'+data[i].summary.text+'</td>\n' +
                '<td>'+data[i].accountingTime+'</td>\n' +
                // '<td>'+data[i].accountingTime+'</td>\n' +
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
        ajax_method(map.localurl+map.queryscorerecord,'token='+token+'&type=兑换&page='+vid+'&size=15','post',function successCallBack(a){
            data = JSON.parse(a).data.items;
            if(vid > JSON.parse(a).data.pageCount){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            for(var i = 0;i < data.length;i++){
                tr = document.createElement('tr')
                data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
                tr.innerHTML =
                    '<td>'+data[i].summary.text+'</td>\n' +
                    '<td>'+data[i].accountingTime+'</td>\n' +
                    // '<td>'+data[i].accountingTime+'</td>\n' +
                    '<td>'+data[i].balanceAfter+'</td>\n'
                document.getElementById('table').appendChild(tr)
            }
        })
    }
};