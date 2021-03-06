﻿$(function () {  
    var wxopenid=getcookie('wxopenid');  
    var key=getcookie('key');  
    if (key==''){  
        var access_code=GetQueryString('code');  
        if (wxopenid==""){  
            if (access_code==null)  
            {     
                var fromurl=location.href;  
                var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid=填你自已的appid哟&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';  
                location.href=url;  
            }  
            else  
            {     
                $.ajax({  
                    type:'get',  
                    url:ApiUrl+'/index.php?act=payment&op=getopenid',   
                    async:false,  
                    cache:false,  
                    data:{code:access_code},  
                    dataType:'json',  
                    success:function(result){                   
                            if (result!=null && result.hasOwnProperty('openid') && result.openid!=""){  
                               addcookie('wxopenid',result.openid,360000);                             
                               getlogininfo(result.openid);  
                            }   
                            else  
                            {  
                              alert('微信身份识别失败 \n '+result);  
                              location.href=fromurl;  
                            }  
                        }  
                    });      
            }  
        }else{  
           if (key=='' && wxopenid!='')  
               getlogininfo(wxopenid);    
        }  
  
        function getlogininfo(wxopenid){         
            $.ajax({  
               type:'get',  
               url: ApiUrl + '/index.php?act=login&op=autologininfo',  
               data: { wxopenid:wxopenid},  
               dataType:'json',  
               async:false,  
               cache:false,                 
               success: function (result) {                     
                       if (result.return_code=='OK'){  
                           addcookie('key',result.memberinfo.key);  
                           addcookie('username',result.memberinfo.username);  
                       }else{  
                           alert(result.return_msg);  
                           location.href=WapSiteUrl+'/tmpl/member/login.html';  
                       }  
               }  
            });  
        }  
    }  
}); 

/**
	 * 	作用：生成可以获得openid的url
	 */
	function createOauthUrlForOpenid()
	{
		$urlObj["appid"] = WxPayConf_pub::APPID;
		$urlObj["secret"] = WxPayConf_pub::APPSECRET;
		$urlObj["code"] = $this->code;
		$urlObj["grant_type"] = "authorization_code";
		$bizString = $this->formatBizQueryParaMap($urlObj, false);
                //api.weixin.qq.com=101.226.90.58
		return "https://api.weixin.qq.com/sns/oauth2/access_token?".$bizString;
	}
function addcookie(name,value,expireHours){  
    var cookieString=name+"="+escape(value)+"; path=/";  
    //判断是否设置过期时间  
    if(expireHours>0){  
        var date=new Date();  
        date.setTime(date.getTime+expireHours*3600*1000);  
        cookieString=cookieString+"; expire="+date.toGMTString();  
    }  
    document.cookie=cookieString;  
}  
  
function getcookie(name){  
    var strcookie=document.cookie;  
    var arrcookie=strcookie.split("; ");  
    for(var i=0;i<arrcookie.length;i++){  
    var arr=arrcookie[i].split("=");  
    if(arr[0]==name)return decodeURIComponent(arr[1]); //增加对特殊字符的解析  
    }  
    return "";  
}  
  
function delCookie(name){//删除cookie  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getcookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();  
}  