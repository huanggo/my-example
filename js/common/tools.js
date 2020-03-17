define(["jquery", "jquery.ui"], function($) {
   return {
      setCookie:function(name,value,day,path){
			var result="";
			result+=encodeURIComponent(name)+"="+encodeURIComponent(value);
			if(day){
				var date=new Date();
				date.setDate(date.getDate()+day);
				result+="; expires="+date;
			}
			if(path){
				result+="; path="+path;
				}else{
					result+="; path=/";
				}
			document.cookie=result;
		},
		getCookie:function(name){
			var cookieTxt = decodeURIComponent(document.cookie);
			var arr = cookieTxt.split("; ");
			for (var i=0;i<=arr.length-1;i++){
				var str=arr[i].split("=");
				if(str[0]==name){
					return str[1];
				}
			}
			return "";
		},
		lunBo:function (oContainer,intervalTime){
			console.log(intervalTime)
			var colorBox=["#f1f1f1","#d72c35","#e3204a","#60e7ed","#c0ebf2"];
			var aDiv = oContainer.getElementsByTagName("div")[0].getElementsByTagName("div");
			var oUl = oContainer.getElementsByTagName("ul")[0];
			var aLi = oUl.getElementsByTagName("li");
			var iNow = 0;//记录当前要显示图片的下标
			// 每一个功能要干的事情都是   控制iNow  然后选项卡切换
			autoPlay();
			function autoPlay() {
				clearInterval(oContainer.timer);
				oContainer.timer =setInterval(function() {
						
					iNow++;
					if(iNow==aLi.length) {
						iNow = 0;
					}
					tab();
					
				}, intervalTime)
			}
			oContainer.onmouseover = function() {
				clearInterval(oContainer.timer);
			}
	
			oContainer.onmouseout = function() {
				autoPlay();
			}
			// 小圆点
			for(var i=0; i<aLi.length; i++) {
				aLi[i].index = i;
				aLi[i].onmouseover = function() {
					iNow = this.index;
					tab();
				}
			}
			function tab() {
				for(var i=0; i<aDiv.length; i++) {
					aLi[i].className = "";
					// aDiv[i] opacity 100 0
					startMove(aDiv[i], {opacity: 0});
					
				}
				aLi[iNow].className = "active";
				startMove(aDiv[iNow], {opacity: 100});
				oContainer.parentNode.style.backgroundColor=colorBox[iNow];
				oContainer.lastElementChild.firstElementChild.firstElementChild.src="img/index/"+(iNow+1)+"-1.jpg";
				oContainer.lastElementChild.firstElementChild.nextElementSibling.firstElementChild.src="img/index/"+(iNow+1)+"-2.jpg";
				oContainer.lastElementChild.lastElementChild.firstElementChild.src="img/index/"+(iNow+1)+"-3.jpg";
			}
			function startMove(obj, json, fn) {//{attr1: iTarget1, attr1: iTarget1}
				clearInterval(obj.timer);
				obj.timer = setInterval(function() {
					// 假设都到达目标位置了
				var bStop = true;
					for(var attr in json) {
						var iCur = 0;
						if(attr=="opacity") {
							iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
						} else {
							iCur = parseInt(getStyle(obj, attr));
						}
						var iSpeed = (json[attr]-iCur)/8;
						iSpeed = iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);
						// 如果你还没到目标位置
						// 通知我一声还没到
						if(iCur!=parseInt(json[attr])) {
							bStop = false;
							if(attr=="opacity") {
								obj.style.filter = "alpha(opacity: "+(iCur+iSpeed)+")";
								obj.style.opacity = (iCur+iSpeed)/100;
							} else {
								obj.style[attr] = iCur + iSpeed + "px";
							}
						}
					}
					// 判断都到了吗
					// 停止运动
					if(bStop) {
						clearInterval(obj.timer);
						if(fn) {
							fn();
						}
					}
				}, 30)
			}
			function getStyle(obj, name) {
				if(window.getComputedStyle) {
				    return getComputedStyle(obj, null)[name];
				} else {
				    return obj.currentStyle[name];
				 }
			}
		},
		cartsShow:function (){
			function getCookie(name){
				var cookieTxt = decodeURIComponent(document.cookie);
				var arr = cookieTxt.split("; ");
				for (var i=0;i<=arr.length-1;i++){
					var str=arr[i].split("=");
					if(str[0]==name){
						return str[1];
					}
				}
				return "";
			}
			var cartsNum=0;
			var cartsInfo=window.localStorage.carts?JSON.parse(window.localStorage.carts):{};
			for(var key in cartsInfo){
    			cartsNum+=parseInt(cartsInfo[key].num);
			}
			$(".shopcarinfo span").text(cartsNum);
		},
   }
})