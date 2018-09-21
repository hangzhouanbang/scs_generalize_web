//上传图片
var img,img1;
var flag = 0;

ajax_method(map.localurl+map.getconfig,'url='+location.href.split('#')[0], 'post',function successCallBack(a){
    var data = JSON.parse(a)
    console.log(data.data)
    if(data.success){
        wx.config({
            debug: false, // 因为在手机上测试没法打印，当debug为true时，所有的返回值都会在手机上alert出来
            appId: data.data.appId, // 必填，公众号唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.noncestr, // 必填，生成签名的随机串
            signature: data.data.signature,// 必填，签名
            jsApiList: ['chooseImage','uploadImage','getLocalImgData'] // 必填，需要使用的JS接口列表，需要用到什么接口就去开发者文档查看相应的字段名
        });
    }
})
var images = {
    localId: [],
    serverId: []
};
var arrayImgs = new Array();
function upload(){
    wx.ready(function(){
        wx.chooseImage({
            count: 2, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                alert('已选择 ' + res.localIds.length + ' 张图片'); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var localIds  = res.localIds;
                console.log(localIds)
                document.getElementsByClassName('img')[0].style.height = '180px';
                if(window.__wxjs_is_wkwebview){
                    //alert(localIds[0])
                    for (var i = 0;i <localIds.length;i++ ) {
                        wx.getLocalImgData({
                            localId: localIds[i],
                            success: function (res) {
                                var localData = res.localData;
                                console.log(localData)
                                localData = localData.replace('jgp', 'jpeg');
                                var uploadimg1 = document.getElementsByClassName('uploadimg')[0];
                                uploadimg1.style.display = 'none';
                                var div = document.createElement('div');
                                div.innerHTML = '<img style="width:1.56rem;height:1.56rem;margin-left:0.3rem;" src="'+localData+'">';
                                document.getElementById('IMg').appendChild(div);
                            },
                            fail:function(res){
                                alert(res.errMsg);
                            }
                        });
                    }
                }else{
                    //遍历数组
                    console.log(localIds)
                    var uploadimg1 = document.getElementsByClassName('uploadimg')[0];
                    uploadimg1.style.display = 'none';
                    for(var i = 0;i < localIds.length;i++){
                        console.log(localIds[i])
                        var div = document.createElement('div');
                        div.innerHTML = '<img style="width:1.56rem;height:1.56rem;margin-left:0.3rem;" src="'+localIds[i]+'">';
                        document.getElementById('IMg').appendChild(div);
                    }
                }
                if (images.localId.length == 0) {
                    alert('请先选择图片');
                    return;
                }
                var i = 0, length = images.localId.length;
                images.serverId = [];
                function upload() {
                    wx.uploadImage({
                        localId: images.localId[i],
                        success: function (res) {
                            arrayImgs[i] = res.serverId
                            console.log(typeof(arrayImgs))
                            i++;
                            //alert('已上传：' + i + '/' + length);
                            images.serverId.push(res.serverId);
                            if (i < length) {
                                upload();
                            }else{
                                // 循环结束
                                console.log(arrayImgs)
                                // document.getElementById('upload').style.display = 'none';
                                // document.getElementById('IMg').style.margin = '0.3rem 0 0 0.2rem';
                            }
                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                }
                upload();
            }
        });
    });

}

//提交申请
function apply(){
    console.log(images.serverId)
    ajax_method(map.localurl+map.agentapply,
        'token='+localStorage.getItem('token')+
        '&phone='+document.getElementById('phone').value+
        '&userName='+document.getElementById('name').value+
        '&idCard='+document.getElementById('idCard').value+
        '&frontUrl='+images.serverId[0]+
        '&reverseUrl='+images.serverId[1],
        'post',function successCallBack(a){
        data = JSON.parse(a)
            if(data.success){
                window.location.href='login_limit.html'
            }
    })
}
