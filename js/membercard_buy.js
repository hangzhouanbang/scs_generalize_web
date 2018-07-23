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
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>' + data.data.pageNum + '张</span>\n' +
            '                <span>' + data.data.pageItemsCount + '元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>10张</span>\n' +
            '                <span>460元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>15张</span>\n' +
            '                <span>700元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>3张</span>\n' +
            '                <span>300元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>10张</span>\n' +
            '                <span>1000元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>15张</span>\n' +
            '                <span>1500元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>3张</span>\n' +
            '                <span>300元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>10张</span>\n' +
            '                <span>1000元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '        <td align="center">\n' +
            '            <div class="d_goods">\n' +
            '                <div><img src="../img/u15.png" style="width: 1rem;height: 1rem;" class="i_img"></div>\n' +
            '                <span>15张</span>\n' +
            '                <span>1500元</span>\n' +
            '                <div class="btn"\n' +
            '                     onclick="show(document.getElementsByClassName(\'Donation\'),document.getElementsByClassName(\'confirm_prepaid_phone\'))">\n' +
            '                    购买\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </td>\n' +
            '    </tr>';
        document.getElementById('table_buy').innerHTML = html;
    })
}

init();