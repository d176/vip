let input = document.querySelectorAll("input")
let ipt1 = document.getElementById("ipt1");
let oP = document.querySelectorAll("p");
ipt1.onblur = function() {
	let r = ipt1.value;
	let t = /^[a-zA-Z0-9_]{4,16}$/;
	if(t.test(r)) {
		this.nextElementSibling.style.opacity = 0;

	} else {
		this.nextElementSibling.style.opacity = 1;
	}
	$.get("http://47.104.244.134:8080/username.do", {
		username: r
	}).done(data => {
		console.log(data);
		console.log(data.code)
			var code=data.code
			if(code==0){
				alert("用户名已被注册请重新输入用户名")
			}else{
				alert("用户名输入成功")
			}
		
	})
}

let ipt2 = document.getElementById("ipt2");
ipt2.onblur = function() {
	let r = ipt2.value;
	let t = /^\w+[-+.]*\w*@([a-z0-9A-Z\u2E80-\u9FFF]-?)+(\.\w{2,6})+/
	if(t.test(r)) {
		this.nextElementSibling.style.opacity = 0;

	} else {
		this.nextElementSibling.style.opacity = 1;
	}
	$.get("http://47.104.244.134:8080/useremail.do", {
		useremail: r
	}).done(data => {
		console.log(data);
	})
}
let ipt3 = document.getElementById("ipt3");
ipt3.onblur = function() {
	let r = ipt3.value;
	let t = /^[A-Za-z0-9_]{6,20}$/
	if(t.test(r)) {
		this.nextElementSibling.style.opacity = 0;

	} else {
		this.nextElementSibling.style.opacity = 1;
	}
}

let ipt4 = document.getElementById("ipt4")
ipt4.onblur = function() {
	let r = ipt4.value;
	let t = /^[A-Za-z0-9_]{6,20}$/
	if(ipt4.value === ipt3.value && t.test(r)) {
		this.nextElementSibling.style.opacity = 0;

	} else {
		this.nextElementSibling.style.opacity = 1;
	}
}

let btn = document.getElementById("btn")

btn.onclick = function() {
	$.post("http://47.104.244.134:8080/usersave.do", {
		username: input[0].value,
		password: input[2].value,
		email: input[1].value,
		sex: "女"
	}).done(data => {
		alert("注册成功")
		console.log(data);
		window.location.href = "register.html"
	})

}