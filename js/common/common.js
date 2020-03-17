define (["jquery","tools"], function($,tools) {
	return {commonFunc:function(){
		$(function(){

			 Mock.mock(/\.json/, {
            'code':0,
            'message':'message信息',
            'infos|1-10': [{
                'id|+1': 1,
                'price|+1': 100,
                'buynum|+1': 100,
                'src':'main4-2.jpg',
                'des1':"就会很好很好"
            }],
                'infos2|1-10': [{
                'id|+1': 1,
                'price|+1': 100,
                'buynum|+1': 100,
                'src':'6-1.jpg',
                'des1':"就会很好很好"
            }]
           })
			$("#search").autocomplete({
		        source: function(request, response) {
		          	window.test = function(data) {
		            	response(data.s);
		          	}
		          	$("<script>", {
		            	src: "http://suggestion.baidu.com/su?wd=" + request.term + "&cb=test"
		          	}).appendTo('body');
		        }
		    });
		    
			$(".nav-first").mouseover(function(){
				$("#nav_2nd").stop().slideDown(300);
			});
			
			$(".nav-first").mouseout(function(){
				$("#nav_2nd").stop().slideUp(300);
			});
			
			$("#search").focus(function(){
				$(".del-words").show();
			});
			
			$("#search").blur(function(){
				$(".del-words").hide();
			});
			
			$(".del-words").click(function(){
				$("#search").val("");
			})
			
			$("#search").keyup(function(e){
				if($("#search").val()!=""){
					if(e.keyCode==13){
						$("#search2").click();
					}
				}
			});
			
			$("#search2").click(function(){
				if($("#search").val()!=""){
					location.href="https://www.baidu.com/s?wd="+$("#search").val();
				}
			});
			
			
			if(window.localStorage.userName){
				$("#login").css("display","none");
				$("#regist").css("display","none");
				$("#unload").css("display","inline-block")
				$("#user").append(window.localStorage.userName);
			}else{
				$("#login").css("display","inline-block");
				$("#regist").css("display","inline-block");
				$("#unload").css("display","none");
			}
			$("#user").css({"padding-left":"5px","padding-right":"5px","color":"pink","font-size":"16px"});
			$("#unload").click(function(){
				//tools.removeCookie("usernameLogin");
				window.localStorage.userName="";
				location.href="login.html#1";
			})
			$("#login").click(function(){
				location.href="login.html#1";
			})
			
			
			//点击任意三级菜单，执行页面跳转到商品详情页去。
			$(".trd-div a").click(function(){
				location.href="goodList.html";
			})
			
			$("#toIndex").click(function(){
				location.href="index.html";
			})
			
			$('.shopcar').mouseover(function(){
				if(tools.getCookie("carts")){
					$(".shopcarRight").css("display","block");
					$(".shopcarHide").css("display","block");
					$(".shopcarMore").css("display","block");
				}
			}).mouseout(function(){
				$(".shopcarRight").css("display","none");
				$(".shopcarHide").css("display","none");
				$(".shopcarMore").css("display","none");
			})
			itemList();
			function itemList(){
				$(".shopcarMore").empty();
				var cartsInfo=window.localStorage.carts?JSON.parse(window.localStorage.carts):{};
				var itemId=[];
				var itemNumber=[];
				var sequence=1;
				for(var key in cartsInfo){
	    			itemId.push(parseInt((cartsInfo[key].id).split("d")[2]));
	    			itemNumber.push(parseInt(cartsInfo[key].num))
				}
				for(var i=0;i<itemId.length;i++){
					$.ajax({
						url:"list.json",
						data:{"itemId":itemId[i]},
						async:false, 
						success:function(data){
							var result=JSON.parse(data).infos;
							var source=`
								<div class="itemBox">
									<div class="left" style="background:url(img/common/{{result[0].src}}) no-repeat;background-size:100% 90%;margin-top:2px;">
									</div>
									<div class="middle">
										{{result[0].name}}
									</div>
									<div class="right">
										<h3 class="first-h">￥{{result[0].price}}*{{itemNumber[sequence-1]}}<h3>
										<h3 class="last-h" cookie-id="{{itemId[sequence-1]}}">删除<h3>
									</div>
								</div>
								`
							var data={result,sequence,itemNumber,itemId};
							sequence+=1;
							var render=template.compile(source);
							var html=render(data);
							$(".shopcarMore").append(html);
						}
					})
				}
				
				$(".last-h").click(function(e){
					
					$(".confirm0").css("display","block");
					$(".shading").css("display","block");
					checkButton($(this));
					e.stopPropagation();
				})
			}
			
			function checkButton(_this){
				$(".confirm-top img").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
				})
				
				$("#deleteItem0").click(function(e){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
					var newJson=tools.getCookie("carts")?JSON.parse(tools.getCookie("carts")):{};
					
					delete newJson["goodId"+_this.attr("cookie-id")];
					
					newCookie=JSON.stringify(newJson);
					
					tools.setCookie("carts",newCookie,7);
					itemList();
					tools.cartsShow();
				})
				
				$(".button-no").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
				})
				
				$(".button-close").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
				})
				
				$("#deleteAll").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
					tools.removeCookie("carts");
					itemList();
				})
				$("#deleteItem").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
					var newJson=window.localStorage.carts?JSON.parse(window.localStorage.carts):{};
					console.log(newJson);
					console.log(_this.attr("cookie-id"));
					delete newJson["goodId"+_this.attr("cookie-id")];
					console.log(newJson);
					newCookie=JSON.stringify(newJson);
					console.log(newCookie);
					window.localStorage.carts=newCookie
					//tools.setCookie("carts",newCookie,7);
					itemList();
				})
				$("#toLogin").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
					location.href="login.html";
				})
			};
			
			$('.shopcar').click(function(){
				location.href="shopCar.html";
			})
			
		})
	}
	}
})