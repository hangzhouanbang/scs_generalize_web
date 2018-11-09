function init(page){
    ajax_method(map.localurl+map.queryapply,
        'token='+localStorage.getItem('token')+'&page='+page+'&size=10',
        'post',function successCallBack(a) {
            var account = JSON.parse(a).data.account
            var items = JSON.parse(a).data.listPage.items
            console.log(items)
            var html = ' <div class="today">\n' +
                '        <p>可提现金额（元)</p>\n' +
                '        <p>'+account.balance+'</p>\n' +
                '    </div>\n' +
                '    <div class="tixian" onclick="javascript:window.location.href=\'withdraw.html?'+account.balance+'\'">提现</div>'
            document.getElementsByClassName('rebate')[0].innerHTML = html
            for(var i = 0;i < items.length;i++){
                var li = document.createElement('li');
                items[i].accountingTime = formatDate(new Date(items[i].accountingTime))
                if(items[i].state == 'APPLYING'){
                    items[i].state1 = '待审核'
                }
                if(items[i].state == 'SUCCESS'){
                    items[i].state1 = '已通过'
                }
                if(items[i].state == 'FAIL'){
                    items[i].state1 = '已驳回'
                }
                li.innerHTML = '<div class="left">\n' +
                    '            <p>时间：'+items[i].accountingTime+'</p>\n' +
                    '            <p>\n' +
                    '                <span>申请提现金额：</span>\n' +
                    '                <span>'+items[i].accountingAmount+'</span>\n' +
                    '            </p>\n' +
                    '        </div>\n' +
                    '        <div class="right '+items[i].state+'">'+items[i].state1+'</div>'
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