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
    ajax_method(map.localurl+map.info,'token='+token,'post',function successCallBack(a){
        var data = JSON.parse(a)
        data.agent.createTime = formatDate(new Date(data.agent.createTime))
        html = '<tr>\n' +
            '        <td rowspan="3"><img src="'+data.agent.headimgurl+'" style="width: 2.2rem;height: 2.2rem;"></td>\n' +
            '        <td class="td_message">昵称：'+data.agent.nickname+'</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td class="td_message">推广员ID：'+data.agent.id+'</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td class="td_message">注册时间：'+data.agent.createTime+'</td>\n' +
            '    </tr>';
        html2='<tr>\n' +
            '        <td> 推广积分：'+data.score+'</td>\n' +
            '        <td>\n' +
            '            <a class="btn_member" href="membercard_conversion.html">会员卡兑换</a>\n' +
            '        </td>\n' +
            '        <td>\n' +
            '            <a class="btn_member" href="membercard_buy.html">会员卡购买</a>\n' +
            '        </td>\n' +
            '    </tr>';
        html3='<tr>\n' +
            '        <td>物品</td>\n' +
            '        <td>拥有数量</td>\n' +
            '        <td>操作</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/u15.png" style="width: 1.46rem;height:1.46rem;"></td>\n' +
            '        <td>'+data.clubCardZhou+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge"\n' +
            '                   onclick="show(document.getElementsByClassName(\'GAME_GUIDE\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))"/><br/>\n' +
            '            <input type="button" value="转赠" class="btn1 donation"\n' +
            '                   onclick="show(document.getElementsByClassName(\'zhuanzeng\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))"/>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/u15.png" style="width: 1.46rem;height:1.46rem;"></td>\n' +
            '        <td>'+data.clubCardYue+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge"\n' +
            '                   onclick="show(document.getElementsByClassName(\'GAME_GUIDE\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))"/><br/>\n' +
            '            <input type="button" value="转赠" class="btn1 donation"\n' +
            '                   onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))"/>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td><img src="../img/u15.png" style="width: 1.46rem;height:1.46rem;"></td>\n' +
            '        <td>'+data.clubCardJi+'</td>\n' +
            '        <td>\n' +
            '            <input type="button" value="充值账号" class="btn1 recharge"\n' +
            '                   onclick="show(document.getElementsByClassName(\'GAME_GUIDE\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))"/><br/>\n' +
            '            <input type="button" value="转赠" class="btn1 donation"\n' +
            '                   onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))"/>\n' +
            '        </td>\n' +
            '    </tr>';
        document.getElementById('table1').innerHTML = html;
        document.getElementById('table2').innerHTML = html2;
        document.getElementById('table3').innerHTML = html3;
    })
}
init();
//第一次确认充值
function sure(){
    show(document.getElementsByClassName('confirm_prepaid_phone'),document.getElementsByClassName('GAME_GUIDE'));
    var obj = {
        memberId:document.getElementById("playerID").value,
        card:document.getElementById("Stdmode").value,
        number:document.getElementById("number").value
    }
    var html4= '<div class="headline">请确认使用内容 <br> 给玩家'+obj.memberId+' 充值'+obj.number+'张会员'+obj.card+'</div>\n' +
        '    <div class="querycard">\n' +
        '        <span onclick="sure1()">确认充值</span>\n' +
        '        <span onclick="show(document.getElementsByClassName(\'GAME_GUIDE\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">返回修改</span>\n' +
        '    </div>\n' +
        '    <div class="X" onclick="hide(document.getElementsByClassName(\'confirm_prepaid_phone\'))">x</div>'
    document.getElementsByClassName('confirm_prepaid_phone')[0].innerHTML = html4;
}
//第二次确认充值
function sure1(){
    ajax_method(map.localurl+map.recharge,'token='+token+'&memberId='+
        document.getElementById("playerID").value+
        '&card='+document.getElementById("Stdmode").value+
        '&number='+document.getElementById("number").value,'post',function successCallBack(a){
        var sure = JSON.parse(a);
        if(sure.success){
            show(document.getElementsByClassName('recharged_successfully'),document.getElementsByClassName('confirm_prepaid_phone'))
        }
    })
}
//第一次转增
function Donation1(){
    show(document.getElementsByClassName('Donation'),document.getElementsByClassName('zhuanzeng'));
    var obj = {
        memberId:document.getElementById("ID").value,
        card:document.getElementById("type").value,
        number:document.getElementById("num").value
    }
    var html5= " <div class=\"headline\">请确认转赠内容 <br>\n" +
        "        转赠推广员"+obj.memberId+"会员"+obj.card+obj.number+"张\n" +
        "    </div>\n" +
        "    <div class=\"querycard\">\n" +
        "        <span onclick=\"Donation2()\">确认转赠</span>\n" +
        "        <a href=\"first_index.html\" onclick=\"hide(document.getElementsByClassName('Donation'))\">我再想想</a>\n" +
        "    </div>"
    document.getElementsByClassName('Donation')[0].innerHTML = html5;
}
//转赠
function Donation2(){
    ajax_method(map.localurl+map.giveclubcard,'token='+token+'&receiverId='+
        document.getElementById("ID").value+
        '&card='+document.getElementById("type").value+
        '&number='+document.getElementById("num").value,'post',function successCallBack(a){
        var sure = JSON.parse(a);
        if(sure.success){
            show(document.getElementsByClassName('examples_of_successful'),document.getElementsByClassName('Donation'))
        }
    })
}