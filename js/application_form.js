var area1 = new LArea();
area1.init({
    'trigger': '#place', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
    'valueTo': '', //选择完毕后id属性输出到该位置
    'keys': {
        id: 'id',
        name: 'name'
    }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
    'type': 1, //数据源类型
    'data': LAreaData //数据源
});
//提交申请
function apply(){
    var phone = document.getElementById('phone').value;
    var userName = document.getElementById('name').value;
    var area = document.getElementById('place').value;
    var reg = "^1[3|4|5|7|8|9][0-9]\\d{8}$";
    var re = new RegExp(reg);
    if(phone == ''){
        alert('手机号不能为空');
        return;
    }else if(!re.test(phone)){
        alert('手机号码格式不正确');
        return;
    }
    if(userName == ''){
        alert('姓名不能为空');
        return;
    }
    if(area == ''){
        alert('地区不能为空');
        return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open('post',map.localurl+map.agentapply);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send('token='+localStorage.getItem('token')+
        '&phone='+phone+
        '&userName='+userName+
        '&area='+area+
        '&bossId='+document.getElementById('code').value+
        '&desc='+document.getElementById('comment').value);
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4&&ajax.status==200) {
            console.log(ajax.responseText);
            var data = JSON.parse(ajax.responseText)
            if(data.success){
                window.location.href='login_limit.html'
            }
        }
    }
}
