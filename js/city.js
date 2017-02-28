$(document).ready(function(){
	
                 var cityname=$.getUrlParam("cityname");	//获取url后的参数
				// var userid=$.getUrlParam("userid");	//获取url后的参数
				// $("#user").attr('href','user.html?userid='+userid+'&cityname='+cityname);		//修改用户连接加参数
				// $("#homepage").attr('href','index.html?userid='+userid+'&cityname='+cityname);	//修改主页连接加参数	
    //             $(".cur-city").attr('href','index.html?userid='+userid+'&cityname='+cityname);
                 $("#localcity").text(cityname);
				//    var ls=$("#tcontent li");//获取所有的li元素  
				//    $("#tcontent li").click(function(){//点击事件  
				//    //测试直接获取值 var v=$(this).text(); alert(v); 
				//    var count=$(this).index();//获取li的下标  
				//    var text=$.trim(ls.eq(count).text());  //去空格获取LI中的值
				//    location.href="index.html?userid="+userid+"&cityname="+encodeURI(text); //带参跳转首页                
    //           })   
				$.ajax({							
                    url: "http://www.panduoduoguanfang.com/wx/city/list/",			//后台controller的请求路径
                    type:"post",					
                    //data: {cityName: cityname,id:1},		//传入后台的参数,这个微信openid网上提供了一个方法
                    dataType: "json",				//传入的格式
                    success: function(data) {		//回调函数DATA的类型为map类型，shoplist和userid是key
                    	if(data.res==200){
							drawcity(data.extra);	
                    	}					
                    }
                });
}) 


function drawcity(data){
	var cityid=$.getUrlParam("cityid");
	$(".cur-city").attr('href','index.html?cityid='+cityid+'&cityname='+$.getUrlParam("cityname"));
	$("#tcontent").find("li").remove();
	for (var i = 0; i < data.length; i++) {
		var href = "index.html?cityid="+data[i].id+"&cityname="+encodeURI(data[i].name);
		$("#tcontent").append("<li class='city-name'>"+"<a href="+href+">"+data[i].name+"</a></li>");
	};
}