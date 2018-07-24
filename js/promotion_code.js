//初始化数据
var html=[];
var data,tr;
function init(page){
    ajax_method(map.localurl+map.queryinvitation,'token='+token+'&page='+page+'&size=15','post',function successCallBack(a){
        data = JSON.parse(a).data.items
        console.log(data)
        for(var i = 0;i < data.length;i++){
            tr = document.createElement('tr')
            data[i].createTime = formatDate(new Date(data[i].createTime))
            tr.innerHTML =
                '<td>'+data[i].createTime+'</td>\n' +
                '<td>'+data[i].memberId+'</td>\n' +
                '<td>'+data[i].nickname+'</td>\n' +
                '<td>'+data[i].score+'</td>\n'
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
        ajax_method(map.localurl+map.queryinvitation,'token='+token+'&page='+vid+'&size=15','post',function successCallBack(a){
            data = JSON.parse(a).data.items;
            if(vid > JSON.parse(a).data.pageCount){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            for(var i = 0;i < data.length;i++){
                tr = document.createElement('tr')
                data[i].createTime = formatDate(new Date(data[i].createTime))
                tr.innerHTML =
                    '<td>'+data[i].createTime+'</td>\n' +
                    '<td>'+data[i].memberId+'</td>\n' +
                    '<td>'+data[i].nickname+'</td>\n' +
                    '<td>'+data[i].score+'</td>\n'
                document.getElementById('table').appendChild(tr)
            }
        })
    }
};
//复制
function copy(){
    var code = document.getElementById('code').innerText.slice(6);
    console.log(code);
}