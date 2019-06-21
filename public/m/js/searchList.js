$(function (){
    /*存储搜索历史*/
    arr=JSON.parse(localStorage.getItem("history"))||[];
    /*区域滑动*/
    mui(".mui-scroll-wrapper").scroll({
        scrollX:false,
        scrollY:true,
        bounce:true,
        indicators:true,
        deceleration:0.0006
    });
    /*1.页面初始化的时候，关键字要在搜索框内显示*/
    let key=decodeURI(decodeURI(ct.getParamsByUrl()["key"]));
    let $input=$("input").val(key||"");
    /*2.页面初始化的时候，查询第1页4条数据*/
    getSearchData({
        proName:$input.val(),
        page:1,
        pageSize:4
    },function (data){
        /*渲染数据*/
        let html=template("product",data);
        $(".ct_product").html(html);
    });
    /*3.用户点击搜索的时候，根据新的关键字搜索 重置排序功能*/
    btnSearch();
    /*4.用户点击排序的时候，根据排序的选项去进行排序，默认降序，再次点击升序*/

    /*5.用户下拉的时候，根据当前条件刷新 上拉加载重置页面*/

    /*6.用户上拉的时候，加载下一页(没有数据的情况，不去加载)*/

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
let getSearchData=function (params,callback) {
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:params,
        dataType:"json",
        success:function (data){
            callback&&callback(data);
        }
    });
};
