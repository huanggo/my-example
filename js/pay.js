require(["config"],function(){
   require(["jquery","tools","common","compart","jquery.ui",],function($,tools,common,compart){
       $(function(){

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
       	 // 引入公共部分
            compart.createHtml();
			common.commonFunc();

			var data1 = {
					tele: "010-5166-6655",
					title1: "新浪官方微博",
					title2:"最新美容资讯，新品及促销信息",
					title3:"如何订购",
					list1: ['网上下单', '电话oX', '邮寄订购', '传真订购']
				}
			var data2={
				title0:"newbee"
			}

			var renderFooter = template.compile(tpl.footer);
			var htmlFooter = renderFooter(data1);
			var renderHeader=template.compile(tpl.header);
			var htmlHeader=renderHeader(data2);
			
			$("#box0").html(htmlHeader);
			$("#boxlast").html(htmlFooter);


       	$(".snd-li ").css("display","none");
		$(".nav-first").mouseover(function(){
			$(".snd-li ").css("display","block");
		}).mouseout(function(){
			$(".snd-li ").css("display","none");
		})
		tools.cartsShow();
		var oInfo=document.getElementById("info");
		var oInfoLabel=document.getElementById("infolabel");
		var totalPay=0;

		oInfo.onclick=function(){
			if(oInfo.checked==true){
				$(".order").css("display","block");
			}else{
				$(".order").css("display","none");
			}
		}

		function itemList(){
			console.log("dddd")
				$("item-box").empty();
				var cartsInfo=window.localStorage.buys?JSON.parse(window.localStorage.buys):{};
				
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
							var source=
								`
								<div class="item-list">
									<li class="title1">{{result[0].name}}</li>
									<li>250ml</li>
									<li>{{result[0].commonprice}}</li>
									<li>{{result[0].price}}</li>
									<li>{{itemNumber[sequence-1]}}</li>
									<li>{{totalPrice}}</li>
								</div>
								`
							var totalPrice=result[0].price*itemNumber[sequence-1];
							totalPay+=totalPrice;
							var data={result,sequence,itemNumber,totalPrice,itemId};
							sequence+=1;
							var render=template.compile(source);
							var html=render(data);
							$(".item-box").append(html);
							
						}
					})
				}
    			$(".total span").text(totalPay);
    			console.log("totalPay"+totalPay)
    			if(totalPay<80){
    				$(".total2 span").text(totalPay+5)
    			}
			}
		itemList();

		$(".correct").click(function(){
			location.href="shopCar.html";
		})

		$(".detail-address .left ul input").click(function(){
    		$(".address-tip1").css("display","block");
    		$(".address-tip2").css("display","block");
    		$(".way input").prop("checked",false);
    		$(".send-method").text("配送方式未确定");
    	})

    	$(".way input").click(function(e){
    			
    		$(".address-tip1").css("display","none");
    		$(".address-tip2").css("display","block");
    		if(totalPay>=80){
    			$(".send-method").text("免运费");
    		}else{
    			$(".send-method").text("5");
    				
    		 }
    			
    	})

    	$(".right .pay input").click(function(){
    			$(".address-tip2").css("display","none");
    	})
    		//地址插件的引入
    	//new PCAS("province6","city6","area6","四川省","成都市","青羊区");







       })
   })
})