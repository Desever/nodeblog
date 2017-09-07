//引入user数据库模块
var articleType=require('../models/addcolumn.js');//文章分类模块
var indexContent = require('../models/article.js');//文章内容模块
var crypto = require('crypto');
module.exports = function(app) {
	/**
	 * 进入首页
	 */
	app.get('/', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
    	res.render('index', {
    		title: '首页',
    		resNmae:'index',
    		layer:false,
    		kindeditor:false,
    		sidebar:"index"
    	});
	});
	/**
	 * 添加文章分类
	 */
	app.get('/addcolumn', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
    	res.render('addcolumn.ejs', {
    		title: '添加分类',
    		resNmae:'addcolumn',
    		layer:true,
    		kindeditor:false,
    		sidebar:"addcolumn"
    	});
	});
	/**
	 * 提交内容
	 * 添加文章
	 */
	app.post('/addcolumn', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}else{
			//md5加密
			//生成文章唯一id
			var md5 = crypto.createHash('md5'),
			isId = md5.update(articleType.returnId(req.session.user.name,req.body.title)).digest('hex');
			//拼接数据
			var insertInfo={
				addcolumn:isId,
				name:req.body.title
			}
			/**
			 * 插入数据
			 */
			articleType.insertArticle(insertInfo,function(err, result){
				if(result){
					res.send({
						"data":1,
						"message":"添加成功"
					});
				}else{
					res.send({
						"data":2,
						"message":"添加失败，请重试，或者联系超级管理员！"
					});
				}
			});
		}

	});
	/**
	 * 进入内容添加页面
	 */
	app.get('/add', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
		
	   	articleType.getArticle(function(err,result){
		   	
	    	res.render('addarticle', {
	    		title: '添加文章',
	    		resNmae:'article',
	    		layer:true,
	    		list:result,
	    		kindeditor:true,
	    		sidebar:"add"
	    	});
	    	
    	});

	});
	/**
	 * 提交内容
	 * 添加文章
	 */
	app.post('/add', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
		//md5加密
		//生成文章唯一id
		var md5 = crypto.createHash('md5'),
		isId = md5.update(indexContent.returnId(req.session.user.name,req.body.title)).digest('hex');
		//拼接数据
		var insertInfo={
			artid:isId,
			title:req.body.title,
			arictype:req.body.artictype,
			content:req.body.content,
			userName:req.session.user.name,
			timer:indexContent.returnTimer(),
			examine:"0"
		}
		/**
		 * 插入数据
		 */
		indexContent.insertArticle(insertInfo,function(err, result){
			if(result){
				res.send({
					"data":1,
					"message":"添加成功"
				});
			}else{
				res.send({
					"data":2,
					"message":"添加失败，请重试，或者联系超级管理员！"
				});
			}
		});
	});
	/**
	 * 文章管理页面
	 * 显示文章列表
	 */
	app.get('/articleman', function (req, res) {
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
	/**
	 * 文章管理页面
	 * 审核文章
	 */
	app.post('/articleman/exam', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
		var changeInfo={
			"examine":1
		}
    	indexContent.updateArticle(req.body.articId,changeInfo,function(err,result){
			if(result){
				res.send({
					"data":1
				});
			}else{
				res.send({
					"data":2
				});
			}
    	});
	});
	/**
	 * 文章管理页面
	 * 删除文章
	 */
	app.post('/articleman/delete', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
		var changeInfo={
			"examine":1
		}
    	indexContent.deleteArticle(req.body.articId,function(err,result){
			if(result){
				res.send({
					"data":1
				});
			}else{
				res.send({
					"data":2
				});
			}
    	});
	});
	/**
	 * 获取修改文章
	 * 进入修改文章页面
	 */
	app.get('/cgarticle', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
    	indexContent.getArticle(function(err,result){
	 	 	res.render('changearticle', {
	    		title: '修改文章',
	    		resNmae:'article',
	    		layer:true,
	    		kindeditor:true,
	    		list:result,
	    		sidebar:"cgarticle",
	    		articId:req.query.id
	    	});
    	},req.query.id);
	});
	/**
	 * 提交文章修改内容
	 */
	app.post('/cgarticle', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
		var changeInfo={
			title:req.body.title,
			content:req.body.content,
			userName:req.session.user.name,
			timer:indexContent.returnTimer(),
		}
    	indexContent.updateArticle(req.body.articId,changeInfo,function(err,result){
			if(result){
				res.send({
					"data":1,
					"message":"修改成功"
				});
			}else{
				res.send({
					"data":2,
					"message":"修改失败，请重试，或者联系超级管理员！"
				});
			}
    	});
    	
	});
	/**
	 * 文章管理页面
	 * 显示文章内容
	 */
	app.get('/articinfo', function (req, res) {
		//判断是否登录成功
		if(!req.session.user){
			res.redirect('/login');
		}
    	indexContent.getArticle(function(err,result){
	 	 	res.render('articinfo', {
	    		title: '文章内容',
	    		resNmae:'article',
	    		layer:false,
	    		kindeditor:false,
	    		content:result,
	    		sidebar:"articleman"
	    	});
    	},req.query.id);
	});
	
	
};
