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
    ajax_method(map.localurl + map.queryagentclubcard,
        'token='+localStorage.getItem('token'), 'post', function successCallBack(a) {
        var data = JSON.parse(a).data.list.items
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');
            tr.className = 'tr'
            if(data[i].product == '玉石'){
                tr.innerHTML =
                    '        <td>' +
                    '            <div class="d_goods" id="">\n' +
                    '                <div><img src="' + data[i].productPic + '" class="i_img"></div>\n' +
                    '                <div class="select">' +
                    '                   <p>' + data[i].number + '个</p>\n' +
                    '                   <p>' + data[i].price + '元</p>\n' +
                    '                </div>\n' +
                    '                <span style="display: none"> </span>\n' +
                    '                <div class="btn"\n' +
                    '                     onclick="buy(\''+ data[i].number+'\',\''+ data[i].price +'\',\''+ data[i].id +'\',\''+ data[i].product+'\',\''+ data[i].productPic +'\')">\n' +
                    '                    购买\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </td>';
            }else{
                tr.innerHTML =
                    '        <td>' +
                    '            <div class="d_goods" id="">\n' +
                    '                <div><img src="' + data[i].productPic + '" class="i_img"></div>\n' +
                    '                <div class="select">' +
                    '                   <p>' + data[i].number + '张</p>\n' +
                    '                   <p>' + data[i].price + '元</p>\n' +
                    '                </div>\n' +
                    '                <span style="display: none"> </span>\n' +
                    '                <div class="btn"\n' +
                    '                     onclick="buy(\''+ data[i].number+'\',\''+ data[i].price +'\',\''+ data[i].id +'\',\''+ data[i].product+'\',\''+ data[i].productPic +'\')">\n' +
                    '                    购买\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </td>';
            }
            document.getElementById('table_buy').appendChild(tr);
        }
    })
}
init();

function buy(number,price,id,product,productPic) {
    document.getElementsByClassName('mask')[0].style.display = 'block'
    if(product == '玉石'){
        var html2 = ' <div class="headline">请确认购买内容</div>\n' +
            '<img src="'+ productPic +'">'+
            '<div class="headline_content">以' + price + '元购买' + number + '个'+ product+'</div>\n'+
            '    <div class="querycard">\n' +
            '        <a href="membercard_buy.html" onclick="hide(document.getElementsByClassName(\'mask\'))">我再想想</a>\n' +
            '        <span onclick="qr(\''+id+'\',\''+number+'\',\''+product+'\',\''+productPic+'\')">确认购买</span>\n' +
            '    </div>';
    }else{
        var html2 = ' <div class="headline">请确认购买内容</div>\n' +
            '<img src="'+ productPic +'">'+
            '<div class="headline_content">以' + price + '元购买' + number + '张会员'+ product+'</div>\n'+
            '    <div class="querycard">\n' +
            '        <a href="membercard_buy.html" onclick="hide(document.getElementsByClassName(\'mask\'))">我再想想</a>\n' +
            '        <span onclick="qr(\''+id+'\',\''+number+'\',\''+product+'\',\''+productPic+'\')">确认购买</span>\n' +
            '    </div>';
    }
    document.getElementsByClassName('Donation')[0].innerHTML = html2;
}

function qr(id,number,product,productPic) {
    ajax_method(map.localurl + map.buycostclubcard,
        'token=' + localStorage.getItem('token') + '&cardId=' + id, 'post', function successCallBack(a) {
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
                            document.getElementsByClassName('mask1')[0].style.display = 'block'
                            document.getElementsByClassName('mask')[0].style.display = 'none'
                            ajax_method(map.localurl + map.queryaccount,
                                'token=' + localStorage.getItem('token'), 'post', function successCallBack(c){
                                if(product == '玉石'){
                                    var html3 = '<div class="headline">恭喜您购买成功</div>\n' +
                                        '        <img src="'+productPic+'" alt="">\n' +
                                        '        <div class="headline_content">'+ number +'个'+ product +'</div>\n' +
                                        '        <div class="mess">目前会员日卡：'+JSON.parse(c).clubCardRi+'张，周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                                        '        <div class="querycard">\n' +
                                        '            <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'mask1\'))">返回首页</a>\n' +
                                        '            <a href="purchase_history.html">购买记录</a>\n' +
                                        '        </div>'
                                }else{
                                    var html3 = '<div class="headline">恭喜您购买成功</div>\n' +
                                        '        <img src="'+productPic+'" alt="">\n' +
                                        '        <div class="headline_content">'+ number +'张会员'+ product +'卡</div>\n' +
                                        '        <div class="mess">目前会员日卡：'+JSON.parse(c).clubCardRi+'张，周卡：'+JSON.parse(c).clubCardZhou+'张，月卡：'+JSON.parse(c).clubCardYue+'张，季卡：'+JSON.parse(c).clubCardJi+'张</div>\n' +
                                        '        <div class="querycard">\n' +
                                        '            <a href="first_index.html" onclick="hide(document.getElementsByClassName(\'mask1\'))">返回首页</a>\n' +
                                        '            <a href="purchase_history.html">购买记录</a>\n' +
                                        '        </div>'
                                }
                                document.getElementsByClassName('examples_of_successful')[0].innerHTML = html3;
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
            document.getElementsByClassName('mask2')[0].style.display = 'block';
        }
    })
}
