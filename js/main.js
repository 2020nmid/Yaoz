window.onload = function(){
    mv.app.toTip();
    mv.app.toSel();
    mv.app.toRun();
};

var mv = {};
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
mv.ui.moveLeft = function(obj,old,now){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let iSpeed = (now - old)/20;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (now === old){
            clearInterval(obj.timer);
        }
        else{
            old +=iSpeed;
            obj.style.left = old + 'px';
        }
    })
}

mv.app = {};

// mv.ui.fadeIn = function(obj){
//     let value = 0;
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         let iSpeed = 5;
//         if(value === 100){
//             clearInterval(obj.timer);
//         }
//         else {
//             value += iSpeed;
//             obj.style.opacity = value/100;
//             obj.style.filter = 'alpha(opacity='+value+')';
//         }
//     },30);
// }
// mv.ui.fadeOut = function(obj){
//     let value = 100;
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         let iSpeed = -5;
//         if(value === 0){
//             clearInterval(obj.timer);
//         }
//         else{
//             value += iSpeed;
//             obj.style.opacity = value/100;
//             obj.style.filter = 'alpha(opacity='+value+')';
//         }
//     },30)
// }

mv.app.toTip = function () {
    let oText1 = document.getElementById('text1');
    let oText2 = document.getElementById('text2');

    mv.ui.textChange(oText1,'Search website');
    mv.ui.textChange(oText2,'Search website');
};
// mv.app.toBanner = function () {
//     let oDd = document.getElementById('ad');
//     let iNow = 0;
//     let aLi = oDd.getElementsByTagName('li');
//     let timer = setInterval(auto,3000);
//     function auto() {
//         if (iNow === aLi.length-1){
//             iNow = 0;
//         }
//         else {
//             iNow++;
//         }
//         for (let i=0;i<aLi.length;i++){
//             mv.ui.fadeOut(aLi[i]);
//         }
//         mv.ui.fadeIn(aLi(iNow));
//
//     }
// };
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
    const oRun = document.getElementById('run1');
    const oUl = oRun.getElementsByTagName('ul')[0];
    const aLi = oUl.getElementsByTagName('li');
    const oPrev = mv.tools.getByClass(oRun,'prev')[0];
    const oNext = mv.tools.getByClass(oRun,'next')[0];
    let iNow = 0;
    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
    oPrev.onclick = function () {
        if(iNow === 0){
            iNow = aLi.length/2;
            oUl.style.left = -oUl.offsetWidth/2 + 'px';
        }
        mv.ui.moveLeft(oUl,iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
        iNow++;
    };
    oNext.onclick = function () {
        if(iNow === aLi.length/2){
            iNow = 0;
            oUl.style.left = 0 + 'px';
        }
        mv.ui.moveLeft(oUl,iNow*(aLi[0].offsetWidth),-(iNow+1)*aLi[0].offsetWidth);
        iNow++;
    };
};