function ajaxLogin(){
	$(".z-btn-login").click(function(){
		//获取数据
		var info={
			name:$("#z-login-username").val(),
			password:$("#z-login-password").val()
		}
        $.ajax({
         	type: "post",
         	url: "/login",
         	data:info,
         	dataType: "json",
         	success: function(res){
         		if(res.data==1){
		         	layer.alert(res.message, {
					  skin: 'layui-layer-molv' //样式类名
					  ,closeBtn: 0
					}, function(){
						layer.closeAll();
						window.location.href="/"
					});
         		}else{
		         	layer.alert(res.message, {
					  skin: 'layui-layer-molv' //样式类名
					  ,closeBtn: 0
					}, function(){
						layer.closeAll();
					});
         		}
          	}
     	});
	});
}
(function(){
	//登录ajax
	ajaxLogin();
})()


