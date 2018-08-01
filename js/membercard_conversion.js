function back() {
    window.location.href = 'first_index.html?token='+localStorage.getItem('token')
}

function hide(dom) {
    for (var i = 0; i < dom.length; i++) {
        dom[i].style.display = 'none';
    }
    init();
}

//初始化数据
function init() {
    ajax_method(map.localurl + map.queryagentclubcard, 'token='+localStorage.getItem('token') + '&payType=积分', 'post', function successCallBack(a) {
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
                '                     onclick="conversion(\''+ data.data.items[i].number+'\',\''+ data.data.items[i].price +'\',\''+ data.data.items[i].id +'\',\''+ data.data.items[i].product+'\')">\n' +
                '                    兑换\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </td>';
            document.getElementById('table_integral').appendChild(tr);
        }
    })
}

init();

function conversion(number,price,id,product) {
    document.getElementsByClassName('Donation')[0].style.display = 'block'
    var html2 = ' <div class="headline">请确认兑换内容<br>\n' +
        '        消耗' + price + '礼券兑换' + number + '张月卡\n' +
        '    </div>\n' +
        '    <div class="querycard">\n' +
        '        <span  onclick="qr(\''+id+'\',\''+number+'\',\''+product+'\')">确认兑换</span>\n' +
        '        <a href="membercard_conversion.html" onclick="hide(document.getElementsByClassName(\'Donation\'))">我再想想</a>\n' +
        '    </div>';
    document.getElementById('don').innerHTML = html2;
}

function qr(id,number,product) {
    ajax_method(map.localurl + map.buyscoreclubcard,
        'token=' + localStorage.getItem('token') + '&cardId=' + id, 'post', function successCallBack(a) {
        var data = JSON.parse(a);
        if (data.success == true) {
            document.getElementsByClassName('examples_of_successful')[0].style.display = 'block'
            document.getElementsByClassName('Donation')[0].style.display = 'none'
            ajax_method(map.localurl + map.queryaccount, 'token=' + localStorage.getItem('token'), 'post', function successCallBack(c){
                var html3 = ' <div class="headline">恭喜您成功兑换<br/>' + number + '张'+product+'</div>\n' +
                    '    <div class="querycard">\n' +
                    '        <a href="for_record.html">查看兑换记录</a>\n' +
                    '        <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'examples_of_successful\'))">返回首页</a>\n' +
                    '    </div>\n' +
                    '    <br>\n' +
                    '    <div class="mess">目前会员周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                    '    <br>';
                document.getElementById('eos').innerHTML = html3;
            })

        } else if (data.success == false) {
            alert('仓库已售空')
        }
    })
}
