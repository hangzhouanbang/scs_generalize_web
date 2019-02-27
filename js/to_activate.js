function back() {
    window.location.href = 'first_index.html?token='+localStorage.getItem('token')
}

//初始化数据
var html=[];
var data,tr,score;
function init(page,haveLogin){
    if(!data){
        ajax_method(map.localurl+map.queryinvitationRecord,
            'token='+localStorage.getItem("token")+'&page='+page+'&size=15&haveLogin='+haveLogin,
            'post',function successCallBack(a){
                data = JSON.parse(a).data.listPage.items
                score = JSON.parse(a).data
                var html1 = '<span>'+score.invitationCode+'</span><br>\n' +
                    '            <span>长按复制邀请码</span>'
                document.getElementsByClassName('code')[0].innerHTML = html1;
                for(var i = 0;i < data.length;i++){
                    tr = document.createElement('tr')
                    data[i].createTime = formatDate(new Date(data[i].createTime))
                    tr.innerHTML =
                        '<td>'+data[i].createTime+'</td>\n' +
                        '<td>'+data[i].memberId+'</td>\n' +
                        '<td class="record">'+data[i].nickname+'</td>\n' +
                        '<td>'+data[i].score+'</td>\n'
                    document.getElementById("table").appendChild(tr)
                    if(data[i].record == '成功'){
                        document.getElementsByClassName('record')[0].style.color = '#17BC4D';
                    }
                    if(data[i].record == '失败'){
                        document.getElementsByClassName('record')[0].style.color = '#FF6257';
                    }
                }
            })
    }

}
init(1,false);

//加载更多
//滚动事件触发
function scroll(page,haveLogin){
    ajax_method(map.localurl+map.queryinvitationRecord,
        'token='+localStorage.getItem("token")+'&page='+page+'&size=15&haveLogin='+haveLogin,
        'post',function successCallBack(a){
            data = JSON.parse(a).data.items;
            if(vid > JSON.parse(a).data.pageCount){
                document.getElementsByClassName('loadmore')[0].style.display='block';
                return;
            }
            if(data){
                for(var i = 0;i < data.length;i++){
                    tr = document.createElement('tr')
                    data[i].createTime = formatDate(new Date(data[i].createTime))
                    tr.innerHTML =
                        '<td>'+data[i].createTime+'</td>\n' +
                        '<td>'+data[i].memberId+'</td>\n' +
                        '<td>'+data[i].record+'</td>\n' +
                        '<td>'+data[i].score+'</td>\n'
                    document.getElementById("table").appendChild(tr)
                }
            }

        })
}

var vid = 1;
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
        vid++;
        scroll(vid,false)
    }
};

//复制
function copy(){
    var code = document.getElementById('code').innerText.slice(6);
    console.log(code);
}