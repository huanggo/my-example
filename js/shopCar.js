require(["config"],function(){
   require(["jquery","tools","jquery.ui",],function($,tools){
       $(function(){
       	 $(".snd-li ").css("display","none");
		$(".nav-first").mouseover(function(){
				$(".snd-li ").css("display","block");
		}).mouseout(function(){
				$(".snd-li ").css("display","none");
		})

		Mock.mock(/\.json/, {
            'code':0,
            'message':'message信息',
            'infos|1-10': [{
                'id|+1': 1,
                'price|+1': 100,
                'buynum|+1': 100,
                'src':'main4-2.jpg',
                'des1':"就会很好很好",
                'name':"沐浴露"
            }],
                'infos2|1-10': [{
                'id|+1': 1,
                'price|+1': 100,
                'buynum|+1': 100,
                'src':'6-1.jpg',
                'des1':"就会很好很好",
                'name':"沐浴露"
            }]
           })
		//根据当前cookie反馈对应的页面，并且绑定事件。
		function itemList(){
				//进页面时清空当前容器的内容。
				console.log("进页面时清空当前容器的内容");
				console.log(window.localStorage.carts);
				$(".main1-item").empty();
				var cartsInfo=window.localStorage.carts?JSON.parse(window.localStorage.carts):{};
				
				//检查cookie确定是否显示购物车为空的信息。
				if(window.localStorage.carts=="{}"||!(window.localStorage.carts)){
					$(".void-info").css("display","block");
				}else{
					$(".void-info").css("display","none");
				}
				//存储cookie每一种商品的id和num。
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
							var	totalPrice=sequence[i]*result[0].price;
							var source=`
								<div class="main1-box">
									<input class="select-this" type="checkbox" cookie-id2="{{itemId[sequence-1]}}"/>
									<div class="title2">{{sequence}}</div>
									<div class="title3">{{result[0].name}}</div>
									<div>450ml</div>
									<div>{{result[0].commonprice}}</div>
									<div>{{result[0].price}}</div>
									<input class="title7" type="text" value="{{itemNumber[sequence-1]}}" title-Id="{{itemId[sequence-1]}}" maxlength="3"/>
									<div>{{totalPrice}} </div>
									<div>转入收藏夹 </div>
									<div class="deleteItem" cookie-id="{{itemId[sequence-1]}}">删除</div></br>
								</div>
								`
							var totalPrice=result[0].price*itemNumber[sequence-1]
							var data={result,sequence,itemNumber,totalPrice,itemId};
							sequence+=1;
							var render=template.compile(source);
							var html=render(data);
							$(".main1-item").append(html);
						}
					})
				}
				//删除当前item
				$(".deleteItem").click(function(){
					$(".confirm1").css("display","block");
					$(".shading").css("display","block");
					checkButton($(this));
				})
				//全选
				$("#selectAll").click(function(){
					if($("#selectAll").prop("checked")==true){
						$(".select-this").prop("checked",true);
						checkBuyitem();
					}else{
						$(".select-this").prop("checked",false);
						checkBuyitem();
					}
				})
				//单选
				$(".select-this").click(function(){
					var checkNum=0;
					for(var i=0;i<$(".select-this").length;i++){
						if($(".select-this").eq(i).prop("checked")==true){
							checkNum++;
						}
					}
					if(checkNum==$(".select-this").length){
						$("#selectAll").prop("checked",true);
					}else{
						$("#selectAll").prop("checked",false);
					}
					
					checkBuyitem();
				})
				//文本修改事件
				$(".title7").blur(function(){
					var _this=parseInt($(this).attr("title-id"));
					
					if(!/^\d+$/.test(this.value)) {
						this.value=this.value.replace(/[^\d]+/g,'');
					}
					if(this.value==""){
						this.value=1;
					}
					cookieSet2(this.value,_this)
					itemList();
					$(this).focus();
				})
				//清空购物车符号点击
				$("#clearCarts").click(function(){
					$(".confirm2").css("display","block");
					$(".shading").css("display","block");
					checkButton($(this));
				})
				//清空购物车文本点击
				$("#clearCarts2").click(function(){
					$(".confirm2").css("display","block");
					$(".shading").css("display","block");
					checkButton($(this));
				})
		}
		itemList();

		checkBuyitem();
			//设置当前cookie
		function cookieSet2(oneTime,numId){
			var goodId="goodId"+numId;
			var goods=tools.getCookie("carts")?JSON.parse(tools.getCookie("carts")):{};
			goods[goodId].num=parseInt(oneTime);
			tools.setCookie("carts",JSON.stringify(goods),7);
				
		}
		//查找选中要购买的项目.
		function checkBuyitem(){
				var chooseJson={};
				for(var i=0;i<$(".select-this").length;i++){
					if($(".select-this").eq(i).prop("checked")==true){
						var choose=window.localStorage.carts?JSON.parse(window.localStorage.carts):{};
						
						var chooseId="goodId"+$(".select-this").eq(i).attr("cookie-id2")
						chooseValue=choose[chooseId];
						chooseJson[chooseId]=chooseValue;
					}
				}
				window.localStorage.buys=JSON.stringify(chooseJson);
				//tools.setCookie("buys",JSON.stringify(chooseJson),7);	
		}
		//继续购物点击事件.
		$("#continue").click(function(){
			location.href="index.html";
		})
		//结算事件.
		$("#count").click(function(){
				if(window.localStorage.userName){
					if(window.localStorage.carts){
						if(window.localStorage.buys && window.localStorage.buys!="{}"){
							location.href="pay.html";
						}else{
							$(".confirm3").css("display","block");
							$(".shading").css("display","block");
							checkButton();
						}
					}else{
						$(".confirm4").css("display","block");
						$(".shading").css("display","block");
						checkButton();
					}
				}else{
					$(".confirm5").css("display","block");
					$(".shading").css("display","block");
					checkButton();
				}
		})

		//检测点击弹框及其对应的响应.
		function checkButton(_this){
				$(".confirm-top img").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
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
					checkBuyitem();
					itemList();
				})
				$("#deleteItem").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
					var newJson=tools.getCookie("carts")?JSON.parse(tools.getCookie("carts")):{};
					delete newJson["goodId"+_this.attr("cookie-id")];
					newCookie=JSON.stringify(newJson);
					tools.setCookie("carts",newCookie,7);
					checkBuyitem();
					itemList();
				})
				$("#toLogin").click(function(){
					$(".shading").css("display","none");
					$(".confirm").css("display","none");
					location.href="login.html#2";
				})
		};

		








       })
   })
})