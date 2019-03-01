function show(dom1,dom2){
    for (var i = 0; i<dom1.length;i++) {
        dom1[i].style.display = 'block';
    }
    for (var j = 0; j<dom1.length;j++) {
        dom2[j].style.display = 'none';
    }
    init();
}
function hide(dom){
    for (var i = 0; i<dom.length;i++) {
        dom[i].style.display = 'none';
    }
    init();
}

//初始化数据
function init(){ 
    ajax_method(map.localurl+map.info,
        'token='+localStorage.getItem('token'),'post',function successCallBack(a){
        var data = JSON.parse(a)
        var html3 = '<p class="surplus">剩余</p>\n' +
            '        <div class="balance">\n' +
            '            <span>\n' +
            '                <p>日卡</p>\n' +
            '                <p class="card'+data.clubCardRi+'">'+data.clubCardRi+'</p>\n' +
            '            </span>\n' +
            '            <span>\n' +
            '                <p>周卡</p>\n' +
            '                <p class="card'+data.clubCardZhou+'">'+data.clubCardZhou+'</p>\n' +
            '            </span>\n' +
            '            <span>\n' +
            '                <p>月卡</p>\n' +
            '                <p class="card'+data.clubCardYue+'">'+data.clubCardYue+'</p>\n' +
            '            </span>\n' +
            '            <span>\n' +
            '                <p>季卡</p>\n' +
            '                <p class="card'+data.clubCardJi+'">'+data.clubCardJi+'</p>\n' +
            '            </span>\n' +
            '            <span>\n' +
            '                <p>玉石</p>\n' +
            '                <p class="card'+data.coins+'">'+data.coins+'</p>\n' +
            '            </span>\n' +
            '        </div>'
    
        document.getElementById('residue').innerHTML = html3;

        if(data.clubCardRi == '0'){
            document.getElementsByClassName('card'+data.clubCardRi)[0].className = 'color'
        }else{
            document.getElementsByClassName('card'+data.clubCardRi)[0].className = ''
        }
        if(data.clubCardZhou == '0'){
            document.getElementsByClassName('card'+data.clubCardZhou)[0].className = 'color'
        }else{
            document.getElementsByClassName('card'+data.clubCardZhou)[0].className = ''
        }
        if(data.clubCardYue == '0'){
            document.getElementsByClassName('card'+data.clubCardYue)[0].className = 'color'
        }else{
            document.getElementsByClassName('card'+data.clubCardYue)[0].className = ''
        }
        if(data.clubCardJi == '0'){
            document.getElementsByClassName('card'+data.clubCardJi)[0].className = 'color'
        }else{
            document.getElementsByClassName('card'+data.clubCardJi)[0].className = ''
        }
        if(data.coins == '0'){
            document.getElementsByClassName('card'+data.coins)[0].className = 'color'
        }else{
            document.getElementsByClassName('card'+data.coins)[0].className = ''
        }
    })
}
init();

function cz(page){
    ajax_method(map.localurl+map.queryclubcardrecord,
        'token='+localStorage.getItem('token')+'&type=recharge&page='+page+'&size=10',
        'post',function successCallBack(a){
        var rechangedata = JSON.parse(a).data.items
        if(page > JSON.parse(a).data.pageCount){
            document.getElementsByClassName('loadmore')[0].style.display='block';
            return;
        }
        // console.log(rechangedata)
        for(var i = 0;i < rechangedata.length;i++){
            var tr = document.createElement('tr')
            var receiverId = '1'+ rechangedata[i].receiverId.substring(3)
            // var receiverId = rechangedata[i].receiverId
            //
            console.log(receiverId)
            rechangedata[i].accountingTime = formatDate(new Date(rechangedata[i].accountingTime))
            rechangedata[i].accountingAmount = Math.abs(rechangedata[i].accountingAmount)
            tr.innerHTML =
                '<td style="width:2.5rem;">'+rechangedata[i].receiver+' <br> '+rechangedata[i].receiverId+'</td>'+
                '<td>'+rechangedata[i].product+'</td>'+
                '<td>'+rechangedata[i].accountingAmount+'</td>'+
                '<td>'+rechangedata[i].accountingTime+'</td>\n' +
                '<td>'+
                    '<input type="button" value="充值" class="btn1 recharge" onclick="recharge('+receiverId+')"/><br/>'+
                '</td>'
            document.getElementById('table3').appendChild(tr)
        }
    })
}

cz(1)

var vid = 1;
//加载更多
//滚动事件触发
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
        vid++;
        cz(vid)
    }
};

var input = document.getElementById('ssid')
var del = document.getElementsByClassName('delete')[0]
input.oninput = function(){
    if(input.value.length > 0){
        del.style.display = 'block'
    }else{
        del.style.display = 'none'
    }
}
del.onclick = function(){
    input.value = ''
    del.style.display = 'none'
}

