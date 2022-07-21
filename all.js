let data = [
    {
        content: "把冰箱發,霉的檸檬拿去丟",
        "state": "待完成",
        "check": ""
    },
    {
        content: "打電話叫媽媽匯款給我",
        "state": "已完成",
        "check":"checked"
    },
    {
        content: "整理電腦資料夾",
        "state": "待完成",
        "check": ""
    },
    {
        content: "繳電費水費瓦斯費",
        "state": "已完成",
        "check":"checked"
    },
    {
        content: "刪訊息",
        "state": "待完成",
        "check": ""
    },
    {
        content: "約vicky禮拜三泡溫泉",
        "state": "待完成",
        "check": ""
    },
    {
        content: "約ada禮拜四吃晚餐",
        "state": "待完成",
        "check": ""
    }
];

const cardInput = document.querySelector(".input");
const list = document.querySelector(".list");
const txt = document.querySelector(".txt");
const tab = document.querySelector(".tab");
const uncompleted = document.querySelector(".uncompleted");
const delAll = document.querySelector(".delAll");



// 渲染功能
function render(){
    let src = "";
    data.forEach((item,index) => src += `<li><label class="checkbox" for=""><input type="checkbox" data-check="${item.state}" data-num = ${index} ${item.check}/><span>${item.content}</span></label><a href="#" class="delete" data-num = ${index}></a>
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

render();

// 新增
cardInput.addEventListener("click",(e) => {
    if(e.target.nodeName !== "A"){
        return;
    }
    let obj ={};
    obj.content = txt.value;
    obj.state = "待完成";
    obj.check = "";
    data.push(obj);
    render();
})

// 分類
tab.addEventListener("click",(e) =>{
    // 清除預設class
    let tabs = document.querySelectorAll(".tab li");
    tabs.forEach((item)=>item.setAttribute("class",""));
    // 被點選加上class
    e.target.setAttribute("class","active");
    
    let str = "";
    if(e.target.textContent === "全部"){
        render();
        return;
    }
    data.forEach((item,index)=>{
        if(item.state === e.target.textContent){
            str += `<li><label class="checkbox" for=""><input type="checkbox" data-check="${item.state}" data-num = ${index} ${item.check} /><span>${item.content}</span></label><a href="#" class="delete" data-num = ${index}></a>
            </li>`;
        }
    })
    list.innerHTML = str;
})

list.addEventListener("click",(e) => {
    // 刪除
    if(e.target.nodeName === "A"){
        let num = e.target.getAttribute("data-num");
        data.splice(num,1);
        render();
    }
    // 更改state
    else if(e.target.nodeName === "INPUT"){
        let obj ={};
        obj.check = e.target.check = "checked";
        obj.state = "已完成"
        data[e.target.getAttribute("data-num")].check = obj.check;
        data[e.target.getAttribute("data-num")].state = obj.state;
        render();
    }
})

// 清除已完成項目
delAll.addEventListener("click",(e)=>{
    data = data.filter((item)=> item.state === "待完成");
    render();
})