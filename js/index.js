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

			// 轮播图
			var oDiv= document.getElementById("big_box");
			oDiv.parentNode.style.backgroundColor="#f1f1f1";
			tools.lunBo(oDiv,2000);

			var contentTimer=setInterval(function(){
				if($(".content").css("top")=="-20px"){
					$(".content").css("top",0);
				}else{
					$(".content").animate({top:"-20px"},500);
				}
			},1000)


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
				success:function(data){
					var arr=[
                        {
                        	"src":"2-1.jpg",
                        	"price":"￥300",
                        	"buynum":"200"

                        },
                        {
                        	"src":"2-1.jpg",
                        	"price":"￥300",
                        	"buynum":"200"

                        },
                        {
                        	"src":"2-1.jpg",
                        	"price":"￥300",
                        	"buynum":"200"

                        }
					]
					var result=JSON.parse(data).infos;
					console.log(result)
					var main1source=`
						
							{{each result as value index}}
							<dd>
								<div class="main1-dd-top">
									<img src="img/index/timer_07.png"/>
									<h3>剩余<span>8</span>小时<span>10</span>分<span>20</span>秒</h3>
								</div>
								<div class="main1-dd-middle">
									<div class="main1-dd-middle-img" style="background:url(img/index/{{value.src}}) no-repeat;background-size:100% 100%"></div>
									<h3>{{value.des1}}</h3>
								</div>
								<div class="main1-dd-bottom">
									<h4>￥<span>{{value.price}}</span>
									</h4>
									<a href="#"><img src="img/index/buy_11.png"/></a> 
								</div>
								<div class="main1-dd-footer"><span>{{value.buynum}}</span>人购买</div>
							</dd>
							{{/each}}
						`
					
					var main1data={result};
					var main1render=template.compile(main1source);
					var main1html=main1render(main1data);
					$(".main1-dd").html(main1html);
					$(".main1-dd dd").mouseover(function(){
						$(".main1-dd dd")
						$(this).css({"border":"1px solid #fd1d5b","cursor":"pointer"})
					}).mouseout(function(){
						$(".main1-dd dd").css({"border":"1px solid #e4e4e4"})
					})
				}
		 })
		 $(".main2-top a").mouseover(function(){
				$(".main2-top a").removeClass();
				$(this).addClass("main2-li-active");
			}).mouseout(function(){
				$(".main2-top a").removeClass();
		 })
		$.ajax({
				url:"list.json",
				success:function(data){
					var arr=[
                        {
                        	"src":"8-1.jpg",
                        	"name":"",
                        	"des1":"Dior 迪奥",
                        	"des2":"烈艳蓝金唇膏金属光999# (传奇红唇) 3.5g",
                        	"price":198.00,
                        	"discount":"6.6"
                        },
                        {
                        	"src":"8-2.jpg",
                        	"name":"",
                        	"des1":"安娜苏筑梦天马淡香水30ml",
                        	"des2":222,
                        	"price":208.00,
                        	"discount":"4.7"
                        },
                        {
                        	"src":"8-4.jpg",
                        	"name":"",
                        	"des1":"资生堂新红妍肌活精华露50ml",
                        	"des2":222,
                        	"price":598.00,
                        	"discount":"7"
                        },
                        {
                        	"src":"8-3.jpg",
                        	"name":"hhhh",
                        	"des1":"Estee Lauder雅诗兰黛",
                        	"des2":"过夜面膜 水润鲜活 修护润亮 一霜两用",
                        	"price":368.00,
                        	"discount":"5.9"
                        },
                        {
                        	"src":"8-5.jpg",
                        	"name":"hhhh",
                        	"des1":"男士净肤细致爽肤水200ml",
                        	"des2":"控油止汗，收细毛孔",
                        	"price":130.00,
                        	"discount":"4.6"
                        },
                        {
                        	"src":"8-6.jpg",
                        	"name":"",
                        	"des1":"资生堂红妍肌活精华露/红腰子10ml*3",
                        	"des2":222,
                        	"price":100,
                        	"discount":"1"
                        },
                        {
                        	"src":"8-7.jpg",
                        	"name":"",
                        	"des1":"资生堂红妍肌活精华露/红腰子10ml*3",
                        	"des2":222,
                        	"price":100,
                        	"discount":"1"
                        }
					]
					var result=arr;//JSON.parse(data).infos;
					var main2source=`
					<div class="main2-bottom-div1">
							<a href="#">
								<div class="main2-div1-box">
									<h3>{{result[0].name}}</h3>
									<div class="main2-div1-box-imgbox" style="background:url(img/index/{{result[0].src}}) no-repeat;background-size:100% 100%"></div>
								</div>
							</a>
							<div class="main2-div1-des">
								<p>{{result[0].des1}}</p>
								<p>{{result[0].des2}}</p>
							</div>
							<div class="main2-div1-price">
								￥<span>{{result[0].price}}</span>({{result[0].discount}}折扣)
							</div>
						</div>
						<div class="main2-bottom-div2">
							<div class="main2-div2-top">
								<div class="left">
									<a href="#">
										<div class="main2-div2-box">
											<h3>{{result[1].name}}</h3>
											<div class="main2-div2-box-imgbox" style="background:url(img/index/{{result[1].src}}) no-repeat;background-size:100% 100%"></div>
										</div>
									</a>
									<div class="main2-div2-des">
										<p>{{result[1].des1}}</p>
									</div>
									<div class="main2-div2-price">
										￥<span>{{result[1].price}}</span>({{result[1].discount}}折扣)
									</div>
								</div>
								<div class="right">
									<div class="main2-div2-des">
										<p>{{result[2].des1}}</p>
									</div>
									<div class="main2-div2-price">
										￥<span>{{result[2].price}}</span>({{result[2].discount}}折扣)
									</div>
									<a href="#">
										<div class="main2-div2-box">
											<h3>{{result[2].name}}</h3>
											<div class="main2-div2-box-imgbox" style="background:url(img/index/{{result[2].src}}) no-repeat;background-size:100% 100%"></div>
										</div>
									</a>
									
								</div>
							</div>
							<div class="main2-div2-bottom">
								<div class="left">
									<a href="#">
										<div class="main2-div2-box">
											<h3>{{result[3].name}}</h3>
											<div class="main2-div2-box-imgbox" style="background:url(img/index/{{result[3].src}}) no-repeat;background-size:100% 100%"></div>
										</div>
									</a>
								</div>
								<div class="right">
									<div class="main2-div2-des">
										<p>{{result[3].des1}}</p>
										<p class="p2">{{result[3].des2}}</p>
									</div>
									<div class="main2-div2-price">
										￥<span>{{result[3].price}}</span>({{result[3].discount}}折扣)
									</div>
								</div>
								
							</div>
						</div>
						<div class="main2-bottom-div3">
							<div class="main2-div1-des">
								<p>{{result[4].des1}}</p>
								<p>{{result[4].des2}}</p>
							</div>
							<div class="main2-div1-price">
								￥<span>{{result[4].price}}</span>({{result[4].discount}}折扣)
							</div>
							<a href="#">
								<div class="main2-div1-box">
									<h3>{{result[4].name}}</h3>
									<div class="main2-div1-box-imgbox" style="background:url(img/index/{{result[4].src}}) no-repeat;background-size:100% 100%"></div>
								</div>
							</a>
						</div>
						<div class="main2-bottom-div4">
							<div class="main2-div4-top">
								<a href="#">
									<div class="main2-div2-box">
										<h3>{{result[5].name}}</h3>
										<div class="main2-div2-box-imgbox" style="background:url(img/index/{{result[5].src}}) no-repeat;background-size:100% 100%"></div>
									</div>
								</a>
								<div class="main2-div2-des">
									<p>{{result[5].des1}}</p>
								</div>
								<div class="main2-div2-price">
									￥<span>{{result[5].price}}</span>({{result[5].discount}}折扣)
								</div>
							</div>
							
							<div class="main2-div4-bottom">
								<a href="#">
									<div class="main2-div2-box">
										<h3>{{result[6].name}}</h3>
										<div class="main2-div2-box-imgbox" style="background:url(img/index/{{result[6].src}}) no-repeat;background-size:100% 100%"></div>
									</div>
								</a>
								<div class="main2-div2-des">
									<p>{{result[6].des1}}</p>
								</div>
								<div class="main2-div2-price">
									￥<span>{{result[6].price}}</span>({{result[6].discount}}折扣)
								</div>
							</div>
						</div>
					`
					var main2data={result};
					var main2render=template.compile(main2source);
					var main2html=main2render(main2data);
					$(".main2-bottom li").html(main2html);
				}
			})	

		$.ajax({
				url:"list.json",
				success:function(data){
				        var srcArr=[
				        {
				        	"src":"6-1.jpg"
				        },
				        {
				        	"src":"6-2.jpg"
				        },
				        {
				        	"src":"6-3.jpg"
				        },
				        {
				        	"src":"6-4.jpg"
				        }
				        ]
					var result=srcArr//JSON.parse(srcArr);//JSON.parse(data).infos;
					var main3source=`
						{{each result as value index}}
						<a href="#">
						<li
						 style="background:url(img/index/{{value.src}}) no-repeat;background-size:100% 100%">
						</li>
							</a>
						{{/each}}
						`
					var main3data={result};
					var main3render=template.compile(main3source);
					var main3html=main3render(main3data);
					$(".main3-bottom").html(main3html);
				}				
			})
		 $.ajax({
				url:"list.json",
				success:function(data){
					var arr=[
                        
                          {
                          	"name":"",
                          	"des1":"Estee Lauder 雅诗兰黛",
                          	"des2":"细透亮 一瓶就够",
                          	"src":"7-1.jpg",
                          	"price":"628.oo"
                          }
                          
                         ,
                         
                          {
                          	"name":"",
                          	"des1":"蚕丝蜗牛胶原蛋白面膜10片/盒",
                          	"des2":"保湿嫩白 祛痘淡印",
                          	"src":"9-1.jpg",
                          	"price":"75.00"
                          }
                          
                         ,
                         
                          {
                          	"name":"",
                          	"des1":"雅诗兰黛特润修护精华眼霜15ml",
                          	"des2":"水亮弹嫩 一眼年轻",
                          	"src":"9-2.jpg",
                          	"price":"100"
                          }
                          
                         ,
                          
                          {
                          	"name":"香水",
                          	"des1":"伊丽莎白雅顿时空焕活胶囊金胶组合",
                          	"des2":"让双眸恢复紧致平滑",
                          	"src":"9-3.jpg",
                          	"price":"475.00"
                          }
                          
                         ,
                          
                          {
                          	"name":"香水",
                          	"des1":"资生堂新红妍肌活眼部精华露15ml",
                          	"des2":"让双眸恢复紧致平滑",
                          	"src":"9-4.jpg",
                          	"price":"398.00"
                          }
                          
                         
					]
					var result=arr;//JSON.parse(data).infos;
					
					var main4source=`
					<div class="mainmain-div1">
							<a href="#">
								<div class="mainmain-box" style="border:none">
									<h3>{{result[0].name}}</h3>
									<div class="imgbox" style="background:url(img/index/{{result[0].src}}); background-size:100% 100%"></div>
								</div>
							</a>
							<div class="mainmain-des">
								<p class="p1">{{result[0].des1}}</p>
								<p class="p2">{{result[0].des2}}</p>
								<div class="mainmain-price" >￥<span>{{result[0].price}}</span>({{result[0].discount}}折)</div>
							</div>
						</div>
						<div class="mainmain-div2">
							<a href="#">
								<div class="mainmain-box" style="border:none">
									<h3>{{result[1].name}}</h3>
									<div class="imgbox" style="background:url(img/index/{{result[1].src}}); background-size:100% 100%"></div>
								</div>
							</a>
							<div class="mainmain-des">
								<p class="p1">{{result[1].des1}}</p>
								<p class="p2">{{result[1].des2}}</p>
								<div class="mainmain-price" >￥<span>{{result[1].price}}</span>({{result[1].discount}}折)</div>
							</div>
						</div>
						<div class="mainmain-div3">
							<div class="mainmain-des">
								<p class="p3">{{result[2].des1}}</p>
								<p class="p4">{{result[2].des2}}</p>
								<div class="mainmain-price" >￥<span>{{result[2].price}}</span>({{result[2].discount}}折)</div>
							</div>
							<a href="#">
								<div class="mainmain-box" style="border:none">
									<h3>{{result[2].name}}</h3>
									<div class="imgbox" style="background:url(img/index/{{result[2].src}}); background-size:100% 100%"></div>
								</div>
							</a>
						</div>
						<div class="mainmain-div4">
							<div class="mainmain-des">
								<p class="p3">{{result[3].des1}}</p>
								<p class="p4">{{result[3].des2}}</p>
								<div class="mainmain-price" >￥<span>{{result[3].price}}</span>({{result[3].discount}}折)</div>
							</div>
							<a href="#">
								<div class="mainmain-box" style="border:none">
									<h3>{{result[3].name}}</h3>
									<div class="imgbox" style="background:url(img/index/{{result[3].src}}); background-size:100% 100%"></div>
								</div>
							</a>
						</div>
						<div class="mainmain-div5">
							<div class="mainmain-des">
								<p class="p3">{{result[4].des1}}</p>
								<p class="p4">{{result[4].des2}}</p>
								<div class="mainmain-price" >￥<span>{{result[4].price}}</span>({{result[4].discount}}折)</div>
							</div>
							<a href="#">
								<div class="mainmain-box" style="border:none">
									<h3>{{result[4].name}}</h3>
									<div class="imgbox" style="background:url(img/index/{{result[4].src}}); background-size:100% 100%"></div>
								</div>
							</a>
						</div>
					`
					var main4data={result};
					var main4render=template.compile(main4source);
					var main4html=main4render(main4data);
					$(".mainmain-middle").html(main4html);
				}
			})

            // 护肤
            $.ajax({
				url:"list.json",
				success:function(data){
					var arr=[
                        
                          {
                          	"name":"",
                          	"des1":"Estee Lauder 雅诗兰黛",
                          	"des2":"细透亮 一瓶就够",
                          	"src":"9-1.jpg",
                          	"price":"628.00"
                          }
                          
                         ,
                         
                          {
                          	"name":"香水",
                          	"des1":"描述",
                          	"src":"6-1.jpg",
                          	"price":"100"
                          }
                          
                         ,
                         
                          {
                          	"name":"香水",
                          	"des1":"描述",
                          	"src":"6-1.jpg",
                          	"price":"100"
                          }
                          
                         ,
                          
                          {
                          	"name":"香水",
                          	"des1":"描述",
                          	"src":"6-1.jpg",
                          	"price":"100"
                          }
                          
                         ,
                          
                          {
                          	"name":"香水",
                          	"des1":"描述",
                          	"src":"6-1.jpg",
                          	"price":"100"
                          },
                          {
                          	"name":"香水",
                          	"des1":"描述",
                          	"src":"6-1.jpg",
                          	"price":"100"
                          }
                          
                         
					]
					var result=arr//JSON.parse(data).infos;
				
					var main4rightsource=`<dl>
							<dt>护肤热销</dt>
							<a href="#">
								<div class="mainmain-box box2" style="border:none">
									<h3>{{result[0].name}}</h3>
									<div class="imgbox" style="background:url(img/index/{{result[0].src}}); background-size:100% 100%"></div>
								</div>
							</a>
							<div class="mainmain-des">
								<p class="p5">{{result[0].des2}}</p>
								<div class="mainmain-price">￥<span>{{result[0].price}}</span></div>
							</div>
							<ul>
								<li>
									<div class="sig">2</div>
									<div>{{result[1].name}}</div>
								</li>
								<li>
									<div class="sig">3</div>
									<div>{{result[2].name}}</div>
								</li>
								<li>
									<div class="sig">4</div>
									<div>{{result[3].name}}</div>
								</li>
								<li>
									<div class="sig">5</div>
									<div>{{result[4].name}}</div>
								</li>
								<li>
									<div class="sig">6</div>
									<div>{{result[5].name}}</div>
								</li>
							</ul>
						</dl>`
					var main4rightdata={result};
					var main4rightrender=template.compile(main4rightsource);
					var main4righthtml=main4rightrender(main4rightdata);
					$(".mainmain-right").html(main4righthtml);
				}
			})

          //点击楼梯时 滚动位置
		  $("#loutiNav li").click(function() {
				$(this).find("span").addClass('active').parent().siblings().find("span").removeClass('active');
                 // console.log($(this).index("li"));
                 // alert($(this).index());
				var iScrollTop = $(".louti").eq($(this).index()+1).offset().top;
				console.log(iScrollTop);
				$("html, body").stop().animate({scrollTop: iScrollTop}, 1000);
		 })

		 var navTop=$(".box-nav").offset().top;
		   $(window).scroll(function() {
				var iScrollTop = $(this).scrollTop();
				//滚动时楼梯颜色变化
				$(".louti").each(function() {
					if(iScrollTop>=$(this).offset().top) {
						$("#loutiNav li").eq($(this).index(".louti")).find("span").addClass('active').parent().siblings().find("span").removeClass('active');
					}
				})
				//滚动超过时导航栏的 显示隐藏
				if(iScrollTop>=$(".louti").eq(0).offset().top){
					$(".box-nav").css("position","fixed").css("top",0);
					$(".snd-li ").css("display","none");
					$(".nav-first").mouseover(function(){
						$(".snd-li ").css("display","block");
					}).mouseout(function(){
						$(".snd-li ").css("display","none");
					})
					
				}else{
					$(".box-nav").css("position","relative").css("top",0);
					$(".snd-li ").css("display","block");
				}
		 })

























		})
	})
})