$(document).ready(function(){
                var cityname=$.getUrlParam("cityname");	//获取城市名
				var userid=$.getUrlParam("userid");	//获取用户id
				$("#user").attr('href','user.html?userid='+userid+'&cityname='+cityname);		//修改用户连接加参数
				$("#homepage").attr('href','index.html?userid='+userid+'&cityname='+cityname);	//修改主页连接加参数	
                $(".cur-city").attr('href','index.html?userid='+userid+'&cityname='+cityname);
                $(".pink").attr('href','user.html?userid='+userid+'&cityname='+cityname);
                $("#lookup").attr('href','user.html?userid='+userid+'&cityname='+cityname);
                $("#gohomepage").attr('href','index.html?userid='+userid+'&cityname='+cityname); 
})  