$(function (){
    /*显示搜索记录 若有.. 若没有*/
    let arr=JSON.parse(localStorage.getItem("history"))||[];
    /*此处渲染页面*/
    render(arr);
    /*点击搜索按钮*/
    btnSearch(arr);
    /*点击删除按钮*/
    $("ul").on("tap","li",function (){
        console.log($(this));
        let index=$(this).data("id");
        arr.splice(index,1);
        localStorage.setItem("history",JSON.stringify(arr));
        render(arr);
    });
    /*清空所有记录*/
    clearHistory(arr);
});
/*渲染页面*/
let render=function (arr) {
    let $ul=$(".ct_content_box ul");
    $ul.html("");
    if(arr.length>0) {
        $(".history").text("搜索历史记录");
    }else{
        $(".history").text("没有历史记录");
    }
    arr.forEach(function (item,i){
        let $li="<li><a href=\"\">"+item+"</a><span data-id=\""+i+"\" class=\"delete fa fa-close\"></span></li>";
        $ul.prepend($li);
    });
};
/*清空所有记录*/
let clearHistory=function (arr){
    $(".clear_history").on("tap",function (){
        localStorage.removeItem("history");
        arr=[];
        render(arr);
    });
};
/*点击搜索按钮*/
let btnSearch=function (arr){
    $(".btn_search a").on("tap",function (){
        /*弹出消息*/
        let value=$("input").val();
        if(!value){
            mui.toast('请输入搜索关键字',{ duration:1000, type:'div' });
            return false;
        }
        /*获取内容*/
        arr.push(value);
        if(arr.length>5) arr.shift();
        localStorage.setItem("history",JSON.stringify(arr));
        render(arr);
    });
};