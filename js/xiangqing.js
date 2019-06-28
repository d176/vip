$(function() {
	$("header").load("header.html");
	$("aside").load("footer.html");

	var id = location.search.split("=")[1];
	console.log(id)
	$.get("http://47.104.244.134:8080/goodsbyid.do", {
		id: id
	}).done(data => {
		console.log(data)
		var str = "";

		str += `<div class="box-z">
				<div id="zoomBox">
					<div id="midArea">
						<img src="${data.picurl}">
						<div id="zoom"></div>
					</div>
					<div id="smallArea">
						<ul>
							<li><img src="${data.picurl}"></li>
						</ul>
					</div>
					<div id="bigArea">
						<img src="${data.picurl}">
					</div>
				</div>
				<div class="box-l">
					<h1>${data.name}</h1>
					<h2>￥${data.price}</h2>
					<p>
						<span class="jian">-</span><input type="text" value="1" class="num"><span class="jia">+</span>
					
							<input type="button" class="btn" value="加入购物车" id=${data.id}>
							<a href="gouwuche.html">
								<input type="button" class="btn1" value="进入购物车">
							</a>
					</p>
				</div>
			</div>`
		$(".box").html(str);

		$(".btn").click(function() {
			var id = $(this).attr("id")
			//		console.log(id)
			var uid = localStorage.getItem("token");
			var num = $(".num").val();//获取需要添加的商品的数量
			for(var i = 0; i < num; i++) {
				$.get("http://47.104.244.134:8080/cartsave.do", {
					gid: id,
					token: uid
				}, function(data) {
					console.log(data)
				})
			}
			alert("已经添加"+num+"件商品到购物车");
			
		})

		$(".jian").click(function() {
			var a = $(".num").val();
			a--;
			$(".num").val(a)
			if(a <= 1) {
				$(".num").val("1");
			}

		})
		$(".jia").click(function() {
			var a = $(".num").val();
			a++;
			console.log(a)
			$(".num").val(a)
		})
	})

})
window.onload = function() {

	function $(id) {
		return document.getElementById(id);
	}

	function Zoom() {
		this.midArea = $("midArea");
		this.midImg = this.midArea.children[0];
		this.zoom = $("zoom");
		this.bigArea = $("bigArea");
		this.bigImg = this.bigArea.children[0];
		this.smallArea = $("smallArea");
		this.smallImgs = this.smallArea.children[0].children;

		this.midArea.onmouseover = () => {
			this.zoom.style.display = "block";
			this.bigArea.style.display = "block";
		}
		this.midArea.onmouseout = () => {
			this.zoom.style.display = "none";
			this.bigArea.style.display = "none";
		}
		this.midArea.onmousemove = (e) => {
			var evt = e || event;
			var x = evt.pageX - this.zoom.offsetWidth - 35;
			var y = evt.pageY - this.zoom.offsetHeight - 125;

			var maxWid = this.midArea.offsetWidth - this.zoom.offsetWidth;
			var maxHei = this.midArea.offsetHeight - this.zoom.offsetHeight;

			x = x <= 0 ? 0 : x >= maxWid ? maxWid : x;
			y = y <= 0 ? 0 : y >= maxHei ? maxHei : y;

			this.zoom.style.left = x + "px";
			this.zoom.style.top = y + "px";

			this.bigImg.style.left = -x / this.midArea.offsetWidth * this.bigImg.offsetWidth + "px";
			this.bigImg.style.top = -y / this.midArea.offsetHeight * this.bigImg.offsetHeight + "px";

		}

		for(let i = 0; i < this.smallImgs.length; i++) {
			this.smallImgs[i].onclick = () => {
				this.midImg.src = this.smallImgs[i].children[0].src;
				this.bigImg.src = this.smallImgs[i].children[0].src;
			}
		}
	}

	var zoom = new Zoom();
}