var id,deserve,memberId,redata,shuzhi;
function recharge(receiverId){
    if(receiverId.toString().length > 6){
        var id = receiverId.toString().substring(1)
    }else{
        var id = receiverId
    }
    console.log(id)
    ajax_method(map.localurl + map.confirm,
        'memberId='+id+'&agentId=',
        'post', function successCallBack(h){
        console.log(JSON.parse(h))
        redata = JSON.parse(h)
        if(redata.msg == 'invalid memberId'){
            show(document.getElementsByClassName('mask8'),'')
        }else{
            show(document.getElementsByClassName('mask'),document.getElementsByClassName('mask1'));
            memberId = redata.data.memberId;
            var html4 = '<div id="Card">玩家充值</div>\n'+
            '<div class="player">\n'+
                '<span>充值对象：'+redata.data.memberName+'</span>\n'+
                '<span>ID：'+redata.data.memberId+'</span>\n'+
            '</div>\n'+
            '<div class="topup_type">\n'+
                '<p>充值类型</p>\n'+
                '<span id="ri" class="pocket">\n'+
                    '<img src="../img/icon_rika.png" alt="">\n'+
                    '<img src="../img/select.png" alt="">\n'+
                '</span>\n'+
                '<span id="zhou" class="pocket">\n'+
                    '<img src="../img/icon_zhouka.png" alt="">\n'+
                    '<img src="../img/select.png" alt="">\n'+
                '</span>\n'+
                '<span id="yue" class="pocket">\n'+
                    '<img src="../img/icon_yueka.png" alt="">\n'+
                    '<img src="../img/select.png" alt="">\n'+
                '</span>\n'+
                '<span id="ji" class="pocket">\n'+
                    '<img src="../img/icon_jika.png" alt="">\n'+
                    '<img src="../img/select.png" alt="">\n'+
                '</span>\n'+
                '<span id="yu" class="pocket">\n'+
                    '<img src="../img/icon_jade.png" alt="">\n'+
                    '<img src="../img/select.png" alt="">\n'+
                '</span>\n'+
            '</div>\n'+
            '<div class="number">\n'+
                '<img src="../img/icon_shuliang.png" alt="">\n'+
                '<input type="number" placeholder="请输入充值数量，如1,2" id="number" pattern="[0-9]*">\n'+
            '</div>\n'+
            '<div class="DIVIDE devidecard">\n'+
                '<input type="button" value="1">\n'+
                '<input type="button" value="2">\n'+
                '<input type="button" value="3">\n'+
            '</div>\n'+
            '<div class="DIVIDE devideyu">\n'+
                '<input type="button" value="2000">\n'+
                '<input type="button" value="12000">\n'+
                '<input type="button" value="18000">\n'+
            '</div>\n'+
            '<div class="querycard">\n'+
                '<span onclick="hide(document.getElementsByClassName(\'mask\'))">取消</span>\n'+
                '<span onclick="sure()">确认充值</span>\n'+
            '</div>'+
            '<div class="tip" id="tip">\n'+
            '</div>'
            document.getElementsByClassName('GAME_GUIDE')[0].innerHTML = html4;
    
            var spans = document.getElementsByClassName('pocket');
            var devideyu = document.getElementsByClassName('devideyu')[0];
            var devidecard = document.getElementsByClassName('devidecard')[0];
            var NUMBER = document.getElementById('number')
            for(var i = 0;i < spans.length;i++){
                spans[i].onclick = function(){
                    for(var j=0;j<spans.length;j++){
                        spans[j].children[1].style.display = 'none';
                    }
                    this.children[1].style.display = 'block';
                    // console.log(this.id);
                    id = this.id;
                    if(this.id == 'yu'){
                        devideyu.style.display = 'block';
                        devideyu.previousElementSibling.style.display = 'none'
                    }else{
                        devideyu.style.display = 'none';
                        devideyu.previousElementSibling.style.display = 'block'
                    }
                }
            } 
            console.log(devidecard.children)
            for(var k = 0;k < devidecard.children.length;k++){
                devidecard.children[k].onclick = function(){
                    // console.log(this.value)
                    deserve = this.value
                    for(var r=0;r<devidecard.children.length;r++){
                        devidecard.children[r].className = '';
                    }
                    this.className = 'select'
                    NUMBER.value = ''
                }
            }
            for(var t = 0;t < devideyu.children.length;t++){
                devideyu.children[t].onclick = function(){
                    // console.log(this.value)
                    deserve = this.value
                    for(var s=0;s<devideyu.children.length;s++){
                        devideyu.children[s].className = '';
                    }
                    this.className = 'select'
                    NUMBER.value = ''
                }
            }
            NUMBER.oninput = function(){
                // console.log(this.value)
                shuzhi = this.value
                if(this.value.length > 0){
                    deserve = ''
                    for(var k = 0;k < devidecard.children.length;k++){
                        devidecard.children[k].className = ''
                    }
                    for(var t = 0;t < devideyu.children.length;t++){
                        devideyu.children[t].className = ''
                    }
                }
            }
        
        }
    })
}
var inputs = document.getElementsByTagName('input')
for(var i = 0;i < inputs.length;i++){
    inputs[i].onblur = function(){
        window.scroll(0,0);
    }
    inputs[i].onchange = function(){
        window.scroll(0,0);
    }
}


