window.onload = function(){
    mv.app.toTip();
    mv.app.toSel();
    mv.app.toRun();
    mv.app.changepic();
};

let mv = {};
mv.ui = {};
mv.tools = {};
mv.tools.getByClass = function(oParent,sClass){
    let aEle = oParent.getElementsByTagName('*');
    let arr = [];
    for (let i=0;i<aEle.length;i++){
        if(aEle[i].className===sClass){
            arr.push(aEle[i]);
        }
    }
    return arr;
};
mv.ui.textChange = function (obj,str) {
    obj.onfocus = function () {
        if(this.value === str){
            this.value = '';
        }
    };
    obj.onblur = function () {
        if(this.value === ''){
            this.value = str;
        }
    };
};


mv.app = {};

mv.app.toTip = function () {
    let oText1 = document.getElementById('text1');
    let oText2 = document.getElementById('text2');

    mv.ui.textChange(oText1,'Search website');
    mv.ui.textChange(oText2,'Search website');
};

mv.app.toSel = function () {
    let oSel = document.getElementById('sel1');
    let aDd = oSel.getElementsByTagName('dd');
    let aUl = oSel.getElementsByTagName('ul');
    let aH2 = oSel.getElementsByTagName('h2');
    for (let i=0;i<aDd.length;i++){
        aDd[i].index = i;
        aDd[i].onclick = function (ev) {
            let eve =ev || window.Event;
            const This = this;
            for (let i=0;i<aUl.length;i++){
                aUl[i].style.display = 'none';
            }
            aUl[this.index].style.display = 'block';
            aUl[this.index].style.background = 'white';
            document.onclick = function () {
                aUl[This.index].style.display = 'none';
             };
            eve.cancelBubble = true;
        }
    }
    for (let i=0;i<aUl.length;i++){
        aUl[i].tabIndex = i;
        (function (ul) {
            let aLi = ul.getElementsByTagName('li');
            for (let i=0;i<aLi.length;i++){
                aLi[i].onmouseover = function () {
                    this.className = 'active';
                };
                aLi[i].onmouseout = function () {
                    this.className = '';
                };
                aLi[i].onclick = function (ev) {
                    let eve = ev || window.Event
                    aH2[this.parentNode.tabIndex].innerHTML = this.innerHTML;
                    eve.cancelBubble = true;
                    this.parentNode.style.display = 'none';
                };
            }
        })(aUl[i]);
    }
};
mv.app.toRun = function () {
    const prev = document.getElementsByClassName('prev');
    const next = document.getElementsByClassName('next');
    const move = document.getElementById('move');

    toright= next[0].onclick = function () {
        if (parseInt(move.style.left) ===-1230) {
            move.style.left = '-615px';
        }
        move.style.left = parseInt(move.style.left) - 5 + 'px';
        if(parseInt(move.style.left)%205!==0){
            let movement = setTimeout("toright()", 20);
        }
    }
    toleft = prev[0].onclick = function () {
        if (parseInt(move.style.left)===0) {
            move.style.left = '-615px';
        }
        move.style.left = parseInt(move.style.left) + 5 + 'px';
        if(parseInt(move.style.left)%205!==0){
            let movement = setTimeout("toleft()", 20);
        }
    }
};

//轮播图
mv.app.changepic = function () {
    const pic1 = document.getElementById("changepic0");
    const pic2 = document.getElementById("changepic1");
    const gonext = document.getElementById("gonext");
    const goprev = document.getElementById('goprev');
    const show1 = document.getElementById('showleft');
    const show2 = document.getElementById('showright');
    show1.onmouseover = goprev.onmouseover = function(){
        goprev.style.display='block';
    }
    show2.onmouseover = gonext.onmouseover = function(){
        gonext.style.display='block';
    }
    show1.onmouseout = function(){
        goprev.style.display='none';
    }
    show2.onmouseout = function(){
        gonext.style.display='none';
    }

    setInterval(function(){
        if (pic1.className==='changepic ch'){
            pic1.className = 'changepic';
            pic2.className = 'changepic ch';
        }
        else{
            pic1.className = 'changepic ch';
            pic2.className = 'changepic';
        }},3000);

    gonext.addEventListener('click',function () {
        if (pic1.className==='changepic ch'){
            pic1.className = 'changepic';
            pic2.className = 'changepic ch';
        }
        else{
            pic1.className = 'changepic ch';
            pic2.className = 'changepic';
        }
    })
    goprev.addEventListener('click',function () {
        if (pic1.className === 'changepic ch') {
            pic1.className = 'changepic';
            pic2.className = 'changepic ch';
        } else {
            pic1.className = 'changepic ch';
            pic2.className = 'changepic';
        }
    })
}
