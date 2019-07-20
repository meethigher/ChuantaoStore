$(function (){
    $.ajax({
        url:"/product/queryProductDetail?id=2",
        type:"get",
        dataType:"json",
        success:function (data){
            console.log(data);
            let html=template("demo",data);
            $(".demo").html(html);
        }
    })
});