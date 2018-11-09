var jine = document.getElementById('jine')
var amount = window.location.href.slice(window.location.href.indexOf('?')+1)
jine.oninput = function(){
    if(jine.value){
        document.getElementsByClassName('tx')[0].style.background='#17BC4D';
    }else{
        document.getElementsByClassName('tx')[0].style.background='#83D59E';
    }
    if(jine.value - amount >= 0 ){
        jine.value = amount;
    }
}
var html = ' <span>可提现金额￥'+amount+'</span>\n' +
    '            <span>全部提现</span>'
document.getElementsByClassName('sure')[0].innerHTML = html

var tx = document.getElementsByClassName('tx')[0];
tx.onclick = function(){
    ajax_method(map.localurl+map.applyreward,
        'token='+localStorage.getItem('token')+'&amount='+jine.value,
        'post',function successCallBack(a) {
            var data = JSON.parse(a)
            if(data.success){
                window.location.href = 'feedback.html';
            }
        })
}

