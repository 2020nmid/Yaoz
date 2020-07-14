# Yao-Z group-Shu S.L.

## JS

现代 JavaScript 教程：zh.javascript.info

设计一个JS非线性动画（水平移动、先快后慢）：

```javascript
//线性动画过于生硬 商品栏点击一次箭头每20ms增加5px，直至205px→820ms
toright= next[0].onclick = function () {
        if (parseInt(move.style.left) ===-1230) {
            move.style.left = '-615px';
        }
        move.style.left = parseInt(move.style.left) - 5 + 'px';
        if(parseInt(move.style.left)%205!==0){
            let movement = setTimeout("toright()", 20);
        }
    }
```

```javascript
toleft = prev[0].onclick = function () {
        const original_distance = parseInt(move.style.left);
        const final_distance = original_distance - 205; //touch一次获取这两项
        leftinner = function(){
            let current_distance = parseInt(move.style.left);
            let speed = (-final_distance + current_distance) / 10;
            speed = Math.ceil(speed) //一定要向上取整 否则最后的left是小数无法满足要求
            if(parseInt(move.style.left)!==final_distance){
                let newleft = parseInt(move.style.left) - speed
                move.style.left =  newleft + 'px';
                movement = setTimeout("leftinner()", 20);
            }
            if (parseInt(move.style.left) <= -1230 || parseInt(move.style.left)>=0 ) { //初始化
                move.style.left = '-615px';
                clearTimeout(movement);
            }
        }
        leftinner();
    }
```

图片自动轮播：settimeout只会执行一次、setinterval可以反复

## CSS

盒模型 content-padding-border-margin

父级position若不是默认的static，子级的position设为absolute时不相对于body

span之间的回车会被认为是空格

**CSS Flex**-Flexible Box 弹性布局

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

使用flex的元素称为flex container，子元素为flex item

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

参考链接：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

**清除浮动**

在非IE浏览器（如Firefox）下，当容器的高度为auto，且容器的内容中有浮动（float为left或right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。

### 浏览器适应问题：怎么让footer贴着底/高度自适应

```html
<body style="width: 100%;height:100%;margin: 0 auto;">
<div style="background: red;width: 100%;height: 100px"></div>
<div style="background: orange;width: 100%;position: absolute;top: 100px;bottom: 100px"></div>
<div style="background: yellow;width: 100%;position: absolute;bottom: 0;height: 100px"></div>
</body>
```

