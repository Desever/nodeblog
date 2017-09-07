//引入user数据库模块
var crypto = require('crypto');
var User = require('../models/user.js');
module.exports = function(app) {
	/**
	 * 页面展示
	 */
	app.get('/login', function (req, res) {
    	res.render('login', {
    		title:'登录',
    		resNmae:'login',
    		layer:true,
    		kindeditor:false
    	});
	});
	/**
	 * 用户登录
	 */
	app.post('/login', function (req, res) {
		var md5 = crypto.createHash('md5'),
      	passwordMd5 = md5.update(req.body.password).digest('hex');
		User.getAdminUser(req.body.name, function (err, user) {
			if (!user) {
				res.send({
					"data":2,
					"message":"用户名不存在"
				});
		    }else{
				if (user.password != passwordMd5) {
		      		res.send({
						"data":2,
						"message":"密码错误"
					});
			    }else{
			    	req.session.user = user;
			    	res.send({
						"data":1,
						"message":"登录成功"
					});
			    }
		    }
		});
	});
};
