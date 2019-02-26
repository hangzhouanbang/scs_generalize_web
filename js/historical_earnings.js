var calendar = new datePicker();
var calendar1 = new datePicker();
function date(a,id){
    a.init({
        'trigger': id, /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'2018-10-1',/*最小日期*/
        'maxDate':'2100-12-31',/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
        },
        'onClose':function(){/*取消时触发事件*/
        }
    });
}
date(calendar,'#dateSelectorOne')
date(calendar1,'#dateSelectorTwo')
var startTime=0,endTime=0;
var dateSelectorOne = document.getElementById('dateSelectorOne')
var dateSelectorTwo = document.getElementById('dateSelectorTwo')
dateSelectorTwo.oninput = function(){
    endTime = new Date(dateSelectorTwo.value).getTime()
    startTime = new Date(dateSelectorOne.value).getTime()
    init()
}

function init(){
    if (localStorage.getItem('type') == '推广经理'){
        ajax_method(map.localurl+map.queryhistorycost,
            'token='+localStorage.getItem('token')+'&startTime='+startTime+'&endTime='+endTime,
            'post',function successCallBack(a) {
                var data = JSON.parse(a).data
                var li = document.getElementsByTagName('li')[0];
                li.innerHTML = '<span>玩家：' + data.memberCost + '元</span>\n' +
                        '<span>代理：' + data.juniorCost + '元</span>\n'
            })
    }else{
        ajax_method(map.localurl+map.queryhistoryreward,
            'token='+localStorage.getItem('token')+'&startTime='+startTime+'&endTime='+endTime,
            'post',function successCallBack(a) {
                var data = JSON.parse(a).data
                var li = document.getElementsByTagName('li')[0];
                li.innerHTML = '<span class="total_rebate">总返利：'+data.reward+'元</span>'
            })
    }
}
init()