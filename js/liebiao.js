

$(function(){
	$.get("http://47.104.244.134:8080/goodsbytid.do",{
		tid: 13,
		page: 1,
		limit: 13
	}).done(data=>{
		console.log(data)
		data=data.data;
		var str="";
		console.log(data[0].id)
		for(var i=0;i<data.length;i++){
			str+=`
					<div class="goods-inner">
						<a href="xiangqing.html?id=${data[i].id}">
							<img src="${ data[i].picurl}"/>
						</a> 
						<h3>￥${data[i].price}</h3>
						<p>${data[i].name}</p>
						<p>${data[i].info}</p>
					</div>
				`
			$(".box").html(str);
						
		}
		
	})
})
