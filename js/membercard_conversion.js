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
    ajax_method(map.localurl + map.queryscoreclubcard, 'token='+localStorage.getItem('token'), 'post', function successCallBack(a) {
        document.getElementsByClassName('generalization')[0].innerHTML =
            ' <span>我的推广积分</span>\n' +
            '    <br>\n' +
            '    <span>'+JSON.parse(a).data.score+'</span>';
        var data = JSON.parse(a).data.list.items
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');
            //console.log(data.data.items[i].price)
            tr.className = 'tr'
            tr.innerHTML =
                '        <td>\n' +
                '            <div class="d_goods">\n' +
                '                <span id="sp1">' + data[i].number + '张</span>\n' +
                '                <div><img src="' + data[i].productPic + '" class="i_img"></div>\n' +
                '                <div class="select">' +
                '                   <span>' + data[i].price + '积分</span>\n' +
                '                   <span class="btn"\n' +
                '                     onclick="conversion(\''+ data[i].number+'\',\''+ data[i].price +'\',\''+ data[i].id +'\',\''+ data[i].product+'\',\''+ data[i].productPic+'\')">\n' +
                '                    兑换\n' +
                '                   </span>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </td>';
            document.getElementById('table_integral').appendChild(tr);
        }
    })
}

init();

function conversion(number,price,id,product,productPic) {
    document.getElementsByClassName('mask')[0].style.display = 'block'
    var html2 = '<div class="headline">请确认兑换内容</div>\n' +
        '        <img src="'+ productPic +'">\n' +
        '        <div class="headline_content">消耗' + price + '礼券兑换' + number + '张'+product+'</div>\n' +
        '        <div class="querycard">\n' +
        '            <a href="membercard_conversion.html" onclick="hide(document.getElementsByClassName(\'mask\'))">我再想想</a>\n' +
        '            <span onclick="qr(\''+id+'\',\''+number+'\',\''+product+'\',\''+productPic+'\')">确认兑换</span>\n' +
        '        </div>'
    document.getElementsByClassName('Donation')[0].innerHTML = html2;
}

function qr(id,number,product,productPic) {
    ajax_method(map.localurl + map.buyscoreclubcard,
        'token=' + localStorage.getItem('token') + '&cardId=' + id, 'post', function successCallBack(a) {
        var data = JSON.parse(a);
        if (data.success == true) {
            document.getElementsByClassName('mask1')[0].style.display = 'block'
            document.getElementsByClassName('mask')[0].style.display = 'none'
            ajax_method(map.localurl + map.queryaccount, 'token=' + localStorage.getItem('token'), 'post', function successCallBack(c){
                var html3 = '  <div class="headline">恭喜您兑换成功</div>\n' +
                    '        <img src="'+productPic+'" alt="">\n' +
                    '        <div class="headline_content">'+ number +'张'+product+'</div>\n' +
                    '        <div class="mess">目前会员周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                    '        <div class="querycard">\n' +
                    '            <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'mask1\'))">返回首页</a>\n' +
                    '            <a href="for_record.html">兑换记录</a>\n' +
                    '        </div>'
                document.getElementsByClassName('examples_of_successful')[0].innerHTML = html3;
            })

        } else if (data.success == false) {
            document.getElementsByClassName('mask2')[0].style.display = 'block';
        }
    })
}
