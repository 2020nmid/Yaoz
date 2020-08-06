import style from "./main.css";
const add = document.querySelector('.add-item');//找到添加事件的变表单，之所以需要监听form而不是input是因为这样用户回车时也会触发事件
const container = document.querySelector('.item');//找到将事项加入的元素
var items = JSON.parse(localStorage.getItem('items')) || [];
//        将添加的待办事件push进items数组中
function addItem(e){
    e.preventDefault();  //阻止表单提交的默认行为
    const text = (this.querySelector('[name=item]')).value;
    const item ={
        text,
        done: false
    };
    items.push(item);
    populateList(items, container);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}
//      将items数组中的事件添加到html页面中
function populateList(plate, plateList) {
    plateList.innerHTML=plate.map( (item, i) => {
        return`
        <li class="item-li">
            <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}>
            <lable class="item-text" for="item${i}">${item.text}</lable>
            <input type="button" value="删除" class="delete-item" >
        </li>
    `
    }).join('');
}
//        切换checked状态
function toggleDone(e) {
    if(!e.target.matches("input[type='checkbox']")) return; // 只有复选框才可以执行事件
    const el = e.target;
    const index = el.dataset.index;
    items[index].done =!items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, container);
}
//        删除事件
function deleteDone(e) {
    const msg ='确定删除该项事件？'
    if(!e.target.matches("input[type='button']")) return; // 只有复选框才可以执行事件
    const el = e.target;
    const index = el.dataset.index;
    if(confirm(msg)){
        items.splice(index,1); //将选中数组删除
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, container);
    }else{
        return;
    }
}

add.addEventListener('submit', addItem);
container.addEventListener('click', toggleDone);
container.addEventListener('click', deleteDone);

populateList(items, container);