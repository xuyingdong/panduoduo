$(document).ready(function(){  
            var URL = document.location.toString(); //获取带参URL
			var serviceInfo = new Array('1,2,3,4,5,6,7,8,9','bbbbbb','cccccc','dddddd','eeeeee','ffffff','gggggggg');	//测试数据
			
            if (URL.lastIndexOf("?") != -1) {	//查询url是否有？连接符
				// var name = $.getUrlParam("name");	//获取店名
				// var district = $.getUrlParam("district");//获取市区
				// var address = $.getUrlParam("address");//获取地址
				// var tel = $.getUrlParam("tel");//获取电话
				var id = $.getUrlParam("id")//获取商品id
				var userid = $.getUrlParam("userid");//获取userid
				var cityid = $.getUrlParam("cityid");//获取userid
				var cityname = $.getUrlParam("cityname");//获取城市名称
				$("#user").attr('href','user.html?userid='+userid+'&cityid='+cityid+'&cityname='+cityname);		//修改用户连接加参数
				$("#homepage").attr('href','index.html?userid='+userid+'&cityid='+cityid+'&cityname='+cityname);	//修改主页连接加参数	
				//var title =  $.getUrlParam("title")//获取商品title
				//var sellprice = $.getUrlParam("sellprice")//获取商品优惠价
				//var originalprice = $.getUrlParam("originalprice")//获取商品原价
				// $("#porductTitle").text(title);				//附值标题
				// $("#sellprice").text(sellprice);		//附值优惠价
				// $(".o-price").text(originalprice);					//附值原价
				// $("#name").text(name);								//附值店名
				// $("#address").text(district+" "+address);			//附值市区地址
				// $("#tel").attr('href',"tel:"+tel);					//附值电话
				//writeServiceInfo(serviceInfo);
                $.ajax({							
                    url: "http://www.panduoduoguanfang.com/wx/goods/detail/",			//后台controller的请求路径
                    type:"post",					
                    data: {id:id},		//传入后台的参数(需要传什么就加参数)
                    dataType: "json",				//传入的格式
                    success: function(data) {		//回调函数DATA的类型如SHOP
						//drawshop(data);
						$("#porductTitle").text(data.extra.goods_name);				//附值标题
						$("#sellprice").text(data.extra.price);		//附值优惠价
						$(".o-price").text(data.extra.origin_price);					//附值原价
						$("#name").text(data.extra.store_info.store_name);								//附值店名
						$("#address").text(data.extra.store_info.district+" "+data.extra.store_info.address);			//附值市区地址
						$("#tel").attr('href',"tel:"+data.extra.store_info.phone);					//附值电话
						writeServiceInfo(data);
                    }
                });
            }
});




function writeServiceInfo(data){		//绑值，要求按照页面文字内容顺序
	var pArr = $(".purchase-notes").find("p");	//找到class为.purchase-notes下的所有P标签
		pArr[0].innerText=data.extra.service_info;
		pArr[1].innerText=data.extra.service_hours+"分钟";
		pArr[2].innerText=data.extra.store_info.open_hours;
	
	
}



function shopping(){		//支付的方法
	var userid = $.getUrlParam("userid");//获取userid
	var id = $.getUrlParam("id")//获取商品id
	$.ajax({							
                    url: "www.baidu.com",			//后台controller的请求路径
                    type:"post",					
                    data: {userId:userid,id:id},		//传入后台的参数
                    dataType: "json",				//传入的格式
                    success: function(Data) {		//回调函数DATA为true or false 带表是否购买成功
						//drawshop(data);
						if(Data){
							alert("支付成功！");
						}else{
							alert("支付失败！");
						}
                    }
                });
}


