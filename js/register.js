window.onload = function() {

	var oSpan = document.querySelectorAll("span");
	var box1 = document.getElementById("box1");
	var box2 = document.getElementById("box2");
	var box_a = document.getElementById("box-a")
	var box_b = document.getElementById("box-b")
	for(var i = 0; i < oSpan.length; i++) {
		oSpan[0].onclick = function() {
			box1.style.display = "block";
			box2.style.display = "none";
		}
		oSpan[1].onclick = function() {
			box1.style.display = "none";
			box2.style.display = "block";
		}
	}

	var ipt1 = document.getElementById("ipt1")
	ipt1.onblur = function() {
		if(ipt1.value == "") {
			box_a.style.opacity = "1"
		} else {
			box_a.style.opacity = "0"
		}
	}

	var ipt2 = document.getElementById("ipt2")
	$("#btn").click(function() {
		var usr = $(ipt1).val();
		var pwd = $(ipt2).val();
		console.log(pwd)
		if(usr===''|| pwd===""){
			alert("请输入信息")
		}else{
			$.post("http://47.104.244.134:8080/userlogin.do", {			
				name: usr,
				password: pwd
			}).done(data=>{
				console.log(data)
				if(data.code == 1) {
					alert("用户名或密码错误，请重新输入")
				} else {
					window.location.href = "index.html"
					localStorage.setItem("token",data.data.token)
				}
				
			})
		}
		
	})
}