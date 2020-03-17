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

		//拆分location.search属性来获取当前访问的商品id值。
		var str0=location.search;
		var arr0=[1];
		arr0=str0.split("=");
			
		if(arr0[0]==""){
			arr0[1]=1;
		}
		dataLoad(arr0[1]);
		console.log(arr0)

		//最近浏览功能：首先从cookie获取当前用户名，存储到变量上。
		var userName=window.localStorage.userName//tools.getCookie("usernameLogin");
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

		//最近浏览功能,发送ajax请求，获取用户信息中的浏览信息。拆分获取每个信息。
		if(userName!=""){
			$.ajax({
				url:"list.json",
				data:{"userName":userName},
				success:function(data){
					var result=JSON.parse(data).infos;
					lastView("("+result[0].view2+","+result[0].view3+","+result[0].view4+")");
			}
		 })
		}


		//动态加载页面。
		function dataLoad(goodId){
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
				console.log("goodId"+goodId)
				
				$.ajax({
					url:"list.json",
					data:{"goodId":goodId},
					success:function(data){
						var arr={
							
						}
						console.log("data"+data)
						var result=JSON.parse(data).infos;
						var source=`
							<div class="banner-left">
								<div id="box">
									<ul class="small-img-box">
										<li><a href="##"><img src="img/goodDetail/{{result[0].src}}" alt="" class="active"/></a></li>
										<li><a href="##"><img src="img/goodDetail/list-2.jpg" alt=""/></a></li>
										<li><a href="##"><img src="img/goodDetail/list-3.jpg" alt=""/></a></li>
										<li><a href="##"><img src="img/goodDetail/list-4.jpg" alt=""/></a></li>
									</ul>
									<div class="middle-img-box">
										<img src="img/goodDetail/{{result[0].src}}" class="middle-img"/>
										<div class="image-zoom"></div>
									</div>
									<div class="big-img-box">
										<img src="img/goodDetail/{{result[0].src}}" class="big-img"/>
									</div>
								</div>
								<div class="banner-bottom">
									<div class="banner-bottom1"><img src="img/goodDetail/check_03.png"/><span>点击查看</span></div>
									<div class="banner-bottom2">
										<span>分享到：</span><img src="img/goodDetail/fenxiang_06.png"/>
									</div>
								</div>
							</div>
							<div class="banner-right">
								<h2>{{result[0].name}}<span>大S美容大王推荐</span></h2>
								<div class="part1">
									<h3>英文名称：<span>Shu uemura Skin Purifier Cleaning Beauty Oil Premium A/O Advanced Formara<span></h3>
									<h3>商品编号：<span>8724<span></h3>
									<h3>No5&nbsp;&nbsp;价：<span class="red">￥{{result[0].price}}</span> <span>市场价：￥{{result[0].commonprice}}</span><span>折扣{{result[0].discount}}折</span></h3>
								</div>
								<div class="part2">
									<h3>所属品牌：<span><a href="#">Shu Uemura 植村秀</a>--<a href="#">其他护肤系列</a></span></h3>
									<h3>所属分类：<span><a href="#">面部护理</a>--<a href="#">卸妆步骤</a>--<a href="#">卸妆油 </a></span></h3>
									<h3>用户评分：<span><img src="img/goodDetail/star_03.png"/><img src="img/goodDetail/star_03.png"/><img src="img/goodDetail/star_03.png"/><img src="img/goodDetail/star_03.png"/><img src="img/goodDetail/star_03.png"/></span><span><a href="#">已有36条评论 </a></span></h3>
									<h3>运费说明：<span class="d11010">购物满80元免运费</span><a href="#"> 查看运费</a></h3>
									<h3>消费保障：<span><img src="img/goodDetail/ico01.jpg"/>品质承诺</span>
									<span><img src="img/goodDetail/ico02.jpg"/>货到付款</span>
									<span><img src="img/goodDetail/ico03.jpg"/>不满意退货</span>
									<span><img src="img/goodDetail/ico04.jpg"/>可靠包装</span></h3>
								</div>
								<div class="part3">
									<div>我要买：
										<span>
											<img src="img/goodDetail/reduce.jpg" id="reduce">
											<input type="text" id="buyAnt" value="1" class="textinput" maxlength="3">
											<img src="img/goodDetail/add.jpg" id="add">
										</span>
									</div>
									<div id="toCarts1"></div>
									<div id="collect"></div>
								</div>
							</div>
						`
						var loadData={result};
						var loadRender=template.compile(source);
						var loadHtml=loadRender(loadData);
						$(".banner").html(loadHtml);
						domEffect();
					}
						
				})
			}

			//最近浏览的页面填充操作.
		function lastView(idNum){
				$(".boxleft-other.view a").remove();
				$.ajax({
					url:"list.json",
					data:{"idnum":idNum},
					success:function(data){
						//var 
						var result=JSON.parse(data).infos;
					
						var lastsource=`
						
							{{each result as value index}}
							
							<a href="#">
								<div class="itembox2">
									<div class="imgbox2" style="background:url(img/goodDetail/{{value.src}}) no-repeat;background-size:100% 100%"></div>
									<div class="imgdes2">
										<h4>{{value.name}}</h4>
										<p>￥{{value.price}}</p>
									</div>
								</div>
							</a>
							
							
							{{/each}}
						`
						var lastdata={result};
						var lastrender=template.compile(lastsource);
						var lasthtml=lastrender(lastdata);
						$(".boxleft-other.view").append(lasthtml);
						
					}
				})
		}

		//动态加载的内容的事件绑定函数.
		function domEffect(){
				var oDiv = $("#box"),
					oMiddleImgBox = $(".middle-img-box", oDiv),
					oMiddleImg = $(".middle-img", oMiddleImgBox),
					oImageZoom = $(".image-zoom", oMiddleImgBox),
					oBigImgBox = $(".big-img-box", oDiv),
					oBigImg = $(".big-img", oBigImgBox),
					oSmallImgBox = $(".small-img-box", oDiv),
					aSmallImg = $("img", oSmallImgBox);
	
				// 小  选项卡  active  src
				aSmallImg.mouseover(function() {
					aSmallImg.removeClass("active");
					$(this).addClass('active');
					oMiddleImg.attr("src", $(this).attr("src"));
					oBigImg.attr("src", $(this).attr("src"));
				})
	
				// 中  mouseover  显示放大镜  大
				oMiddleImgBox.mouseover(function() {
					oImageZoom.show();
					oBigImgBox.show();
				})
				oMiddleImgBox.mouseout(function() {
					oImageZoom.hide();
					oBigImgBox.hide();
				})
	
				oMiddleImgBox.mousemove(function(e) {
					iScrollLeft = $(window).scrollLeft(),
						iScrollTop = $(window).scrollTop(),
						iLeft = iScrollLeft + e.clientX - oImageZoom.outerWidth()/2 - oMiddleImgBox.offset().left,
						iTop = iScrollTop + e.clientY - oImageZoom.outerHeight()/2 - oMiddleImgBox.offset().top,
						iSmallLeftMax = oMiddleImgBox.outerWidth() - oImageZoom.outerWidth(),
						iSmallTopMax = oMiddleImgBox.outerHeight() - oImageZoom.outerHeight();
					if(iLeft<0) {
						iLeft = 0;
					} else if(iLeft>iSmallLeftMax) {
						iLeft = iSmallLeftMax;
					}
	
					if(iTop<0) {
						iTop = 0;
					} else if(iTop>iSmallTopMax) {
						iTop = iSmallTopMax
					}
					oImageZoom.css({left: iLeft, top: iTop});
					oBigImg.css({left: -iLeft/iSmallLeftMax*(oBigImg.outerWidth()-oBigImgBox.outerWidth()), top: -iTop/iSmallTopMax*(oBigImg.outerHeight()-oBigImgBox.outerHeight())});
				})
				
				$(".banner-bottom1").click(function(){
					location.href="#";
				})
				
				$("#add").click(function(){
					$("#buyAnt").val(parseInt($("#buyAnt").val())+1);
				})
				$("#reduce").click(function(){
					if(parseInt($("#buyAnt").val())>1){
						$("#buyAnt").val(parseInt($("#buyAnt").val())-1);
					}
				})
				
				//吸顶效果执行
				var toCartsTop=$("#toCarts1").offset().top+$("#toCarts1").outerHeight();
				var ulTop=$(".right-div1 ul").offset().top;
				
				$(window).scroll(function() {
					var iScrollTop = $(this).scrollTop();
					if(iScrollTop>=toCartsTop){
						$("#toCarts2").css("display","block");
					}else{
						$("#toCarts2").css("display","none");
					}
				})
				
				$(window).scroll(function() {
					var iScrollTop = $(this).scrollTop();
					
					if(iScrollTop>=ulTop){
						
						$(".right-div1 ul").css("position","fixed").css("top",0);
						
					}else{
						$(".right-div1 ul").css("position","relative").css("top",0);	
					}
				})
				
				
				
				$("#buyAnt").keyup(function(){
					if(!/^\d+$/.test(this.value)) {
						this.value=this.value.replace(/[^\d]+/g,'');
					}
					if(this.value==""){
						this.value=1;
					}
				})
				$("#toCarts1").click(function(){
					cookieSet($("#buyAnt").val());
					location.href="shopCar.html";
				})
				$("#toCarts2").click(function(){
					cookieSet($("#buyAnt").val());
					location.href="shopCar.html";
				})
			}

        //设置cookie.
		function cookieSet(oneTime){
				var goodId="goodId"+arr0[1];
				var goods=window.localStorage.carts?JSON.parse(window.localStorage.carts):{};
				if(goodId in goods){
					goods[goodId].num=goods[goodId].num+parseInt(oneTime);
				}else{
					goods[goodId]={
						id:goodId,
						num:parseInt(oneTime),
					}
				}
				window.localStorage.carts=JSON.stringify(goods)
				//tools.setCookie("carts",JSON.stringify(goods),7);
			}

		//整段html的瀑布流效果.
		function windowState(){
				var bottomScroll=[];
				for(var i=0;i<=6;i++){
					bottomScroll[i]=$(".right-div"+(i+4)+" .bottom").offset().top;
				}
				
				var htmldetail=[];
				
				htmldetail[0]=`<div class="left">
					<img src="img/goodDetail/list-17.jpg"/>
				</div>
				<div class="right">
					<p><span class="span1">Shu uemura 植村秀绿茶舒润洁颜油</span></p>
					<p><span class="span2"><br>"洁颜油之父"植村秀全新呈现兼具深彻洁净力与卓越抗氧化功效的洁颜新品,每日清洁,祛除各种令肌肤加速老化的顽固彩装,皮脂污垢,高效抗氧祛黄,守护青春光彩!</span></p>
				</div>
				`;
				htmldetail[1]=`<img class="detailimg" src="img/goodDetail/detail2.jpg"/>`;
				htmldetail[2]=`<img class="detailimg" src="img/goodDetail/detail3.jpg"/>`;
				htmldetail[3]=`<img class="detailimg" src="img/goodDetail/detail4.jpg"/>`
				htmldetail[4]=`<img class="detailimg" src="img/goodDetail/detail5.jpg"/>`;
				htmldetail[5]=`<img class="detailimg" src="img/goodDetail/detail6.jpg"/>`;
				htmldetail[6]=`<img class="detailimg" src="img/goodDetail/detail7.jpg"/>
								<img class="detailimg" src="img/goodDetail/detail8.jpg"/>
								<img class="detailimg" src="img/goodDetail/detail9.jpg"/>
								<img class="detailimg" src="img/goodDetail/detail10.jpg"/>`;
				
				var lock=[7];
				for(var i=0;i<7;i++){
					lock[i]=true;
				}
				
				
				for(var j=0;j<=6;j++){
					var iScrollTop = $(window).scrollTop();
					if(lock[j]){
						if(iScrollTop+$(window).height()>bottomScroll[j]){
							lock[j]=false;
							var lockdata={};
							var lockrender=template.compile(htmldetail[j]);
							var lockhtml=lockrender(lockdata);
							$(".right-div"+(j+4)+" .bottom").html(lockhtml);
						}
					}
				}
				//
				$(window).scroll(function(){
					var iScrollTop = $(this).scrollTop();
					for(var j=0;j<=6;j++){
						if(lock[j]){
							if(iScrollTop+$(this).height()>bottomScroll[j]){
								lock[j]=false;
								var lockdata={};
								var lockrender=template.compile(htmldetail[j]);
								var lockhtml=lockrender(lockdata);
								$(".right-div"+(j+4)+" .bottom").html(lockhtml);
							}
						}
					}
				})
			}

        windowState();

  	})
  })
})