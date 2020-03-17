require(["config"],function(){
   require(["jquery","tools","common","compart","jquery.ui",],function($,tools,common,compart){
     $(function(){
     	  console.log("开始");

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

     	  // 分类框显示隐藏
          $(".snd-li").css("display","none");
          $(".nav-first").mouseover(function(){
          	 $(".snd-li").css("display","block");
          }).mouseout(function(){
          	 $(".snd-li").css("display","none");
          })


          // 验证码
          var oul1=document.getElementById("ul1");
          var oul2=document.getElementById("ul2");
          var text1=document.getElementById("test1");
          var text2=document.getElementById("test2");
          var ali1=oul1.getElementsByTagName("li");
          var ali2=oul2.getElementsByTagName("li");

          var color1=new Array(4);
          var color2=new Array(4);

          var sum1="";
		      var sum2="";

		  var box=text1.parentNode;
		  var tip1=box.nextElementSibling;
		  var span1=tip1.lastElementChild;
          //用于判断进入那个页面
		  var str=location.hash;
		  var arr=str.split("#");


          for(var i=0;i<4;i++){
          	var n1=parseInt(Math.random()*10);
          	ali1[i].innerHTML=n1;
          	var n2=parseInt(Math.random()*10);
          	ali2[i].innerHTML=n2;
          	sum1+=n1
          	sum2+=n2
          }
          // 验证码不同颜色
          for(var j=0;j<4;j++){
          	var r1=parseInt(Math.random()*256);
			var g1=parseInt(Math.random()*256);
			var b1=parseInt(Math.random()*256);
			color1[j]="rgb("+r1+","+g1+","+b1+")";
			ali1[j].style.color=color1[j];

			var r2=parseInt(Math.random()*256);
			var g2=parseInt(Math.random()*256);
			var b2=parseInt(Math.random()*256);
			color2[j]="rgb("+r2+","+g2+","+b2+")";
			ali2[j].style.color=color2[j];
          }

          // 登入选择状态表现
          var userName0=document.getElementById("userName0");
          var pwd0=document.getElementById("pwd0");
          var sub=document.getElementById("sub");
          var box1=userName0.parentNode;

          var box2=pwd0.parentNode;
          var tip0=box2.nextElementSibling;
          var span0=tip0.lastElementChild;

          if(window.localStorage.userArr){//判断是否存在
             var array = JSON.parse(window.localStorage.userArr);
          }else{
             array = [];//创建一个新数组
          }

          

          pwd0.onfocus=pwd0.onblur=pwd0.onkeyup=function(evt){
          	box1.className="box2";
          	box2.className="box2";
          	tip0.className="tip default";
          	span0.innerHTML="";
            
          }
           userName0.onfocus=userName0.onblur=userName0.onkeyup=function(evt){
          	box1.className="box2";
          	box2.className="box2";
          	tip0.className="tip default";
          	span0.innerHTML="";
            
          }

           test1.onfocus=test1.onblur=test1.onkeyup=function(evt){
          	box.className="box2";
            tip1.className="tip default";
            span1.innerHTML="";
          }

           Mock.mock(/\.json/, {
            'code':0,
            'message':'message信息',
            'list|1-10': [{
                'id|+1': 1,
                'email': '@EMAIL',
                'name': '@name'
            }]
         })
          
          // 登录按钮
          sub.onclick=function(){
          	console.log("登入按钮");
          	$.ajax({
                 type:"POST",
                 url:"list.json",
                 contentType: 'application/json',
                 timeout: 5000,
                 dataType:'JSON',
                 data: {"userName":userName0.value, "pwd":pwd0.value,},
                 success: function (res) {
                       
                    if(res.code==0){
                      if(test1.value==sum1){
                                var isHad = false;//定义一个开关变量
                                var index = 0 ; //定义一个下标确定用户
                                for(var i =0;i<array.length;i++){
                         if(userName0.value==array[i].userName){//有这个账号
                             isHad=true;
                             index=i;
                           }
 
                       }
                       if(isHad){
                            if(pwd0.value==array[index].pwd){
                              alert("登录成功");
                              window.localStorage.userName=userName0.value;
                              // location.href="index.html";
                              if(arr[1]==2){
                                  location.href="shopCar.html";
                              }else{
                                  location.href="index.html";
                               }
                            }else{
                               alert("错误");
                              }
                        }else{
                          alert('账号不存在或输入错误');
                       }

                     }else{
                      box1.className="box2 error";
                      tip1.className="tip error";
                      span1.innerHTML="验证码错误";
                     }
                        

                           
                    
                     }
                 },
                 Error: function (xhr, type, errorThrown) {
                     console.log(JSON.stringify(xhr));
                     console.log(type);
                     console.log(errorThrown);
                 }
          	})
          	return false;
          }

          // 注册
          var isTrue=0;
	      var  regs={
	    		userNameReg:/^((([\u4e00-\u9fa5])|[a-zA-Z0-9-_]|[\u0040\u002e]){3,30})$/,
	    		pwdReg:/^.{6,16}$/,
	    		numReg:/\d/,
	    		strReg:/[a-zA-Z]/,
	    		tsReg:/[^\u4e00-\u9fa50-9A-Za-z]/,
	    		emailReg:/^\w+@\w+\.(\w)+$/
	    	}

	    var userName=document.getElementById("userName");
	    var pwd=document.getElementById("pwd");
	    var pwd2=document.getElementById("pwd2");
	    var email=document.getElementById("email");
      var ck=document.getElementById("ck");
      var btn=document.getElementById("btn");

        // 昵称
      userName.onfocus=userName.onblur=userName.onkeyup=function(evt){
        	var e=evt||window.event;
          checkUserName(e);
      }
        // 密码
        pwd.onfocus=pwd.onblur=pwd.onkeyup=function(evt){
        	var e=evt||window.event;
            checkPwd(e);
        }

        pwd2.onkeyup=function(){
	    		checkPwd2();
	    }
	    // 邮件

        email.onfocus=email.onblur=email.onkeyup=function(evt){
        	var e=evt||window.event;
            checkEmail(e);
        }


      function checkUserName(_e){
         	 var type;
        	 if(_e){
	    		 type=_e.type;
	    	   }
           var value=userName.value;
           var box=userName.parentNode;
           var tip=box.nextElementSibling;
           var span=tip.lastElementChild;
           if(type=="focus"&&value==""){
           	    box.className="box2";
	    		      tip.className="tip default";
	    		      span.innerHTML='3~30位，由汉字、字母、数字、点、减号、下划线及"@"组成';
	 			        return false; 
           }
           if(type=="blur"&&value==""){	
	    		     box2.className="box2";
	    		     tip.className="tip hide";
	 			       return false;   					
	    	    }

	    	if(value==""){
	    		box.className="box2 error";
	    		tip.className="tip error";
	    		span.innerHTML="用户名不能为空";
	    		return false;
	    	}else if(regs.userNameReg.test(value)){
	    		box.className="box2 right";
		    	tip.className="tip hide";
	    	}else{
	    		box.className="box2 error";
	    		tip.className="tip error";
	    		span.innerHTML="用户名的长度应为3~30个字符之间(汉字占两个字符)！";
	    		return false;
	    	}
         for(var i =0;i<array.length;i++){
           if(value==array[i].userName){//有这个账号
              isTrue=0;
 
           }else{
              isTrue=1;
           }
         }

         if(isTrue){
            box.className="box2 right";
            tip.className="tip hide";
            return true;
         }else{
            box.className="box2 error";
            tip.className="tip error";
            span.innerHTML="对不起，用户名已被注册，请您重新输入！"
            return false;  
         }

	    	
        }

        function checkPwd(_e){
        	var type
	    	if(_e){
	    		type=_e.type;
	    	}

	    	var value=pwd.value;
	    	var box=pwd.parentNode;
	    	var tip=box.nextElementSibling;
	    	var span=tip.lastElementChild;
	    	if(type=="focus"&&value==""){
	    		box.className="box2";
	    		tip.className="tip default";
	    		span.innerHTML="6~16位，建议使用字母、数字、特殊字符组合";
	 			return false;   			
	    			
	    	}
	    	if(type=="blur"&&value==""){	
	    		box.className="box2";
	    		tip.className="tip hide";
	    
	 			return false;   				
	    	}
	    	if(value==""){
          box.className="box2 error";
	    		tip.className="tip error";
	    		span.innerHTML="密码不能为空";
	    		return false;
	    	}else if(regs.pwdReg.test(value)){
	    		box.className="box2 right";
	    		tip.className="tip hide";
	    		return true;
	    	}else{
	    		box.className="box2 error";
	    		tip.className="tip error";
	    		span.innerHTML="密码的长度应该为6～16个字符之间！";
	    		return false;
	    	}
        }
        function checkPwd2(){
        	var value=pwd2.value;
	    	  var box=pwd2.parentNode;
	    	  var tip=box.nextElementSibling;
	    	  var span=tip.lastElementChild;

	    	if(value==pwd.value){
	    		box.className="box2 right";
	    		tip.className="tip hide";
	    		return true;
	    	}else{
	    		box.className="box2 error";
	    		tip.className="tip error";
	    		span.innerHTML="两次输入的密码不一致，请重新输入！";
	    		return false;
	    	}
        }
        function checkEmail(_e){
        	var type
	    	if(_e){
	    		type=_e.type;
	    	}
	    		var value=email.value;
	    		var box=email.parentNode;
	    		var tip=box.nextElementSibling;
	    		var span=tip.lastElementChild;
	    	if(type=="focus"&&value==""){
	    			
	    			box.className="box2";
	    			tip.className="tip default";
	    			span.innerHTML="请输入正确的邮箱格式";
	 				  return false;   			
	    	}
	    	if(type=="blur"&&value==""){
	    			
	    			box.className="box2";
	    			tip.className="tip hide";
	 				  return false;   				
	    	}
	    	if(value==""){
	    			box.className="box2 error";
	    			tip.className="tip error";
	    			span.innerHTML="请您输入邮件地址！";
	    			return false;
	    	}else if(regs.emailReg.test(value)){
	    			box.className="box2 right";
	    			tip.className="tip hide";
	
	    			return true;
	    			
	    	}else{
	    			box.className="box2 error";
	    			tip.className="tip error";
	    			span.innerHTML="邮件地址的格式不正确，请您重新输入！";
	    			return false;
	    		}

        }

        var box4=test2.parentNode;
	      var tip4=box4.nextElementSibling;
	      var span4=tip4.lastElementChild;
	     // 验证码

        test2.onfocus=test2.onblur=test2.onkeyup=function(evt){
        box4.className="box2";
	    	tip4.className="tip default";
	    	span4.innerHTML="";
        }

        btn.onclick=function(){
            var box=ck.parentNode;
	    	    var tip=box.nextElementSibling;
	    	    var span=tip.lastElementChild;
           
            if(ck.checked){
                 if(checkUserName()&&checkPwd()&&checkPwd2()&&checkEmail()){
                    if (test2.value==sum2) {
                     	$.ajax({
                          type:"POST",
                          url:"list.json",
                          contentType: 'application/json',
                          timeout: 5000,
                          dataType:'JSON',
                          data: {"userName":userName.value, "pwd":pwd.value,},
                          success: function (res) {
                            console.log(res);
                       if(res.code==0){
                       	 // location.href="index.html";
                            
                           var obj={"userName":userName.value, "pwd":pwd.value};
                           array.push(obj);
                           window.localStorage.userArr=JSON.stringify(array);
                           alert("注册成功,请登录");
                           location.href="login.html";
                       }else{
                       	   alert("注册失败");
                       }
                 },
                 Error: function (xhr, type, errorThrown) {
                     console.log(JSON.stringify(xhr));
                     console.log(type);
                     console.log(errorThrown);
                 }
          	    })

                     }else{
                     	box4.className="box2 error";
		    			        tip4.className="tip error";
		    			        span4.innerHTML="验证码错误";
		    			
                     }
                 }else{
                   return false;
                 }
            }else{
                box.className="box2 error";
	    		      tip.className="tip error";
	    		      span.innerHTML="请接受服务条款";
	    		      return false;
            }

        }

     })
   })
})