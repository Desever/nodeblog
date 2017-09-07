var add={
	
	"main":function(){
		this.kindeditor();
		this.addArticData();
		this.updataArticData();
	},
	/**
	 * 调用kindeditor
	 */
	"kindeditor":function(){
		
		KindEditor.ready(function(K) {
			K.create('textarea[name="z-articleContent-val"]', {
				autoHeightMode : true,
				afterBlur : function() {
					this.sync();
				}
			});
		});
		
	},
	/**
	 * 提交数据
	 * 添加文章
	 */
	"addArticData":function(){
		
		$("#z-addArticle-btn").click(function(){
			//获取数据
			var info={
				title:$("#z-articleTitle-val").val(),
				artictype:$("#z-articType-obj").val(),
				content:$('#z-articleContent-val').val(),
				
			}
	        $.ajax({
	         	type: "post",
	         	url: "/add",
	         	data:info,
	         	dataType: "json",
	         	success: function(res){
	         		if(res.data==1){
			         	layer.alert(res.message, {
						  skin: 'layui-layer-molv' //样式类名
						  ,closeBtn: 0
						}, function(){
							layer.closeAll();
							window.location.href="/add"
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
		
	},
	/**
	 * 提交数据
	 * 更新文章
	 */
	"updataArticData":function(){
		
		$("#z-updateArticle-btn").click(function(){
			//获取数据
			var info={
				title:$("#z-articleTitle-val").val(),
				content:$('#z-articleContent-val').val(),
				articId:$('#articeID').val()
			}
	        $.ajax({
	         	type: "post",
	         	url: "/cgarticle",
	         	data:info,
	         	dataType: "json",
	         	success: function(res){
	         		if(res.data==1){
			         	layer.alert(res.message, {
						  skin: 'layui-layer-molv' //样式类名
						  ,closeBtn: 0
						}, function(){
							layer.closeAll();
							window.location.href="/articleman"
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
};
(function(){
	add.main();
})();
/**
 * 审核文章
 * 询问
 */
function examineArticFun(id){
	
	layer.confirm('确定通过此文章的审核？', {
 		skin: 'layui-layer-molv',//样式类名
  		btn: ['审核','取消'] //按钮
	}, function(){
		
        $.ajax({
         	type: "post",
         	url: "/articleman/exam",
         	data:{articId:id},
         	dataType: "json",
         	success: function(res){
         		if(res.data==1){
		         	layer.msg('审核通过', {icon: 1,time:2000},function(){
		         		window.location.href="/articleman"
		         	});
         		}else{
		         	layer.msg('审核失败，请重试', {icon: 2,time:1000});
         		}
          	}
     	});
	}, function(){
		layer.closeAll();
	});
}
/**
 * 删除文章
 * 询问
 */
function deleteArticFun(id){
	
	layer.confirm('确定删除文章？', {
 		skin: 'layui-layer-molv',//样式类名
  		btn: ['删除','取消'] //按钮
	}, function(){
		
        $.ajax({
         	type: "post",
         	url: "/articleman/delete",
         	data:{articId:id},
         	dataType: "json",
         	success: function(res){
         		if(res.data==1){
		         	layer.msg('删除成功', {icon: 1,time:2000},function(){
		         		window.location.href="/articleman"
		         	});
         		}else{
		         	layer.msg('删除失败，请重试', {icon: 2,time:1000});
         		}
          	}
     	});
	}, function(){
		layer.closeAll();
	});
}
