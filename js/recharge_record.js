//初始化数据
var html=[];
var data,tr;
function init(page){
    ajax_method(map.localurl+map.queryclubcardrecord,'token='+token+'&type=充值&page='+page+'&size=15','post',function successCallBack(a){
        data = JSON.parse(a).data.items
        console.log(data)
        for(var i = 0;i < data.length;i++){
            tr = document.createElement('tr')
            data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
            data[i].accountingAmount = Math.abs(data[i].accountingAmount)
            tr.innerHTML =
                '<td>'+data[i].receiverId+'</td>\n' +
                '<td>'+data[i].accountingAmount+'张会员'+data[i].product+'</td>\n' +
                '<td>'+data[i].accountingTime+'</td>\n' +
                '<td>'+data[i].summary.text+'</td>\n';
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
        ajax_method(map.localurl+map.queryclubcardrecord,'token='+token+'&type=购买&page='+vid+'&size=15','post',function successCallBack(a){
            data = JSON.parse(a).data.items;
            if(vid > JSON.parse(a).data.pageCount){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            for(var i = 0;i < data.length;i++){
                tr = document.createElement('tr')
                data[i].accountingTime = formatDate(new Date(data[i].accountingTime))
                data[i].accountingAmount = Math.abs(data[i].accountingAmount)
                tr.innerHTML =
                    '<td>'+data[i].receiverId+'</td>\n' +
                    '<td>'+data[i].accountingAmount+'张会员'+data[i].product+'</td>\n' +
                    '<td>'+data[i].accountingTime+'</td>\n' +
                    '<td>'+data[i].summary.text+'</td>\n';
                document.getElementById('table').appendChild(tr)
            }
        })
    }
};