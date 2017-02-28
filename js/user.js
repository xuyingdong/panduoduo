$(document).ready(function(){  
            //var QueryString;
            var URL = document.location.toString(); //获取带参URL
			var userid=$.getUrlParam("userid");	//获取用户Id号
			var cityname=$.getUrlParam("cityname");	//获取用户Id号
//			$("#user").attr('href','user.html?userid='+userid+'&cityname='+cityname);		//修改用户连接加参数
//			$("#homepage").attr('href','index.html?userid'+userid+'&cityname='+cityname);	//修改主页连接加参数
//			var orderArr = new Array();
//			for(var i=0;i<5;i++){
//				var order = new Order(i,'aaaa'+i,'bbbbb'+i,120*(i+1),'ccccc'+i,'ddddd'+i,'eeeee'+i);
//				orderArr[i]=order;
//			}
//			var order = new Order('aaaa','bbbbb',120,'ccccc','ddddd','eeeee');
//          if (URL.lastIndexOf("?") != -1) {	//查询url是否有？连接符
//              
//				drawOrder(orderArr);//测试临时调用方法实现
//              $.ajax({							
//                  url: "www.baidu.com",			//后台controller的请求路径
//                  type:"post",					
//                  data: {id:userId},		//传入后台的参数
//                  dataType: "json",				//传入的格式
//                  success: function(Data) {		//回调函数DATA的类型如SHOP
//						$("#balance").text(data.balance);//绑定当前用户的余额
//						drawOrder(data);		//			
//                  }
//              });
//          }
});


function Order(ordid,buytime,title,sellprice,name,district,address){
	this.ordid=ordid;
	this.buytime=buytime;
	this.title=title;
	this.sellprice=sellprice;
	this.name=name;
	this.district=district;
	this.address=address;
}


function drawOrder(data){
	$("#productBox").find("div").remove();
	for(var i = 0; i<data.length;i++){
		$("#productBox").append("<div class='product-box'>"+
					"<input style='display:none' value='"+data[i].ordid+"'></input>"+
					"<div class='time'>购买时间："+data[i].buytime+"</div>"+		//购买时间
					"<div class='con'>"+
						"<dl>"+
							"<dt>"+data[i].title+"</dt>"+							//商品名
							"<dd>"+
								"<div class='price'>¥</div>"+					
								"<div class='price sum'>"+data[i].sellprice+"</div>"+	//现价
							"</dd>"+
						"</dl>"+
						"<dl>"+
							"<dt>"+data[i].name+"</dt>"+								//店名
						"</dl>"+
						"<dl>"+
							"<dt>"+data[i].district+" "+data[i].address+"</dt>"+		//市区+地址
						"</dl>"+
					"</div>"+
					"<div class='code'>"+
						"<input id='check"+i+"' class='user-btn' value='店员验证'></input>"+
						"<span>到店请出示此订单</span>"+
					"</div>"+
				"</div>");
	}
	
}