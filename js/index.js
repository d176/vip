window.onload=function(){
	//回到顶部
	$(function(){
		$("#top").click(function(){
			$("body,html").animate({scrollTop:"0px"},200);
		})
		
	//顶部悬浮
		$(window).scroll(function(){
			var _top = $(window).scrollTop();
			if(_top>250){
				$('#nav_submenu').css({"position":"fixed","top":0,"left":0,"z-index":999})
			}else{
				$("#nav_submenu").removeAttr('style')
			}
		})
		//轮播
			var num = 0;
			var timer =null
			function move(){
					num++;
					console.log($('.banner-z ul').find("li").length)
					num = num >= $('.banner-z ul').find("li").length ? 0 : num
					num = num <= -1 ? 1 : num
					$('.banner-z ul').find("li").eq(num).stop().fadeIn().siblings().stop().fadeOut()

				}
			
				move();
				timer = setInterval(move,2000);
				
				$("#iremwen").find("p").each(function(){
					$(this).mouseenter(function(){
							var index = $(this).index()
							clearInterval(timer)
							$('#bannerimg').find("li").eq(index).stop().fadeIn().siblings().stop().fadeOut()
							console.log(index)
								$("#tiao").stop().animate({'left':354+index*232+"px"})
							})
						$(this).mouseleave(function(){
							timer = setInterval(function(){
								move();
							},2000);
							})
					})
				$(".noe").mouseenter(function(){
					clearInterval(timer)
					$(this).find("span").eq(0).stop().animate({"left":0}).end().eq(0).click(function(){
						move();
					})
					$(this).find("span").eq(1).stop().animate({"right":0}).end().eq(1).click(function(){
						move();
					})
				})
				$(".noe").mouseleave(function(){
					$(this).find("span").eq(0).stop().animate({"left":"-33px"})
					$(this).find("span").eq(1).stop().animate({"right":"-33px"})
					timer = setInterval(function(){move();},2000);
				})
				$("#seranns").focus(function(e){
					e.stopPropagation()
					$.ajax({
						type:"get",
						url:"https://category.vip.com/ajax/getSuggestHotKeywords.php?callback=?&count=10&_=1561085835004",
						async:true,
						dataType:"jsonp",
						success:function(data){
							var data = data.data;
							var str ="<h3>精选推荐</h3>";
							$.each(data, function(sum) {
								str+=`<li>${data[sum].key}</li> `
							});
							$(".tuijian").html(str)
						}
					})
					$(".serach-log").show();
				})
				$("body,html").mousedown(function(e){
					e.stopPropagation()
					$("#serttt").hide();
					$(".serach-log").hide();
				})
				
			$.get("http://47.104.244.134:8080/goodstypelist.do",{l:1},function(data){
				var str = "";
				$.each(data, function(sum) {
					str+=`<li data-id="${data[sum].id}" id ="${sum}"><a href="liebiao.html">${data[sum].name}</a></li>`
				});
				$("#navnanbar").html(str);
				var sb = $("#navnav_menu").html()
				$("#menuitem").find("li").mouseenter(function(){
						var sl = $(this).attr("data-id")
						var ss = $(this).attr("id")
						console.log(sb);
						if(sl == undefined){
							$("#item123").html(sb)
							return
						}
						$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2},function(dada){
							var strt ="<dl><dt><div><span>"+data[ss].name+"</span><i>></i></div></dt><dd>"
							$.each(dada,function(num){
								if(sl == dada[num].parentid){
									strt +=` <a href="#">${dada[num].name}</a>`
								}
							})
							strt+="</dd></dl>"
							$("#item123").html(strt);
						})
						$("#navnav_menu").show();
				})
			})
		//二级菜单显示
		$("#menuitem").mousemove(function(e){
			e.stopPropagation();
			$(this).find("ul").slideDown();
				})
			$("#menuitem").find("li").mousemove(function(e){
				e.stopPropagation();      
				$("#navnav_menu").show();
			})
			$("#navnav_menu").mousemove(function(e){
				e.stopPropagation();
				$("#menuitem").find("ul").show();
				$(this).show()
			})
			$("body,html").mousemove(function(){
				$("#menuitem").find("ul").slideUp();
				$("#navnav_menu").hide()
			})
			
			//楼梯效果
			var flag = true
			$(window).scroll(function(){
				if(flag){
				if($(this).scrollTop()>950){
					$('#louti').fadeIn()
				}else{
					$('#louti').fadeOut()
				}
				$('.new_pin').each(function(){
					if($(window).scrollTop()>= $(this).offset().top-$(this).outerHeight()/2){
						var index = $(this).index();
						$('#louti li').eq(index).addClass('hover').siblings().removeClass('hover')
					}
				})
			}
		})
			$('#louti li:not(:last)').click(function(){
				flag = false
				var sr = 150;
				var index = $(this).index();
				$('body,html').animate({"scrollTop":$('.new_pin').eq(index).offset().top-sr},200,function(){
					flag = true
				})
			})
			//计时器
			itemtiem();
			function itemtiem(){
				var time = new Date;
				var wl = new Date("2019-7-1 9:00:00")
				var sum = wl -time;
				var sss = "";
				sum = sum/1000
					var xs =Math.floor(sum/60/60%24)
					var fz =Math.floor(sum/60%60)
					var mz =Math.floor(sum%60)
						xs=xs<10?"0"+xs:xs
						fz=fz<10?"0"+fz:fz
						mz=mz<10?"0"+mz:mz
					sss+=` <span>${xs}</span>
					<span class="fen">${fz}</span>
					<span class="miao">${mz}</span>`
					$(".timerr").html(sss)
			}
			setInterval(itemtiem,1000)
	})
}
