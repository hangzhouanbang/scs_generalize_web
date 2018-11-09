var order;
ajax_method(map.localurl+map.queryimage,'token='+localStorage.getItem('token'),'post',function successCallBack(a){
    console.log(JSON.parse(a))
    var imgList = JSON.parse(a).data.imageList;
    for(var i = 0;i <imgList.length;i++){
        var li = document.createElement('li');
        li.innerHTML =
            '            <img src="'+imgList[i].downloadUrl+'" alt="" id="'+imgList[i].id+'">\n' +
            '            <img src="../img/icon_select.png" alt="">\n' +
            '            <p></p>\n'
        document.getElementsByTagName('ul')[0].appendChild(li)
    }
    var lis = document.getElementsByTagName('li');
    var oli = null,num=0;//oli是上一次的值,num是初始值
    oli = lis[num];
    for(var j = 0;j < lis.length;j++){
        lis.index = j;
        lis[j].onclick=function(e){
            console.log(e.srcElement.id)
            order = e.srcElement.id;
            oli.className = ''
            oli = this;
            this.className = 'native'
        }
    }
})
document.getElementsByClassName('erweima')[0].src = map.localurl+map.qrcode+'?token='+localStorage.getItem('token')
document.getElementsByClassName('btn')[0].onclick = function(){
    ajax_method(map.localurl+map.generateImag,
        'token='+localStorage.getItem('token')+'&imageId='+order,
        'post',function successCallBack(a) {
        console.log(JSON.parse(a).data.fileUrl)
            if(JSON.parse(a).success){
                window.location.href = 'generalize.html?src='+ JSON.parse(a).data.fileUrl;
            }else{
                alert('系统错误，请重试！')
            }
    })
}