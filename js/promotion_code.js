function back() {
    window.location.href = 'first_index.html?token='+localStorage.getItem('token')
}
//初始化数据
var html=[];
var data,tr,score;
function init(page){
    ajax_method(map.localurl+map.queryinvitation,'token='+localStorage.getItem('token')+'&page='+page+'&size=15','post',function successCallBack(a){
        data = JSON.parse(a).data.items
        score = JSON.parse(a).data
        var html1 = '<span>我的邀请码</span>\n' +
            '    <br>\n' +
            '    <span>'+score.invitationCode+'</span>'
        document.getElementsByClassName('generalization')[0].innerHTML = html1;
        for(var i = 0;i < data.length;i++){
            tr = document.createElement('tr')
            data[i].createTime = formatDate(new Date(data[i].createTime))
            tr.innerHTML =
                '<td>'+data[i].createTime+'</td>\n' +
                '<td>'+data[i].memberId+'</td>\n' +
                '<td>'+data[i].record+'</td>\n' +
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
        ajax_method(map.localurl+map.queryinvitation,'token='+localStorage.getItem('token')+'&page='+vid+'&size=15','post',function successCallBack(a){
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
                    '<td>'+data[i].record+'</td>\n' +
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