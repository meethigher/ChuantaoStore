$(function (){
    let id=ct.getParamsByUrl().proId;
    getProductData(id,function (data){
        /*清除加载状态*/
        $(".loading").remove();
        /*渲染商品详情页*/
        let html=template("detail",data);
        $(".mui-scroll").html(html);
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            bounce:true
        });
        mui('.mui-slider').slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        /*尺码的选择*/
        $(".btn_size").on("tap",function (){
            $(this).addClass("now").siblings().removeClass("now");
        });

        /*数量的选择*/
        $(".p_number").on("tap",".jian",function (){
            let $input=$(this).siblings("input");
            let currNum=$input.val();
            if(currNum==0) return false;
            currNum--;
            $input.val(currNum);
        }).on("tap",".jia",function (){
            let $input=$(this).siblings("input");
            let maxNum=$input.data("max");
            let currNum=$input.val();
            if(currNum>=maxNum) {
                /*此处为啥要用延迟，因为弹框显示的时候，刚好被点击取消了。所以没有显示出来。(移动端的击穿现象，点击穿透)*/
                setTimeout(function (){
                    mui.toast("库存不足");
                },100);
                return false;
            }
            currNum++;
            $input.val(currNum);
        });
        /*加入购物车*/
        $(".btn_cart").on("tap",function (){
            let sizeBtn=$(".btn_size.now");
            if(!sizeBtn.length){
                mui.toast("请选择尺码");
                return false;
            }
            let num=$(".p_number input").val();
            if(num<=0){
                mui.toast("请选择数量");
                return false;
            }
            /*提交数据*/
            ct.loginAjax({
                url:"/cart/addCart",
                type:"post",
                dataType:"json",
                data:{
                    productId:id,
                    num:num,
                    size:sizeBtn.html()
                },
                success:function (data){
                    /*已经登录成功，此处弹出提示框*/
                    mui.confirm("添加成功，去购物车看看？","温馨提示",["是","否"],function (e){
                        if(e.index==0){
                            location.href=ct.cartUrl;
                        }else{

                        }
                    })
                }
            });

        });
    });



});
let getProductData=function (proId,callback){
    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        data:{
            id:proId
        },
        dataType:"json",
        success:function (data){
            callback&&callback(data);
        }
    })
};