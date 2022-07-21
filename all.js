let data = [];

const cardInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const txt = document.querySelector(".txt");
const tab = document.querySelector(".tab");
const uncompleted = document.querySelector(".uncompleted");
const delAll = document.querySelector(".delAll");



// 渲染功能
function render(){
    let unchecked = data.filter((item)=>{
        if(tab.querySelector(".active").textContent === "已完成"){
            return item.check == "checked";
        }else if(tab.querySelector(".active").textContent === "待完成"){
            return item.check == "";
        }else{
            return item.check == "checked" || item.check == "";
        }
    })
    let src = "";
    unchecked.forEach((item,index) => src += `<li data-id =${item.id}><label class="checkbox" for=""><input type="checkbox" data-check="${item.state}" data-num = ${index} ${item.check}/><span>${item.content}</span></label><a href="#" class="delete" data-num = ${index}></a>
    </li>`);

    list.innerHTML = src;

    // 顯示待完成數
    let total = 0;
    data.forEach((item)=>{
        if(item.state === "待完成"){
            total += 1;
        }
    })
    uncompleted.textContent = `${total} 個待完成項目`;
}

// 按鈕新增
addBtn.addEventListener("click",addItem)
// 鍵盤監聽
txt.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addItem();
    }
})
// 新增
function addItem(e){
    let id = new Date().getTime();
    let obj ={};
        obj.content = txt.value;
        obj.state = "待完成";
        obj.check = "";
        obj.id = id;
    if(txt.value.trim() !== ""){
        data.push(obj);
        render();
        txt.value = "";
    }else{
        alert("請輸入文字");
    }
    
}

// 分類
tab.addEventListener("click",(e) =>{
    // 清除預設class
    let tabs = document.querySelectorAll(".tab li");
    tabs.forEach((item)=>item.setAttribute("class",""));
    // 被點選加上class
    e.target.setAttribute("class","active");
    render();
})

list.addEventListener("click",(e) => {
    // 刪除
    if(e.target.nodeName === "A"){
        let num = e.target.getAttribute("data-num");
        data.splice(num,1);
        render(data);
    }
    // 更改state
    let id = parseInt(e.target.closest("li").dataset.id);
    data.forEach((item)=>{
        if(item.id === id){
            if(item.check === "checked"){
                item.check = "";
                item.state = "待完成";
            }else{
                item.check ="checked";
                item.state = "已完成";
            }
        }
    })    
    render();
})

// 清除已完成項目
delAll.addEventListener("click",(e)=>{
    data = data.filter((item)=> item.state === "待完成");
    render();
})

render();