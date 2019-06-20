$(function (){
    /*显示搜索记录 若有.. 若没有*/
    arr=JSON.parse(localStorage.getItem("history"))||[];
    /*此处渲染页面*/
    render(arr);
    /*清空所有记录*/
    clearHistory();
    /*点击搜索按钮*/
    btnSearch();
    /*点击删除按钮*/
    btnDelete();

});
let arr;
/*渲染页面*/
let render=function () {
    let $ul=$(".ct_content_box ul");
    $ul.html("");
    if(arr.length>0) {
        $(".history").text("搜索历史记录");
    }else{
        $(".history").text("没有历史记录");
    }
    arr.forEach(function (item,i){
        let $li="<li><a href=\"searchList.html?key="+item+"\">"+item+"</a><span data-id=\""+i+"\" class=\"delete fa fa-close\"></span></li>";
        $ul.prepend($li);
    });
};
/*点击删除按钮*/
let btnDelete=function (){
    $("ul").on("tap","span",function (){
        let index=$(this).data("id");
        console.log(arr,index);
        arr.splice(index,1);
        localStorage.setItem("history",JSON.stringify(arr));
        render();
    });
};
/*清空所有记录*/
let clearHistory=function (){
    $(".clear_history").on("tap",function (){
        localStorage.removeItem("history");
        arr=[];
        render();
    });
};
/*点击搜索按钮*/
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
/*历史记录
1.重复限制
2.长度限制
*/
let setHistory=function (value) {
    /*重复限制*/
    if(arr.indexOf(value)>-1) arr.splice(arr.indexOf(value),1);
    arr.push(value);
    /*长度限制*/
    if(arr.length>5) arr.shift();
};