$(function() {
	$("header").load("header.html");
	$("aside").load("footer.html");

	var token = localStorage.getItem("token") //获取token

	$.get("http://47.104.244.134:8080/cartlist.do", {
		token: token
	}, function(data) {
		console.log(data)
		var uid = localStorage.getItem("token"); //获取token
		var str = "";
		for(var i = 0; i < data.length; i++) {
			var data1 = data[i];
			str += `<li data-id="${data1.id}" gid="${data1.gid}">
		<input class="chx" type="checkbox" checked="checked">
		<img src ="${data1.goods.picurl}">
		<span>${data1.goods.name}</span>
		<span>&#165;<i class="dj">${data1.goods.price}</i></span>
		<span class= "down">-</span>
		<input class="num" type="text"value="${data1.count}">
		<span class= "up">+</span>
		<span><b>&#165;</b>  <i class ="zongjia" perpri=${data1.goods.price}>${data1.count*data1.goods.price}</i></span>
		<input class="del" type=button value="删除">
		</li>`

		}
		//console.log(str)
		$("#item").html(str)
		function total(){
			var sum=0;
			for (var i=0;i<$("#item li").length;i++) {
				var a=parseInt($("#item li").eq(i).find("span").find(".zongjia").html())
				 sum+=a;
			}
			$("#monkey").html("总价：￥"+sum)
		}
		total();//页面加载时，直接执行总价函数；
		//减号按钮
		$("#item li").find(".down").click(function() {
			var a = $(this).next(".num").val();
			var id = $(this).parent().attr('data-id'); //获取购物车内的商品id
			var gid = $(this).parent().attr('gid'); //获取商品本身的id
			a--;
			if(a <= 0) {
				$.get("http://47.104.244.134:8080/cartupdate.do", {
					id: id,
					gid: gid,
					num: 0,
					token: uid
				}, function(data) {
					console.log($(this))
				})
				$(this).parent().remove();
			} else {
				$(this).next(".num").val(a)
				$.get("http://47.104.244.134:8080/cartupdate.do", {
					id: id,
					gid: gid,
					num: -1,
					token: uid
				}, function(data) {
					console.log(data)
				})
				var num = $(this).next(".num").val();
				var perPri = $(this).prev("span").find(".dj").text();
				$(this).nextAll("span").find(".zongjia").html(num * perPri)
				total();
			}

		})
		//加号按钮
		$("#item li").find(".up").click(function() {
			//console.log($(this).prev(".num"))
			var a = $(this).prev(".num").val();
			var id = $(this).parent().attr('data-id'); //获取购物车内的商品id
			var gid = $(this).parent().attr('gid'); //获取商品本身的id
			a++;
			$(this).prev(".num").val(a);
			$.get("http://47.104.244.134:8080/cartupdate.do", {
				id: id,
				gid: gid,
				num: 1,
				token: uid
			}, function(data) {
				console.log(data)
			})
			var num = $(this).prev(".num").val();
			var perPri = $(this).next().children('.zongjia').attr('perpri');
			$(this).next().children('.zongjia').html(num * perPri);
			total();
		})
		//删除按钮
		$("#item li").find(".del").click(function() {
			var id = $(this).parent().attr('data-id'); //获取购物车内的商品id
			var gid = $(this).parent().attr('gid'); //获取商品本身的id
			$.get("http://47.104.244.134:8080/cartupdate.do", {
				id: id,
				gid: gid,
				num: 0,
				token: uid
			}, function(data) {
				console.log(data)
			})
			$(this).parent().remove();
			total();
		})

	})
})
