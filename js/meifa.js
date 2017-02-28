$(document).ready(function(){  
            // var QueryString;
            var URL = document.location.toString(); //获取带参URL
			//var itemArr = new Array();		//测试用商店信息数组
			var id=$.getUrlParam("id");	//获取店名
   //          var district=$.getUrlParam("district");//获取市区
   //          var address=$.getUrlParam("address");//获取地址
   //          var tel=$.getUrlParam("tel");//获取电话
   //          var pic = $.getUrlParam("pic");//获取图片地址
			//  var userid = $.getUrlParam("userid");//获取userid
			//  var cityname = $.getUrlParam("cityname");//获取城市名称
   //          $("#user").attr('href','user.html?userid='+userid+'&cityid='+cityid);		//修改用户连接加参数
			// $("#homepage").attr('href','index.html?userid='+userid+'&cityid='+cityid);	//修改主页连接加参数
			
            
            // $(".shop-name").text(name);
            // $(".shop-address").text(district+" "+address);
            // $(".shop-tel").text(tel);
            // $("#pic").attr('src',pic);
            //var sid = $("#s_id").val();	//获取session中id的值 
    		//drawItem(itemArr);  //测试临时调用方法实现
            $.ajax({                            
                url: "http://www.panduoduoguanfang.com/wx/store/detail/",           //后台controller的请求路径
                type:"post",                    
                data: {id:id},       //传入后台的参数
                dataType: "json",               //传入的格式
                success: function(data) {       //回调函数DATA的类型如Tenant
                    drawstore(data.extra);            //
                    $.ajax({                            
                        url: "http://www.panduoduoguanfang.com/wx/goods/list/",         //后台controller的请求路径
                        type:"post",                    
                        data: {store_id:id},      //传入后台的参数
                        dataType: "json",               //传入的格式
                        success: function(data) {       //回调函数DATA的类型如Tenant
                            if(data.res==200){
                                 drawItem(data.extra);       //
                            }
                           
                        }
                    });
                }
            });
            
            
});

function drawstore(data){
            var id = data.id;
            var cityid=data.city_id;
            var district=data.district;//获取市区
            var address=data.address;//获取地址
            var tel=data.phone;//获取电话
            var pic = data.pic;//获取图片地址
            var name= data.name; //获取店名
            var openhours = data.open_hours;//营业时间
            var info = data.description  //商店简介
            $(".shop-name").text(name);
            $(".shop-address").text(district+" "+address);
            $(".shop-tel").text("电话"+" "+tel);
            $("#pic").attr('src',pic);
            $("#shopid").val(id);
            $("#time").text("营业时间："+openhours);
            $("#user").attr('href','user.html?userid='+id+'&cityid='+cityid+'&cityname='+$.getUrlParam("cityname"));       //修改用户连接加参数
            $("#homepage").attr('href','index.html?userid='+id+'&cityid='+cityid+'&cityname='+$.getUrlParam("cityname"));  //修改主页连接加参数
            $("#info").text(info);
}

function drawItem(data){
    $(".tuan-list").find("a").remove();
    for(var i = 0;i<data.length;i++){               //直接写html代码,data[i]的属性需要替换
            $(".tuan-list").append("<a class='item' href=shop_details_meifa.html"+"?id="+data[i].id+"&cityid="+$.getUrlParam("cityid")+"&cityname="+$.getUrlParam("cityname")+">"+
                        "<div class='cnt'>"+
                            "<div class='content'>"+
                                "<div class='newtitle'>"+data[i].goods_name+"</div>"+
                                "<div class='newinfo'>"+
                                    "<div class='info'>"+
                                        "<span class='symbol'>¥</span><span class='price'>"+data[i].price+"</span>"+
                                        "<span class='o-price'>￥"+data[i].origin_price+"</span>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<span class='arrowent'></span>");
        }
 

}


//"&userid="+data[i].userid+"&cityname="+data[i].cityname+"&title="+data[i].title+
                        //"&sellprice="+data[i].sellprice+"&originalprice="+data[i].originalprice+"&name="+data[i].name+"&district="+data[i].district+"&address="+
                        //data[i].address+"&tel="+data[i].tel+