function sure(){
    if(deserve){
        var amount = deserve
    }else{
        var amount = shuzhi
    }
    console.log(amount)
    ajax_method(map.localurl + map.rechargeCheck, 
        'token='+localStorage.getItem('token')+'&memberId='+memberId+'&card='+id+'&number='+amount,
        'post', function successCallBack(h){
        console.log(JSON.parse(h))
        var rechargeCheck = JSON.parse(h)
        if(rechargeCheck.success){
            show(document.getElementsByClassName('mask1'),document.getElementsByClassName('mask'))
            console.log(redata)
            if(id == 'yu'){
                var ka = '玉石'
                var html4 = ' <div class="headline">\n' +
                '                <p>请确认充值内容</p>\n' +
                '                <img src="'+rechargeCheck.data.headimgurl+'" alt="">'+
                '                <p>玩家：'+redata.data.memberId+'</p>\n' +
                '                <p>昵称：'+redata.data.memberName+'</p>\n' +
                '                <p>'+ka+'：'+amount+'个</p>\n' +
                '            </div>\n' +
                '            <div class="querycard">\n' +
                '                <span onclick="show(document.getElementsByClassName(\'mask\'),document.getElementsByClassName(\'mask1\'))">返回修改</span>\n' +
                '                 <input onclick="sure1()" value="确认充值" class="qrcz" type="button">\n' +
                '            </div>\n'
            }else{
                if(id == 'ri'){
                    var ka = '日卡'
                }
                if(id == 'zhou'){
                    var ka = '周卡'
                }
                if(id == 'yue'){
                    var ka = '月卡'
                }
                if(id == 'ji'){
                    var ka = '季卡'
                }
                var html4 = ' <div class="headline">\n' +
                '                <p>请确认充值内容</p>\n' +
                '                <img src="'+rechargeCheck.data.headimgurl+'" alt="">'+
                '                <p>玩家：'+redata.data.memberId+'</p>\n' +
                '                <p>昵称：'+redata.data.memberName+'</p>\n' +
                '                <p>'+ka+'：'+amount+'张</p>\n' +
                '            </div>\n' +
                '            <div class="querycard">\n' +
                '                <span onclick="show(document.getElementsByClassName(\'mask\'),document.getElementsByClassName(\'mask1\'))">返回修改</span>\n' +
                '                 <input onclick="sure1()" value="确认充值" class="qrcz" type="button">\n' +
                '            </div>\n'
            } 
            document.getElementsByClassName('confirm_prepaid_phone')[0].innerHTML = html4;
        }else{
            var tip = '<img src="../img/icon_woring.png" alt="">'+rechargeCheck.msg;
            document.getElementById('tip').innerHTML = tip
            document.getElementById('tip').style.display = 'block'
        }
    })
}
//第二次确认充值
function sure1(){
    console.log(111)
    document.getElementsByClassName('qrcz')[0].disabled = 'true'
    if(deserve){
        var amount = deserve
    }else{
        var amount = document.getElementById('number').value
    }
    ajax_method(map.localurl+map.recharge,
        'token='+localStorage.getItem('token')+
        '&memberId='+redata.data.memberId+
        '&card='+id+
        '&number='+amount,'post',function successCallBack(a){
        var sure = JSON.parse(a);
        console.log(sure)
        if(sure.success){
            show(document.getElementsByClassName('mask2'),document.getElementsByClassName('mask1'))
            ajax_method(map.localurl + map.queryaccount, 'token='+localStorage.getItem('token'), 'post', function successCallBack(c){
                var html7 = '<div class="headline">充值成功！</div>\n' +
                    '            <img src="../img/icon_success.png" alt="">\n' +
                    '            <div class="message">目前剩余 <br>\n' +
                    '                日卡：'+JSON.parse(c).clubCardRi+'张，周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张，玉石：'+JSON.parse(c).coins+'个 \n' +
                    '</div>\n' +
                    '            <div class="querycard">\n' +
                    '                <a href="membership_card.html" onclick="hide(document.getElementsByClassName(\'mask2\'))">玩家充值</a>\n' +
                    '                <a href="recharge_record.html?id="'+redata.data.memberId+'>充值记录</a>\n' +
                    '            </div>'
                document.getElementsByClassName('recharged_successfully')[0].innerHTML = html7;
            })
        }else{
            show(document.getElementsByClassName('mask6'),document.getElementsByClassName('mask1'))
        }
    })
}


