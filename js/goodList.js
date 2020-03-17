require(["config"],function(){
  require(["jquery","tools","common","compart","jquery.ui",],function($,tools,common,compart){
  	$(function(){
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


		$(".boxleft .boxleft-link li span").click(function(){
			if($(this).attr("class")=="close"){
				$(this).attr("class","open");
			}else{
				$(this).attr("class","close");
			}
		})
		$(".boxright .itemlist .option1 li:not(:first-child)").click(function(){
			var ind=$(this).index();
			console.log(ind);
			$(".boxright .itemlist .content1 li").css("display","none");
			var className="index"+ind;
				
			$(".boxright .itemlist .content1 li[class*="+className+"]").css("display","block");
				
		})
		$(".boxright .itemlist .option li:not(:first-child)").click(function(){
    		$(this).parent().children().removeClass("li-check");
			$(this).addClass("li-check");
    	})
    	var userName=window.localStorage.userName;
        tools.cartsShow();
    	var pageNum=1;
		var start=[];
		var totalNum=0;
		var currentPage=1;//当前页数，始终开始时设为1.
		var perNum=[];
		var perPage=36;
		var sql="";


		//计算当前获取条件下的商品数量。
		function itemNum(other){
			console.log("other"+other)
             if(other==""){
				other=1;
			}

			start=[];
			perNum=[];
			totalNum=0;
			pageNum=1;

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

			$.ajax({
					url:"list.json",
					data:{"other":other},
					async:false,
					success:function(data){
						var result=JSON.parse(data).infos;
						totalNum=result.length;
						
						pageNum=Math.ceil(totalNum/perPage);
						
						for(var i=0;i<pageNum-1;i++){
							start[i]=i*perPage;
							perNum[i]=perPage;
						}
						start[pageNum-1]=(pageNum-1)*perPage;
						perNum[pageNum-1]=totalNum-(pageNum-1)*perPage;
						$(".total-item").text(totalNum);
						$(".total-page").text(pageNum);
						
				}				
			  })
			}

			//动态加载数据，填充分页信息。
    		function itemPush(start,num,othersql){
    			console.log(start,num,othersql)
 				if(othersql==""){
					othersql=1;
				}
	    		$.ajax({
					url:"list.json",
					data:{"start":start,"num":num,"other":othersql},
					success:function(data){
						console.log("sddddddd");
						var arr=[

                              {
                              	"id":001,
                              	"src":"list-1.jpg",
                              	"price":"12",
                              	"name":"洗发露",
                              	"discount":"2"

                              },
                              {
                              	"id":002,
                              	"src":"list-2.jpg",
                              	"price":"123",
                              	"name":"洗发露",
                              	"discount":"10"

                              },
                              {
                              	"id":003,
                              	"src":"list-3.jpg",
                              	"price":"1234",
                              	"name":"洗发露",
                              	"discount":"101"

                              }
						]
						var result=arr//JSON.parse(data).infos;
						var itemsource=`
							{{each result as value index}}
							<div class="itembox">
									<a class="toDetail" data-id="{{value.id}}">
										<div class="imgbox" style="background:url(img/goodList/{{value.src}}) no-repeat;background-size:100% 100%"></div>
									</a>
									<div class="imgdes">
										<div class="name"><a class="toDetail" data-id="{{value.id}}">{{value.name}}</a></div>
										<p>￥{{value.price}}({{value.discount}}折)</p>
										<div><span class="buynow buynow2" data-num="{{value.id}}">加入购物车</span><span class="collect">收藏</span></div>
									</div>
								</div>
							{{/each}}
							`
						var itemdata={result};
						var itemrender=template.compile(itemsource);
						var itemhtml=itemrender(itemdata);
						$(".itemcontainer").html(itemhtml);
						
						$(".buynow2").click(function(){
							var goodId="goodId"+$(this).attr("data-num");
							var goods=tools.getCookie("carts")?JSON.parse(tools.getCookie("carts")):{};
							if(goodId in goods){
								goods[goodId].num++;
							}else{
								goods[goodId]={
									id:goodId,
									num:1
								}
							}
							tools.setCookie("carts",JSON.stringify(goods),7);
							tools.cartsShow();
							location.href="shopCar.html";
						})
						
						//商品详情页面下的商品点击事件
						$(".toDetail").click(function(){
							var str=[];
							str[0]=parseInt($(this).attr("data-id"));
						
						//获取数据库中最新浏览的记录.str的第一个字段存储当前跳转的页面,后面三个存储最近三个访问的页面.
							if(userName!=""){
								//用户名不为空,执行数据库字段调取.
								$.ajax({
									url:"data/goodList/userinfo_get.php",
									data:{"userName":userName},
									async:false,
									success:function(data){
										var result=JSON.parse(data).infos;
										
										str[1]=result[0].view1?parseInt(result[0].view1):0;
										str[2]=result[0].view2?parseInt(result[0].view2):0;
										str[3]=result[0].view3?parseInt(result[0].view3):0;
										
									}
								})
								//修改数据库中最新浏览记录.
								$.ajax({
									url:"list.json",
									data:{"userName":userName,"html":str},
									type:"POST",
									success:function(data){
									}
								})
							}
							console.log("str[0]"+str[0]);
							location.href="goodDetail.html?id="+str[0];
						})
					}
				})
			}
			//check当前状态,获取sql限制语句.
    		function checkState(){
    			sql="";
    			var numsql2=$(".option-price li[class='li-check']").index()-1;
				switch(numsql2){
					case 0:sql="where price>0 ";break;
					case 1:sql="where price between 0 and 100 ";break;
					case 2:sql="where price between 101 and 200 ";break;
					case 3:sql="where price between 201 and 300 ";break;
					case 4:sql="where price between 301 and 400 ";break;
					case 5:sql="where price between 401 and 800 ";break;
				}
				if($(".itemget .title .sort-price").hasClass("sort-checked")){
					sql+="order by price ";
				}
				return sql;
    		}

    		//价格范围限定的sql语句设定.
			$(".option-price li").click(function(){
				sql="";
				currentPage=1;
				$(".current-page").text(currentPage);
				var numsql=$(this).index()-1;
				switch(numsql){
					case 0:sql="where price>0 ";break;
					case 1:sql="where price between 0 and 100 ";break;
					case 2:sql="where price between 101 and 200 ";break;
					case 3:sql="where price between 201 and 300 ";break;
					case 4:sql="where price between 301 and 400 ";break;
					case 5:sql="where price between 401 and 800 ";break;
				}
				if($(".itemget .title .sort-price").hasClass("sort-checked")){
					sql+="order by price ";
				}
				itemNum(sql);
				itemPush(start[currentPage-1],perNum[currentPage-1],sql);
			})

			//绑定排序功能,检察是否选中排序,和选中排序以后的数据库对应实现筛选功能
			$(".sort-price").click(function(){
				sql="";
				currentPage=1;
				$(".current-page").text(currentPage);
				var numsql2=$(".option-price li[class='li-check']").index()-1;
				switch(numsql2){
					case 0:sql="where price>0 ";break;
					case 1:sql="where price between 0 and 100 ";break;
					case 2:sql="where price between 101 and 200 ";break;
					case 3:sql="where price between 201 and 300 ";break;
					case 4:sql="where price between 301 and 400 ";break;
					case 5:sql="where price between 401 and 800 ";break;
				}
				sql+="order by price ";
				itemNum(sql);
				itemPush(start[currentPage-1],perNum[currentPage-1],sql);
			})

			$(".itemget .title .sort").click(function(){
				$(this).addClass("sort-checked").siblings().removeClass("sort-checked");
			})

				//分页功能,单击以后实现页码变化,和页码如果指到头了以后发生的对应变化.
			$(".back-button").click(function(){
				if(currentPage==1){
					
				}else if(currentPage==2){
					currentPage-=1;
					$(".back-button").removeClass("button-checked");
					$(".next-button").addClass("button-checked");
					$(".current-page").text(currentPage);
					var currentsql=checkState();
					itemNum(currentsql);
					itemPush(start[currentPage-1],perNum[currentPage-1],currentsql);
				}else{
					$(".back-button").addClass("button-checked");
					$(".next-button").addClass("button-checked");
					currentPage-=1;
					$(".current-page").text(currentPage);
					var currentsql=checkState();
					itemNum(currentsql);
					itemPush(start[currentPage-1],perNum[currentPage-1],currentsql);
				}
			})
			$(".next-button").click(function(){
				if(currentPage==pageNum){
					
				}else if(currentPage==pageNum-1){
					$(".back-button").addClass("button-checked");
					$(".next-button").removeClass("button-checked");
					currentPage+=1;
					$(".current-page").text(currentPage);
					var currentsql=checkState();
					itemNum(currentsql);
					itemPush(start[currentPage-1],perNum[currentPage-1],currentsql);
				}else{
					$(".back-button").addClass("button-checked");
					$(".next-button").addClass("button-checked");
					currentPage+=1;
					$(".current-page").text(currentPage);
					var currentsql=checkState();
					itemNum(currentsql);
					itemPush(start[currentPage-1],perNum[currentPage-1],currentsql);
				}
			})
			
			sql=checkState();
			itemNum(sql);
			itemPush(start[currentPage-1],perNum[currentPage-1],sql);
		


  	})
  })
})