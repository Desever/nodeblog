var mongodb = require('./db');
var indexContent={
	
	//存储文章
	"insertArticle":function(info,callback){
		mongodb.open(function (err, db) {
		    if (err) {
		      return callback(err);//错误，返回 err 信息
		    }
		    db.collection('article', function (err, collection) {
	      		if (err) {
	        		mongodb.close();
	        		return callback(err);//错误，返回 err 信息
	      		}
	  			collection.insert(info,{afe: true},function(err, message){
		        	mongodb.close();
			        if (err) {
			          return callback(err);//错误，返回 err 信息
			        }
		        	callback(null, message);//成功！返回查询的用户信息
	      		});
		    });
	  	});
		
	},
	//返回服务器时间
	"returnTimer":function(){
		
	 	var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	},
	//生成文章id
	"returnId":function(user,name){
		return user+name+this.returnTimer()
	},
	/**
	 * 获取文章
	 */
	"getArticle":function(callback,id){
	  	//打开数据库
		mongodb.open(function (err, db) {
		    if (err) {
		      return callback(err);//错误，返回 err 信息
		    }
		    db.collection('article', function (err, collection) {
			  	if (err) {
					mongodb.close();
			        return callback(err);//错误，返回 err 信息
			  	}
			  	//判断是否增加查询条件
			  	if(id){
			  		var condition={
				  		"artid":id
				  	}
			  	}else{
			  		var condition={}
			  	}
			  	//find查找集合
			  	//转化数组
		      	collection.find(condition).toArray(function (err, list) {
		        	mongodb.close();
			        if (err) {
			          return callback(err);//失败！返回 err 信息
			        }
			        callback(null, list);//成功！返回查询的用户信息
		      	});
		    });
		});
	},
	//修改文章
	"updateArticle":function(id,info,callback){
		mongodb.open(function (err, db) {
		    if (err) {
		      return callback(err);//错误，返回 err 信息
		    }
		    db.collection('article', function (err, collection) {
	      		if (err) {
	        		mongodb.close();
	        		return callback(err);//错误，返回 err 信息
	      		}
	  			collection.update({
	  				artid:id
	  			},{$set:info},function(err, message){
		        	mongodb.close();
			        if (err) {
			          return callback(err);//错误，返回 err 信息
			        }
		        	callback(null, message);//成功！返回查询的用户信息
	      		});
		    });
	  	});
	},
	//删除文章
	"deleteArticle":function(id,callback){
		mongodb.open(function (err, db) {
		    if (err) {
		      return callback(err);//错误，返回 err 信息
		    }
		    db.collection('article', function (err, collection) {
	      		if (err) {
	        		mongodb.close();
	        		return callback(err);//错误，返回 err 信息
	      		}
	  			collection.remove({
	  				artid:id
	  			},function(err, message){
		        	mongodb.close();
			        if (err) {
			          return callback(err);//错误，返回 err 信息
			        }
		        	callback(null, message);//成功！返回查询的用户信息
	      		});
		    });
	  	});
	}
}


module.exports = indexContent;