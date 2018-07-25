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

var token = 'f82fdb93-7ea1-46e1-aeab-09a82b5cab30'

//初始化数据
function init() {
    ajax_method(map.localurl + map.queryagentclubcard, 'token=' + token + '&payType=积分', 'post', function successCallBack(a) {
        var data = JSON.parse(a)
        for (var i = 0; i < data.data.items.length; i++) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '        <td align="center" rowspan="2">\n' +
                '            <div class="d_goods">\n' +
                '                <div><img src="' + data.data.items[i].productPic + '" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
                '                <span id="sp1">' + data.data.items[i].number + '张</span>\n' +
                '                <span>' + data.data.items[i].price + '积分</span>\n' +
                '                <div class="btn"\n' +
                '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
                '                    兑换\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </td>\n';
            sessionStorage.setItem('id', data.data.items[i].id);
            document.getElementById('table_integral').appendChild(tr);

            html2 = ' <div class="headline">请确认兑换内容<br>\n' +
                '        消耗' + data.data.items[i].price + '积分兑换' + data.data.items[i].number + '张月卡\n' +
                '    </div>\n' +
                '    <div class="querycard">\n' +
                '        <span  onclick="qr()">确认兑换</span>\n' +
                '        <a href="membercard_conversion.html" onclick="hide(document.getElementsByClassName(\'Donation\'))">我再想想</a>\n' +
                '    </div>';
            document.getElementById('don').innerHTML = html2;

            html3 = ' <div class="headline">恭喜您成功兑换<br/>' + data.data.items[i].number + '张月卡</div>\n' +
                '    <div class="querycard">\n' +
                '        <a href="for_record.html">查看兑换记录</a>\n' +
                '        <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'examples_of_successful\'))">返回首页</a>\n' +
                '    </div>\n' +
                '    <br>\n' +
                '    <div class="mess">目前会员周卡：6张，月卡：3张，季卡：3张</div>\n' +
                '    <br>';
            document.getElementById('eos').innerHTML = html3;
        }
    })
}

init();

function qr() {
    ajax_method(map.localurl + map.buyscoreclubcard, 'token=' + token + '&cardId=' + sessionStorage.getItem('id'), 'post', function successCallBack(a) {
        var sure = JSON.parse(a);
        if (sure.success) {
            show(document.getElementsByClassName('examples_of_successful'), document.getElementsByClassName('Donation'))
        }
    })
}
