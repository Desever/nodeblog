//引入user数据库模块
var indexContent = require('../models/article.js');//文章内容模块
var crypto = require('crypto');
module.exports = function(app) {
	/**
	 * 文章管理页面
	 * 显示文章列表
	 */
	app.post('/articleman', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
    	indexContent.getArticle(function(err,result){
    		
	 	 	res.render('articleman', {
	    		title: '文章管理',
	    		resNmae:'article',
	    		layer:true,
	    		kindeditor:false,
	    		list:result,
	    		sidebar:"articleman"
	    	});
    	});
	});
	
};
