function show(dom1,dom2){
    for (var i = 0; i<dom1.length;i++) {
        dom1[i].style.display = 'block';
    };
    for (var j = 0; j<dom1.length;j++) {
        dom2[j].style.display = 'none';
    };
}
function hide(dom){
    for (var i = 0; i<dom.length;i++) {
        dom[i].style.display = 'none';
    };
}