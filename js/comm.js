  (function ($) {				//获取url后的参数
			   $.getUrlParam = function (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) 
					return (decodeURI(r[2])); 
					return null;
			   }
			  })(jQuery);