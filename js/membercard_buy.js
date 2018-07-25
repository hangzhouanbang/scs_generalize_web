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

// var token = 'f82fdb93-7ea1-46e1-aeab-09a82b5cab30'
//初始化数据
function init() {
    ajax_method(map.localurl + map.queryagentclubcard, 'token=' + token + '&payType=微信', 'post', function successCallBack(a) {
        var data = JSON.parse(a)
        for (var i = 0; i < data.data.items.length; i++) {
            var tr = document.createElement('tr');
            console.log(data.data.items[i].price)
            tr.className = 'tr'
            tr.innerHTML =
                '        <td>' +
                '            <div class="d_goods">\n' +
                '                <div><img src="' + data.data.items[i].productPic + '" class="i_img"></div>\n' +
                '                <span>' + data.data.items[i].number + '张</span>\n' +
                '                <span>' + data.data.items[i].price + '元</span>\n' +
                '                <div class="btn"\n' +
                '                     onclick="buy()">\n' +
                '                    购买\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </td>';
            sessionStorage.setItem('id', data.data.items[i].id);
            document.getElementById('table_buy').appendChild(tr);



            html3 = '<div class="headline">您成功购买<br/>会员周卡' + data.data.items[i].number + '张</div>\n' +
                '    <div class="querycard">\n' +
                '        <a href="purchase_history.html">查看购买记录</a>\n' +
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

function buy(e){
    var e = event || window.event;
    document.getElementsByClassName('Donation')[0].style.display = 'block'
    html2 = ' <div class="headline">请确认购买内容<br>\n' +
        '        以' + e.path[1].children[2].innerHTML + '购买' + e.path[1].children[1].innerHTML + '会员周卡\n' +
        '    </div>\n' +
        '    <div class="querycard">\n' +
        '        <span onclick="qr()">确认购买</span>\n' +
        '        <a href="membercard_buy.html" onclick="hide(document.getElementsByClassName(\'Donation\'))">我再想想</a>\n' +
        '    </div>';
    document.getElementById('don').innerHTML = html2;
}

function qr() {
    ajax_method(map.localurl + map.buyscoreclubcard, 'token=' + token + '&cardId=' + sessionStorage.getItem('id'), 'post', function successCallBack(a) {
        var sure = JSON.parse(a);
        if (sure.success) {
            show(document.getElementsByClassName('examples_of_successful'), document.getElementsByClassName('Donation'))
        }
    })
}
