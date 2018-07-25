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
    ajax_method(map.localurl + map.queryagentclubcard, 'token=' + token + '&payType=微信', 'post', function successCallBack(a) {
        var data = JSON.parse(a)
        html = ' 购买物品\n' +
            '    <tr>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="data.data.items[0].productPic" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>' + data.data.items[0].number + '张</span>\n' +
            '                <span>' + data.data.items[0].price + '元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="data.data.items[1].productPic" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>' + data.data.items[1].number + '张</span>\n' +
            '                <span>' + data.data.items[1].price + '元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>\n';
        document.getElementById('table_buy').innerHTML = html;

        html2 = ' <div class="headline">请确认购买内容<br>\n' +
            '        以' + data.data.items[0].price + '元购买' + data.data.items[0].number + '张会员周卡\n' +
            '    </div>\n' +
            '    <div class="querycard">\n' +
            '        <span onclick="show(document.getElementsByClassName(\'examples_of_successful\'),document.getElementsByClassName(\'Donation\'))">确认购买</span>\n' +
            '        <a href="membercard_buy.html" onclick="hide(document.getElementsByClassName(\'Donation\'))">我再想想</a>\n' +
            '    </div>';
        document.getElementById('don').innerHTML = html2;

        html3 = '<div class="headline">您成功购买<br/>会员周卡' + data.data.items[0].number + '张</div>\n' +
            '    <div class="querycard">\n' +
            '        <a href="purchase_history.html">查看购买记录</a>\n' +
            '        <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'examples_of_successful\'))">返回首页</a>\n' +
            '    </div>\n' +
            '    <br>\n' +
            '    <div class="mess">目前会员周卡：6张，月卡：3张，季卡：3张</div>\n' +
            '    <br>';
        document.getElementById('eos').innerHTML = html3;

    })
}

init();