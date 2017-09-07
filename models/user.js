var mongodb = require('./db');
var User={
	/**
	 * @param {Object} info
	 * @param {Object} callback
	 * 用户注册
	 */
	"register":function(info,callback){
		
	  	//打开数据库
		mongodb.open(function (err, db) {
		    if (err) {
		      return callback(err);//错误，返回 err 信息
		    }
		    //读取 users 集合
		    db.collection('adminUser', function (err, collection) {
	      		if (err) {
	        		mongodb.close();
	        		return callback(err);//错误，返回 err 信息
	      		}
		      	//将用户数据插入 users 集合
	  			collection.insert(info,{afe: true},function(err, user){
		        	mongodb.close();
			        if (err) {
			          return callback(err);//错误，返回 err 信息
			        }
		        	callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
	      		});
		    });
	  	});
		
	},
	/**
	 * 用户登录
	 */
	"login":function(info,callback){
		
	},
	/**
	 * @param {Object} name
	 * @param {Object} callback
	 * 管理员用户登录
	 */
	"getAdminUser":function(name, callback){
		
	  	//打开数据库
		mongodb.open(function (err, db) {
		    if (err) {
		      return callback(err);//错误，返回 err 信息
		    }
		    //读取 users 集合
		    db.collection('adminUser', function (err, collection) {
			  	if (err) {
					mongodb.close();
			        return callback(err);//错误，返回 err 信息
			  	}
		      	//查找用户名（name键）值为 name 一个文档
		      	collection.findOne({
			        name: name
		      	}, function (err, user) {
		        	mongodb.close();
			        if (err) {
			          return callback(err);//失败！返回 err 信息
			        }
			        callback(null, user);//成功！返回查询的用户信息
		      	});
		    });
	  	});
		
	}
	
}
//导出用户模块
module.exports = User;