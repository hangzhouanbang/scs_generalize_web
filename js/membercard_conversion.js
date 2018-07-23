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

var token = 'ed9430fc-4def-4721-ad56-8c361a6521f3'

//初始化数据
function init() {
    ajax_method(map.localurl + map.queryagentclubcard, 'token=' + token+'payType=积分', 'post', function successCallBack(a) {
        var data = JSON.parse(a)
         html = '兑换物品'+
             ' <tr>\n' +
             '        <td align="center">\n' +
             '            <div class="d_goods">\n' +
             '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
             '                <span id="sp1">'+data.data.pageNum+'张</span>\n' +
             '                <span>'+ data.data.pageCount+'积分</span>\n' +
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

