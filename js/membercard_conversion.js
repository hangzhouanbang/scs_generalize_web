function show(dom1, dom2) {
    for (var i = 0; i < dom1.length; i++) {
        dom1[i].style.display = 'block';
    }
    ;
    for (var j = 0; j < dom1.length; j++) {
        dom2[j].style.display = 'none';
    }
    ;
    init();
}

function hide(dom) {
    for (var i = 0; i < dom.length; i++) {
        dom[i].style.display = 'none';
    }
    ;
    init();
}

var token = '28757783-0d14-4c28-963b-daf2d9a0b10d'

//初始化数据
function init() {
     ajax_method(map.localurl + map.queryagentclubcard, 'token=' + token + '&payType=积分', 'post', function successCallBack(a) {
        var data = JSON.parse(a)
        html = '兑换物品' +
            ' <tr>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span id="sp1">' + data.forecast.low + '张</span>\n' +
            '                <span>' + data.forecast.high + '积分</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    兑换\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>10张</span>\n' +
            '                <span>4600积分</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    兑换\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>' +
            ' <tr>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>3张</span>\n' +
            '                <span>3000积分</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    兑换\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>10张</span>\n' +
            '                <span>1000积分</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    兑换\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>' +
            ' <tr>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>3张</span>\n' +
            '                <span>9000积分</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    兑换\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>10张</span>\n' +
            '                <span>30000积分</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    兑换\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>';
        document.getElementById('table_integral').innerHTML = html;
    })
}

init();

function show() {
    show(document.getElementsByClassName('confirm_prepaid_phone'), document.getElementsByClassName('GAME_GUIDE'));
    var obj = {
        memberId: document.getElementById("playerID").value,
        card: document.getElementById("Stdmode").value,
        number: document.getElementById("number").value
    }
    var html4 = '<div class="headline">请确认使用内容 <br> 给玩家' + obj.memberId + ' 充值' + obj.number + '张会员' + obj.card + '</div>\n' +
        '    <div class="querycard">\n' +
        '        <span onclick="sure1()">确认充值</span>\n' +
        '        <span onclick="show(document.getElementsByClassName(\'GAME_GUIDE\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">返回修改</span>\n' +
        '    </div>\n' +
        '    <div class="X" onclick="hide(document.getElementsByClassName(\'confirm_prepaid_phone\'))">x</div>'
    document.getElementsByClassName('confirm_prepaid_phone')[0].innerHTML = html4;
}

