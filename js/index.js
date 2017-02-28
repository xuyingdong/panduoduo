$(document).ready(function(){  
            //var QueryString;
            var URL = document.location.toString(); //获取带参URL
			//var shopArr = new Array();		//测试用商店信息数组

			if($.getUrlParam("cityname")==null){
				var cityname = $("#changecity").text();
			}else{
				var cityname=$.getUrlParam("cityname");	//获取url后的参数
			}
			if($.getUrlParam("userid")==null){		//如果userid为空
				var userid = $("#s_id").val();;	//提取隐藏域中的userid
			}else{
				var userid=$.getUrlParam("userid");	//获取url后的参数
			}
			$("#cityid").val($.getUrlParam("cityid")==null?1:$.getUrlParam("cityid"));
			var cityid=$("#cityid").val();
			$("#user").attr('href','user.html?userid='+userid+'&cityid='+cityid);		//修改用户连接加参数
			$("#homepage").attr('href','index.html?userid='+userid+'&cityid='+cityid+'&cityname='+cityname);	//修改主页连接加参数
			$("#changecity").attr('href','city.html?cityid='+cityid+'&cityname='+cityname);
            $("#changecity").text(cityname);    //修改页面城市名称
			$("#bannerurl").attr('href','shop_details_meifa.html?userid='+userid+'&cityname='+cityname);//重新修改大图的url连接（这里的大图确定是跳转到明细图？单价怎么得？）
			// for( var i = 3;	i<7;	i++){//造数据（因为图编号只找到3-6，因此从3开始循环造数据）
			// 	var shop = new Shop(i,userid,cityname,'../images/pic_'+i+'.jpg','店名'+cityname,'市区'+i,'地址'+i,'电话'+i,i*100,'shop_meifa.html',i%2);
			// 	shopArr[i-3]=shop;		//添加至数组
			// }
			
				//drawshop(shopArr);//测试临时调用方法实现
                $.ajax({							
                    url: "http://www.panduoduoguanfang.com/wx/store/list/",			//后台controller的请求路径
                    type:"post",					
                    data: {city_id:$.getUrlParam("cityid")==null?1:$.getUrlParam("cityid")},		//传入后台的参数,这个微信openid网上提供了一个方法
                    dataType: "json",//传入的格式
                    beforeSend : function(){
                    	$('#tableData').append('<div class="loader"><div class="loader-inner semi-circle-spin"><div></div></div></div>');
                    },
                    success: function(data) {		//回调函数DATA的类型为map类型，shoplist和userid是key
                    	if(data.res==200){
                    		$('.loader').remove();
							drawshop(data.extra);	
                    	}
						
						//$("#s_id").val(json.userid);
											
                    }
                });
            
});

 function drawshop(data){								
		$("#tableData").find("a").remove();	//删除ul下的所有a标签
		for(var i = 0;i<data.length;i++){				//直接写html代码其实data[i]的属性需要替换
			//alert(data[i].NAME);
			var href1 ="javascript:void(0)";
			var href2 = "shop_meifa.html"+"?id="+data[i].id+"&cityid="+$.getUrlParam("cityid")+"&cityname="+$.getUrlParam("cityname");//+"&userid="+data[i].userid+"&cityname="+data[i].cityname+"&name="+data[i].name+"&district="+data[i].district+"&address="+data[i].address+"&tel="+data[i].tel+"&pic="+data[i].pic
			var divItem = "<div class='preparation'><div class='preparation-text'>筹备中</div></div>";
				$("#tableData").append("<a class='index-content-item' href='"+(data[i].status==1 ? href2 : href1)+"'>"+//三目运算判断是否在筹备中 0：运营中 1：筹备中
						"<div class='pic'>"+
							(data[i].status==1 ? "":divItem)+
							"<img src='"+data[i].pic+"' width='90' height='90' />"+			
						"</div>"+
						"<div class='content'>"+
							"<div class='store-name'>"+data[i].store_name+"</div>"+
							"<div class='store-address'>"+data[i].district+" "+data[i].address+"</div>"+
							"<div class='store-price'><ins class='price-symbol'>￥</ins>"+
								"<ins class='price-current'>"+data[i].price+"</ins>起"+
							"</div>"+
						"</div>"+
					"</a>");

			};
			
 }
 
 
 function getbeautiful(type,url){		//5大项跳转页面
	 var cityname = $("#changecity").text();
	 //var userid = $("#s_id").val();
	 location.href= url+"?type="+type+"&cityid="+($.getUrlParam("cityid")==null ? 1: $.getUrlParam("cityid"))+"&cityname="+encodeURI(cityname);//+"&userid="+userid; 
 }
 
 

 
 

           