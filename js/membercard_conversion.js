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

//初始化数据
function init() {
    ajax_method(map.localurl + map.queryagentclubcard, 'token=' + token + '&payType=积分', 'post', function successCallBack(a) {
        var data = JSON.parse(a)
        for (var i = 0; i < data.data.items.length; i++) {
            var tr = document.createElement('tr');
            //console.log(data.data.items[i].price)
            tr.className = 'tr'
            tr.innerHTML =
                '        <td>\n' +
                '            <div class="d_goods">\n' +
                '                <div><img src="' + data.data.items[i].productPic + '" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
                '                <span id="sp1">' + data.data.items[i].number + '张</span>\n' +
                '                <span>' + data.data.items[i].price + '礼券</span>\n' +
                '                <span style="display: none">' + data.data.items[i].id + '</span>\n' +
                '                <div class="btn"\n' +
                '                     onclick="conversion()">\n' +
                '                    兑换\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </td>';
            document.getElementById('table_integral').appendChild(tr);

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

function conversion(e) {
    var e = event || window.event;
    //console.log(e)
    document.getElementsByClassName('Donation')[0].style.display = 'block'
    sessionStorage.setItem('id', e.path[1].children[3].innerHTML);
    html2 = ' <div class="headline">请确认兑换内容<br>\n' +
        '        消耗' + e.path[1].children[2].innerHTML + '兑换' + e.path[1].children[1].innerHTML + '月卡\n' +
        '    </div>\n' +
        '    <div class="querycard">\n' +
        '        <span  onclick="qr()">确认兑换</span>\n' +
        '        <a href="membercard_conversion.html" onclick="hide(document.getElementsByClassName(\'Donation\'))">我再想想</a>\n' +
        '    </div>';
    document.getElementById('don').innerHTML = html2;
}

function qr() {
    ajax_method(map.localurl + map.buyscoreclubcard, 'token=' + token + '&cardId=' + sessionStorage.getItem('id'), 'post', function successCallBack(a) {
        var data = JSON.parse(a);
        if (data.success == true) {
            show(document.getElementsByClassName('examples_of_successful'), document.getElementsByClassName('Donation'))
        } else if (data.success == false) {
            alert('仓库已售空')
        }
    })
}
