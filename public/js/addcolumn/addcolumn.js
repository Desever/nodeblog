var add={
	
	"main":function(){
		this.addArticData();
		this.uploadObj();
	},
	/**
	 * 提交数据
	 * 添加文章
	 */
	"addArticData":function(){
		
		$("#z-addArticle-btn").click(function(){
			//获取数据
			var info={
				title:$("#z-articleTitle-val").val()
			}
	        $.ajax({
	         	type: "post",
	         	url: "/addcolumn",
	         	data:info,
	         	dataType: "json",
	         	success: function(res){
	         		if(res.data==1){
			         	layer.alert(res.message, {
						  skin: 'layui-layer-molv' //样式类名
						  ,closeBtn: 0
						}, function(){
							layer.closeAll();
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
	 * 文件上传
	 */
	"uploadObj":function(){
		var uploader = WebUploader.create({
		    // 文件接收服务端。
		    server: '../file/uploadfile',
		    // 选择文件的按钮。可选。
		    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
		    pick: $("#z-webuploadLoad-prog"),
		    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		    resize: false,
		    // 选完文件后，是否自动上传。 
		 	auto: true,
		});
		// 当有文件被添加进队列的时候
		uploader.on( 'fileQueued', function( file ) {
		
		});
		uploader.on( 'uploadSuccess', function(file,data) {
			
		});
		uploader.on( 'uploadError', function(file) {
		
		});
	}
};
(function(){
	add.main();
})();
