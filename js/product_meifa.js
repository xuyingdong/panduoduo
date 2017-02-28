$(document).ready(function(){  
            //var QueryString;
            //var URL = document.location.toString(); //获取带参URL			
			//var shopArr = new Array();		//测试用商店信息数组
            //if (URL.lastIndexOf("?") != -1) {	//查询url是否有？连接符
                var cityid=$.getUrlParam("cityid");
				var userid = $.getUrlParam("userid");//获取userid
				var cityname =$.getUrlParam("cityname");
				$("#user").attr('href','user.html?userid='+userid+'&cityid='+cityid+'&cityname='+cityname);		//修改用户连接加参数
				$("#homepage").attr('href','index.html?userid='+userid+'&cityid='+cityid+'&cityname='+cityname);	//修改主页连接加参数	
				var type=$.getUrlParam("type");
				if (type==1) {
					$(".title").text("美发");
					$("#title").text("美发");
				}else if (type==2) {
					$(".title").text("美甲美睫");
					$("#title").text("美甲美睫");
				}else if (type==3) {
					$(".title").text("美容SPA");
					$("#title").text("美容SPA");
				}else if (type==4) {
					$(".title").text("瑜伽");
					$("#title").text("瑜伽");
				}else if (type==5) {
					$(".title").text("舞蹈");
					$("#title").text("舞蹈");
				}
				
                //var sid = $("#s_id").val();	//获取session中id的值 
				
			// 	for( var i = 3;	i<7;i++){		//造数据（因为图编号只找到3-6，因此从3开始循环造数据）
			// 	var shop = new Shop(i,userid,cityname,'../images/pic_'+i+'.jpg','aaaaa'+i,'bbbbb'+i,'ccccc'+i,'180180180'+i,i*100,'shop_meifa.html?',i%2);
			// 	shopArr[i-3]=shop;		//添加至数组
			// }
				//drawtable(shopArr);
                $.ajax({							
                    url: "http://www.panduoduoguanfang.com/wx/store/list/",			//后台controller的请求路径
                    type:"post",					
                    data: {city_id:cityid,type:type,userId:userid},		//传入的参数
                    dataType: "json",				//传入的格式
                    beforeSend : function(){
                    	$('#tableData').append('<div class="loader"><div class="loader-inner semi-circle-spin"><div></div></div></div>');
                    },
                    success: function(data) {		//回调函数DATA的类型如Tenant
						if(data.res==200){
							$('.loader').remove();
							drawtable(data.extra);	
                    	}
                    }
                });
            //}
});

 // function Shop(id,userid,cityname,pic,name,district,address,tel,price,href,isprepare) //声明商店对象--测试用数据
 // {
	// this.id = id;
	// this.userid=userid;			
	// this.cityname=cityname;
	// this.pic= pic;
	// this.name = name;
	// this.district= district;
	// this.address = address;
	// this.tel = tel;
	// this.price = price;
	// this.href = href;
	// this.isprepare = isprepare;
 // }
	 
 function drawtable(data){								
		var uls =$("#tableData").find("a").remove();	//删除ul下的所有a标签
		for(var i =0;i<data.length;i++){				//直接写html代码
			//alert(data[i].NAME);
			var href1 ="javascript:void(0)";
			var href2 = "shop_meifa.html"+"?id="+data[i].id+"&cityid="+$.getUrlParam("cityid")+"&cityname="+$.getUrlParam("cityname");//+";+"name="+data[i].name+"&userid="+data[i].userid+"&cityname="+data[i].cityname+"&district="+data[i].district+"&address="+data[i].address+"&tel="+data[i].tel+"&pic="+data[i].pic
			var divItem = "<div class='preparation'><div class='preparation-text'>筹备中</div></div>";
			$("#tableData").append("<a class='index-content-item' href='"+(data[i].status==1 ? href2:href1)+"'>"+
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
		}
 }
 
 
 

 
 
 
 
 

           