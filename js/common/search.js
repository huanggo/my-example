define(["jquery", "jquery.ui"], function($) {
	return {
		init: function(options) {
			$("#search").autocomplete({
				//数据源，可以是静态json数据，也可以是远程数据
				source: function(request, response) {
					//这里使用了原生的JSONP方式请求百度的suggest接口
					window.test = function(data) {
						response(data.s);
					}
					var _script = document.createElement("script");
					//request当中，只有一个term属性，代表了输入框的value值
					_script.src = "http://suggestion.baidu.com/su?wd=" + request.term + "&cb=test";
					document.body.appendChild(_script);
				}
			});
		}
	}
})