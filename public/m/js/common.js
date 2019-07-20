let ct={};
/*获取url传递数据*/
ct.getParamsByUrl=function (){
    let params={};
    let search=location.search;
    if(!search)
        return params;
    else{
        search=search.replace("?","");
        let arr=search.split("&");
        arr.forEach(function(item,i){
            let itemArr=item.split("=");
            params[itemArr[0]]=itemArr[1];
        });
    }
    return params;
};
ct.loginUrl="/m/user/login.html";
ct.cartUrl="/m/cart.html";
ct.loginAjax=function (params){
    /*需要登录的ajax请求*/
    $.ajax({
        type:params.type||"get",
        url:params.url||"#",
        data:params.data||"",
        datatype:params.datatype||"json",
        success:function (data){
            /*未登录的处理*/
            if(data.error==400){
                /*跳转到登录页，登录成功按照这个地址传回来*/
                console.log(location.href);
                location.href=ct.loginUrl+"?returnUrl="+location.href;
                console.log(location.href);
                return false;
            }else{
                params.success&&params.success(data);
            }
        },
        error:function (){
            mui.toast("服务器繁忙");
        }
    });
};