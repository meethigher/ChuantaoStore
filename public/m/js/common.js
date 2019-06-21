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