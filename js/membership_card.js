function show(dom1,dom2){
    for (var i = 0; i<dom1.length;i++) {
        dom1[i].style.display = 'block';
    };
    for (var j = 0; j<dom1.length;j++) {
        dom2[j].style.display = 'none';
    };
    init();
}
function hide(dom){
    for (var i = 0; i<dom.length;i++) {
        dom[i].style.display = 'none';
    };
    init();
}

//初始化数据
function init(){
    ajax_method(map.localurl+map.info,'token='+localStorage.getItem('token'),'post',function successCallBack(a){
        var data = JSON.parse(a)
        data.agent.createTime = formatDate(new Date(data.agent.createTime))
        var html3 = '<tr>\n' +
            '        <td>物品</td>\n' +
            '        <td>拥有数量</td>\n' +
            '        <td>操作</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/icon_rika.png" style="width: 0.66rem;height:0.9rem;"></td>\n' +
            '        <td>'+data.clubCardRi+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge" id="ri"\n' +
            '                   onclick="recharge(this)"/><br/>\n' +
            '            <input type="button" value="转赠"  class="btn1 donation zeng" id="ri1"\n' +
            '                   onclick="pass_on(this)"/>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/icon_zhouka.png" style="width: 0.66rem;height:0.9rem;"></td>\n' +
            '        <td>'+data.clubCardZhou+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge" id="zhou"\n' +
            '                   onclick="recharge(this)"/><br/>\n' +
            '            <input type="button" value="转赠"  class="btn1 donation zeng" id="zhou1"\n' +
            '                   onclick="pass_on(this)"/>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/icon_yueka.png" style="width: 0.66rem;height:0.9rem;"></td>\n' +
            '        <td>'+data.clubCardYue+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge" id="yue"\n' +
            '                   onclick="recharge(this)"/><br/>\n' +
            '            <input type="button" value="转赠" class="btn1 donation zeng" id="yue1"\n' +
            '                   onclick="pass_on(this)"/>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/icon_jika.png" style="width: 0.66rem;height:0.9rem;"></td>\n' +
            '        <td>'+data.clubCardJi+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge" id="ji"\n' +
            '                   onclick="recharge(this)"/><br/>\n' +
            '            <input type="button" value="转赠" class="btn1 donation zeng" id="ji1"\n' +
            '                   onclick="pass_on(this)"/>\n' +
            '        </td>\n' +
            '    </tr>'
        document.getElementById('table3').innerHTML = html3;
    })
}
init();
function recharge(e){
    show(document.getElementsByClassName('mask'),document.getElementsByClassName('mask1'));
    var input = document.getElementById('Card')
    if(e.id == 'ri') {
        input.value = '日卡'
    }else if(e.id == 'zhou'){
        input.value = '周卡'
    }else if(e.id == 'yue'){
        input.value = '月卡'
    }else if(e.id == 'ji'){
        input.value = '季卡'
    }
}
function pass_on(e){
    show(document.getElementsByClassName('mask3'),document.getElementsByClassName('mask5'))
    var input = document.getElementById('Card1')
    if(e.id == 'ri1'){
        input.value = '日卡'
    }else if(e.id == 'zhou1'){
        input.value = '周卡'
    }else if(e.id == 'yue1'){
        input.value = '月卡'
    }else if(e.id == 'ji1'){
        input.value = '季卡'
    }
}
//第一次确认充值
var number,num;
var number = document.getElementById('number')
number.oninput = function(){
    if(number.value < 0 ){
        number.value = 0;
    }
}
var num = document.getElementById('num')
num.oninput = function(){
    if(num.value < 0 ){
        num.value = 0;
    }
}
function sure(){
    show(document.getElementsByClassName('mask1'),document.getElementsByClassName('mask'));
    var obj = {
        memberId:document.getElementById("playerID").value,
        card:document.getElementById("Card").value,
        number:number.value
    }
    var html4= '<div class="headline">请确认使用内容 <br> 给玩家'+obj.memberId+' 充值'+obj.number+'张会员'+obj.card+'</div>\n' +
        '    <div class="querycard">\n' +
        '        <span onclick="show(document.getElementsByClassName(\'mask\'),document.getElementsByClassName(\'mask1\'))">返回修改</span>\n' +
        '        <span onclick="sure1()">确认充值</span>\n' +
        '    </div>\n' +
        '    <div class="X" onclick="hide(document.getElementsByClassName(\'mask1\'))">x</div>'
    document.getElementsByClassName('confirm_prepaid_phone')[0].innerHTML = html4;
}
//第二次确认充值
function sure1(){
    var card = document.getElementById("Card").value;
    if(card == '日卡'){
        card = 'ri'
    }
    if(card == '周卡'){
        card = 'zhou'
    }
    if(card == '月卡'){
        card = 'yue'
    }
    if(card == '季卡'){
        card = 'ji'
    }
    ajax_method(map.localurl+map.recharge,
        'token='+localStorage.getItem('token')+
        '&memberId='+ document.getElementById("playerID").value+
        '&card='+card+
        '&number='+number.value,'post',function successCallBack(a){
        var sure = JSON.parse(a);
        if(sure.success){
            show(document.getElementsByClassName('mask2'),document.getElementsByClassName('mask1'))
            ajax_method(map.localurl + map.queryaccount, 'token=' + localStorage.getItem('token'), 'post', function successCallBack(c){
                var html7 = '<div class="headline">充值成功！</div>\n' +
                    '        <img src="../img/icon_success.png" alt="">\n' +
                    '        <div class="message">目前会员日卡：'+JSON.parse(c).clubCardRi+'张，周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                    '        <div class="querycard">\n' +
                    '            <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'mask2\'))">返回首页</a>\n' +
                    '            <a href="recharge_record.html">充值记录</a>\n' +
                    '        </div>\n'
                document.getElementsByClassName('recharged_successfully')[0].innerHTML = html7;
            })
        }
    })
}
//第一次转增
function Donation1(){
    show(document.getElementsByClassName('mask4'),document.getElementsByClassName('mask3'));
    var obj = {
        memberId:document.getElementById("ID").value,
        card:document.getElementById("Card1").value,
        number:num.value
    }
    var html5 = " <div class=\"headline\">请确认转赠内容 <br>\n" +
        "        转赠推广员"+obj.memberId+"会员"+obj.card+obj.number+"张\n" +
        "    </div>\n" +
        "    <div class=\"querycard\">\n" +
        "        <a href=\"first_index.html\" onclick=\"hide(document.getElementsByClassName('mask4'))\">我再想想</a>\n" +
        "        <span onclick=\"Donation2()\">确认转赠</span>\n" +
        "    </div>"
    document.getElementsByClassName('Donation')[0].innerHTML = html5;
}
//转赠
function Donation2(){
    var card = document.getElementById("Card1").value;
    if(card == '日卡'){
        card = 'ri'
    }
    if(card == '周卡'){
        card = 'zhou'
    }
    if(card == '月卡'){
        card = 'yue'
    }
    if(card == '季卡'){
        card = 'ji'
    }
    ajax_method(map.localurl+map.giveclubcard,
        'token='+localStorage.getItem('token')+
        '&receiverId='+ document.getElementById("ID").value+
        '&card='+card+
        '&number='+num.value,'post',function successCallBack(a){
        var sure = JSON.parse(a);
        if(sure.success){
            show(document.getElementsByClassName('mask5'),document.getElementsByClassName('mask4'))
            ajax_method(map.localurl + map.queryaccount, 'token=' + localStorage.getItem('token'), 'post', function successCallBack(c){
                var html6 = '<div class="headline">转赠成功！</div>\n' +
                    '        <img src="../img/icon_success.png" alt="">\n' +
                    '        <div class="message">目前会员日卡：'+JSON.parse(c).clubCardRi+'张，周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                    '        <div class="querycard">\n' +
                    '            <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'mask5\'))">返回首页</a>\n' +
                    '            <a href="examples_record.html?id='+document.getElementById("ID").value+'">转赠记录</a>\n' +
                    '        </div>'
                document.getElementsByClassName('examples_of_successful')[0].innerHTML = html6;
            })
        }
    })
}