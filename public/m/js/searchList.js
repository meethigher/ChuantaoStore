$(function (){
    /*存储搜索历史*/
    arr=JSON.parse(localStorage.getItem("history"))||[];
    btnSearch();
    /*区域滑动*/
    mui(".mui-scroll-wrapper").scroll({
        scrollX:false,
        scrollY:true,
        bounce:true,
        indicators:true,
        deceleration:0.0006
    });
});
let arr;
let btnSearch=function (){
    $(".btn_search a").on("tap",function (){
        /*弹出消息*/
        let value=$.trim($("input").val());
        if(!value){
            mui.toast('请输入搜索关键字',{ duration:1000, type:'div' });
            return false;
        }
        /*获取内容*/
        setHistory(value);
        localStorage.setItem("history",JSON.stringify(arr));
        window.location.href="searchList.html?key="+value;
    });
};
let setHistory=function (value) {
    /*重复限制*/
    if(arr.indexOf(value)>-1) arr.splice(arr.indexOf(value),1);
    arr.push(value);
    /*长度限制*/
    if(arr.length>5) arr.shift();
};