//上传图片
function doUpload(obj){
    var file = obj.files;
    var formData = new FormData(); // FormData 对象
    var keyname = 'anbang' + Math.random() + '.jpg'
    var a=[]
    ajax_method(map.localurl+map.uptoken,
     'accessKey=qQj7mRKyvE7dOOjObMC8W58i6Yn3penfr7-_fg4d&secretKey=9f70kmAddF1maP1U0jy0vRNAhwWNv_huR1xDSH_s&bucket=anbang',
     'post','application/x-www-form-urlencoded',function successCallBack(a) {
        console.log(file)
        formData.append("file", file[0])
        formData.append('token', JSON.parse(a).data)
        formData.append('key', keyname)
        console.log(keyname)
        var ajax = new XMLHttpRequest();
        ajax.open('post', map.domain);
        ajax.send(formData);
        ajax.onreadystatechange = function () {
            if (ajax.readyState==4&&ajax.status==200) {
                console.log(ajax.responseText);
                var img = JSON.parse(ajax.responseText).key;

                // for(var j = 0;j < img.length;j++){
                //     if( img.length < 3){
                        var div = document.createElement('div');
                        div.style.position = 'relative';
                        div.style.display = 'inline-block';
                        div.innerHTML = '<img style="width:100px;height:100px;" src="'+map.qiniuaddr + '/' + img+'">';
                        document.getElementById('IMg').appendChild(div);
                    // }
                // }
            }
        }
    })
}


//初始化数据
// var html=[];
// var data,tr;
// function init(page){
//     ajax_method(map.localurl+map.agentapply,'token='+token+'&page='+page+'&size=15','post',function successCallBack(a){
//         data = JSON.parse(a).data.items
//         console.log(data)
//         for(var i = 0;i < data.length;i++){
//             tr = document.createElement('tr')
//             data[i].createTime = formatDate(new Date(data[i].createTime))
//             tr.innerHTML =
//                 '<td>'+data[i].createTime+'</td>\n' +
//                 '<td>'+data[i].memberId+'</td>\n' +
//                 '<td>'+data[i].nickname+'</td>\n' +
//                 '<td>'+data[i].score+'</td>\n'
//             document.getElementById('table').appendChild(tr)
//         }
//     })
// }
// init(1);
