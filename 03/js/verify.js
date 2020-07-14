function createDistance(n) {
    //0到n的随机整数
    return Math.round(Math.random()*n);
}
function createCandidateArray() {
    const candidate = ['一','二','三','四','五','六','七','八','九','十'];
    let choose_one = createDistance(9);
    let choose_two;
    while (true){
        choose_two = createDistance(9);
        if(choose_two!==choose_one) {break;}
    }
    return [candidate[choose_one],candidate[choose_two]];
}
//定义left,top 一个字设置为50*50，所以left∈(0,210),top∈(0,212)
function verify() {
    let candidate = createCandidateArray();
    let left_first = createDistance(210);
    let top_first = createDistance(212);
    let a1 = document.getElementById("a_one");
    let a2 = document.getElementById("a_two");
    let tips = document.getElementById("tips");
    let btn = document.getElementById("button");
    let refresh = document.getElementById("refresh");
    let order = [];

    a1.innerHTML = candidate[0];
    a2.innerHTML = candidate[1];
    let correct_order = [a1.innerHTML,a2.innerHTML];
    tips.innerHTML = a1.innerHTML + a2.innerHTML;
    let left_second= createDistance(210);
    while (true){
        left_second= createDistance(210);
        if ((left_second-left_first)>=50||(left_second-left_first)<=-50) {break;}
    }//无需判断高度了，已经不重叠
    let top_second = createDistance(212);

    a1.style.left = left_first + "px";
    a1.style.top = top_first + "px";
    a2.style.left = left_second + "px";
    a2.style.top = top_second + "px";

    a1.onclick = function () {
        order.push(a1.innerHTML);
        a1.style.background = "white";
    }
    a2.onclick = function () {
        order.push(a2.innerHTML);
        a2.style.background = "white";
    }
    btn.onclick = function () {
        if (order[0]===correct_order[0]&&order[1]===correct_order[1]) {
            alert("correct");
        }else{
            alert("wrong");
            refresh_verify();
        }
    }
    refresh.onclick = function () {
        refresh_verify();
    }
    function refresh_verify() {
        a1.style.background = "red";
        a2.style.background = "red";
        order = [];

        candidate = createCandidateArray();
        a1.innerHTML = candidate[0];
        a2.innerHTML = candidate[1];
        correct_order = [a1.innerHTML,a2.innerHTML];
        tips.innerHTML = a1.innerHTML + a2.innerHTML;

        left_first = createDistance(210);
        top_first = createDistance(212);
        left_second= createDistance(210);
        while (true){
            left_second= createDistance(210);
            if ((left_second-left_first)>=50||(left_second-left_first)<=-50) {break;}
        }//无需判断高度了，已经不重叠
        top_second = createDistance(212);

        a1.style.left = left_first + "px";
        a1.style.top = top_first + "px";
        a2.style.left = left_second + "px";
        a2.style.top = top_second + "px";
    }
    // a3.style.left = left_third + "px";
    // a3.style.top = top_third + "px";
}
window.onload = function () {
    verify();
}