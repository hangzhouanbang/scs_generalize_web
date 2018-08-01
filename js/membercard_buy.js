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
    ajax_method(map.localurl + map.queryagentclubcard, 'token=' + localStorage.getItem('token') + '&payType=微信', 'post', function successCallBack(a) {
        var data = JSON.parse(a).data.items
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');
            //console.log(data.data.items[i].price)
            tr.className = 'tr'
            tr.innerHTML =
                '        <td>' +
                '            <div class="d_goods" id="">\n' +
                '                <div><img src="' + data[i].productPic + '" class="i_img"></div>\n' +
                '                <span>' + data[i].number + '张</span>\n' +
                '                <span>' + data[i].price + '元</span>\n' +
                '                <span style="display: none"> </span>\n' +
                '                <div class="btn"\n' +
                '                     onclick="buy(\''+ data[i].number+'\',\''+ data[i].price +'\',\''+ data[i].id +'\',\''+ data[i].product+'\')">\n' +
                '                    购买\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </td>';
            document.getElementById('table_buy').appendChild(tr);
        }
    })
}
init();

function buy(number,price,id,product) {
    document.getElementsByClassName('Donation')[0].style.display = 'block'

    var html2 = ' <div class="headline">请确认购买内容<br>\n' +
        '        以' + price + '元购买' + number + '张会员'+ product +
        '    </div>\n' +
        '    <div class="querycard">\n' +
        '        <span onclick="qr(\''+id+'\',\''+number+'\',\''+product+'\')">确认购买</span>\n' +
        '        <a href="membercard_buy.html" onclick="hide(document.getElementsByClassName(\'Donation\'))">我再想想</a>\n' +
        '    </div>';
    document.getElementById('don').innerHTML = html2;
}

function qr(id,number,product) {
    ajax_method(map.localurl + map.buycostclubcard, 'token=' + localStorage.getItem('token') + '&cardId=' + id, 'post', function successCallBack(a) {
        var data = JSON.parse(a);
        if (data.success ==true) {
            function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId":data.data.appId,     //公众号名称，由商户传入
                        "timeStamp":data.data.timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr":data.data.nonceStr, //随机串
                        "package":data.data.package,
                        "signType":"MD5",         //微信签名方式：
                        "paySign":data.data.paySign //微信签名
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok"){
                            document.getElementsByClassName('examples_of_successful')[0].style.display = 'block'
                            document.getElementsByClassName('Donation')[0].style.display = 'none'
                            ajax_method(map.localurl + map.queryaccount, 'token=' + localStorage.getItem('token'), 'post', function successCallBack(c){
                                var html3 = '<div class="headline">您成功购买<br/>会员'+ product + number + '张</div>\n' +
                                    '    <div class="querycard">\n' +
                                    '        <a href="purchase_history.html">查看购买记录</a>\n' +
                                    '        <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'examples_of_successful\'))">返回首页</a>\n' +
                                    '    </div>\n' +
                                    '    <br>\n' +
                                    '    <div class="mess">目前会员周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                                    '    <br>';
                                document.getElementById('eos').innerHTML = html3;
                            })
                        }
                        if(res.err_msg == "get_brand_wcpay_request:cancel"){}
                        if(res.err_msg == "get_brand_wcpay_request:fail"){}
                    });
            }
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        }else if(data.success == false){
           alert('仓库已售空')
        }
    })
}
