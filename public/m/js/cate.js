$(function (){
    mui(".mui-scroll-wrapper").scroll({
        scrollX:false,
        scrollY:true,
        bounce:true,
        indicators: true,
        deceleration: 0.0005
    });
    /*一级分类默认渲染 第一个一级分类对应的二级分类*/
    getFirCategoryData(function (data){
        let html=template("firstTemplate",data);
        $(".cate_left ul").html(html);
        let cateId=$(".cate_left ul li:first-child a").data("id");
        render({id:cateId});
        initSecTapHandle();
    });
});
/*获取一级分类的数据*/
let getFirCategoryData=function(callback) {
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        data:"",
        dataType:"json",
        success:function (data){
            callback&&callback(data);
        }
    });
};
/*获取二级分类的数据*/
let getSecCategoryData=function (params,callback){
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:params,
        dataType:"json",
        success:function (data){
            callback&&callback(data);
        }
    });
};
/*点击一级分类加载对应的二级分类*/
let initSecTapHandle=function (){
    $(".cate_left ul li a").on("tap",function (){
        /*当前已经被选中的时候，不去加载*/
        if($(this).parent().hasClass("now")) return false;
        let cateId=$(this).data("id");
        $(".now").removeClass("now");
        $(this).parent().addClass("now");
        render({id:cateId});
    });
};
/*渲染二级分类的方法*/
let render=function (id){
    getSecCategoryData(id,function (data){
        let html=template("secondTemplate",data);
        $(".cate_right ul").html(html);
    });
};