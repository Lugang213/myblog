// 管理员  的控制器
var adminController = {};
// 引入 栏目 数据库模型
var itemModel = require('../models/itemModel.js');
// 引入 文章 数据库模型
var articleModel = require('../models/articleModel.js');
// 引入 文章 数据库模型
var adminModel = require('../models/adminModel.js');
// 引入有请链接数据库模型
var linkModel = require('../models/linkModel.js');
// 管理员的首页
adminController.index = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 响应模版
    res.render('admin/index');
}

// 添加栏目 页面
adminController.itemAdd =  function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 响应模版
    res.render('admin/itemAdd');
}

// 插入栏目数据
adminController.itemInsert = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 插入数据库
	itemModel.create(req.body,function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'插入数据失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/itemList');
		}
	})
}

// 栏目列表
adminController.itemList = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/itemList',{items:data});			
		}		
	});	
}

// 删除栏目
adminController.itemRemove = function(req,res){
	// 删除数据
	itemModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/itemList');
		}
	})
}

// 编辑栏目的页面
adminController.itemEdit = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 查询数据
	itemModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/itemEdit',{item:data});			
		}	
	})	
}

// 更新栏目数据
adminController.itemUpdate = function(req,res){
	// 更新数据
	itemModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据更新失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/itemList');
		}
	})
}



// 发布文章
adminController.articleAdd = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/articleAdd',{items:data});			
		}		
	});	

}

// 插入文章的数据
adminController.articleInsert = function(req,res){
	// 接收图片
	// 允许接收图片的类型
	var imgType = ['image/jpeg','image/png','image/gif'];
	// 文件的大小
	var fileSize = 1024 * 1024 * 5;
	// 文件保存的路径
	var imgPath = 'uploads';
	// 引入 图片上传 配置的模块
	var imgUpload = require('../configs/uploadImage_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	// 图片上传
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// 把图片的信息添加到 req.body 里
			req.body.imgurl = req.file.filename;
			// 添加数据到文章集合里
			articleModel.create(req.body,function(err){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'文章数据添加失败'});
				}else{
					// 响应模版 分配数据
				    // res.render('admin/articleAdd',{items:data});		
					// 跳转到 栏目列表页
					res.redirect('/admin/articleAdd');				    	
				}
			});
		}
	})
}

// 文章列表
adminController.articleList = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 当前是第几页
	var page = req.query.page?req.query.page:1;
	// 每页显示多少条数据
	var pageSize = 5;
	// 一共有多少条数据
	articleModel.find({}).count(function(err,total){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});			
		}else{
			// 一共多少页 ?
			var maxPage =  Math.ceil(total/pageSize);
			// 判断上一页的边界
			if(page<1) page = 1;
			// 判断下一页的边界
			if(page>maxPage) page = maxPage;
			// 偏移量
			var offsetPage = pageSize*(page-1);
			// 查询数据            //	分页查询					关联查询
			articleModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					console.log(data)
					// 响应模版 分配数据
			    	res.render('admin/articleList',{articles:data,maxPage:maxPage,page:page});	
				}
			})
		}
	})
}

// 编辑文章的页面
adminController.articleEdit = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 查询所有的栏目数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 查询当前需要编辑的文章的数据
			articleModel.findOne({_id:req.params._id},function(err,data1){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					// 响应模版 分配数据
				    res.render('admin/articleEdit',{items:data,data:data1});			
				}	
			})
		}		
	});	
}

// 更新文章封面
adminController.articleImageUpdate = function(req,res){
	// 允许接收图片的类型
	var imgType = ['image/jpeg','image/png','image/gif'];
	// 文件的大小
	var fileSize = 1024 * 1024 * 5;
	// 文件保存的路径
	var imgPath = 'uploads';
	// 引入 图片上传 配置的模块
	var imgUpload = require('../configs/uploadImage_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	// 图片上传
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// console.log(req.body);
			// 添加数据到文章集合里
			articleModel.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(err){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'文章封面修改失败'});
				}else{
					// 跳转到文章列表
					res.redirect('/admin/articleList');
				}
			});
		}
	})
}

// 更新文章内容
adminController.articleTextUpdate = function(req,res){
	// 添加数据到文章集合里
	articleModel.update({_id:req.body._id},{$set:req.body},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'文章封面修改失败'});
		}else{
			// 跳转到文章列表
			res.redirect('/admin/articleList');
		}
	});
}


// 删除文章
adminController.articleRemove = function(req,res){
	// 删除数据
	articleModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 文章列表页
			res.redirect('/admin/articleList');
		}
	})
}


// 添加管理员页面
adminController.adminAdd = function(req,res){
	//判断用户有没有登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 响应模版 分配数据
	res.render('admin/adminAdd');
}

// 验证码
adminController.code = function(req,res){
	// 引入验证码模块
	var captchapng = require('captchapng');
	// 生成验证码数字
	var code = parseInt(Math.random()*9000+1000);
	// 把验证的数据储存 在 session 里
	req.session.code = code;
	// 生成验证码
    var p = new captchapng(80,20,code); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.send(imgbase64);
}

// 添加管理员数据
adminController.adminInsert = function(req,res){
	console.log(req.body.code)
	// 引入md5加密模块
	var md5 = require('md5');

	// 判断验证码
	/*if(req.body.code != req.session.code){
		res.send('验证码不正确');
		return;
	}*/
 
	// 判断两次密码是否一致
	if(req.body.password != req.body.repassword){
		res.send('两次密码不一致');
	}

	// 去掉用户名 和密码的两端空白字符
	req.body.name = req.body.name.trim();
	// 给用户的密码进行加密
	req.body.password = md5(req.body.password.trim());

	// 把数据添加到数据库
	adminModel.create(req.body,function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'添加管理员失败'});
		}else{
			// 跳转到 用户列表页
			// res.render('admin/adminList');
			res.render('admin/error',{errText:'添加管理员成功'});
		}
	});
}

// 用户列表
adminController.adminList = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 查询数据
	adminModel.find(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/adminList',{admins:data});			
		}		
	});	
}

// 删除用户
adminController.adminRemove = function(req,res){
	// 删除数据
	adminModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 用户列表页
			res.redirect('/admin/adminList');
		}
	})
}

// 编辑用户的页面
adminController.adminEdit = function(req,res){
	// 查询数据
	adminModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/adminEdit',{admins:data});			
		}	
	})	
}

// 更新用户数据
adminController.adminUpdate = function(req,res){
	// 更新数据
	adminModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据更新失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/adminList');
		}
	})
}

// 验证码
adminController.code = function(req,res){
	// 引入验证码模块
	var captchapng = require('captchapng');
	// 生成验证码数字
	var code = parseInt(Math.random()*9000+1000);
	// 把验证的数据储存 在 session 里
	req.session.code = code;
	// 生成验证码
    var p = new captchapng(80,20,code); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.send(imgbase64);
}


// 登录的页面
adminController.login = function(req,res){
	// 响应 模版
	res.render('admin/login',{error:null});
}

// 登录的操作
adminController.doLogin = function(req,res){

	// 引入 md5 加密模块
	var md5 = require('md5');
 
	// 去掉用户名 和密码的两端空白字符
	var name = req.body.name.trim();
	// 给用户的密码进行加密
	var password = md5(req.body.password.trim());

	// 带着用户名 做为条件 去查询 admin 的集合
	adminModel.findOne({name:name},function(err,data){
		if(data==null){
			// 用户不存在
			res.render('admin/login',{error:'用户名或密码不正确'});
		}else{
			if(password==data.password){
				// 登录成功
				// 把用户的信息 储存到 session 里
				req.session.user = data;
				// 跳转到 栏目列表页
				res.redirect('/admin');			
			}else{
				// 密码不正确
				res.render('admin/login',{error:'用户名或密码不正确'});
			}			
		}
	})
}

// 退出登录
adminController.logOut = function(req,res){
	// 把 登录时 添加的用户信息 赋值 null
	req.session.user = null;
	// 跳转到登录页面
	res.redirect('/admin/login');
}


// 链接管理 
// 添加链接
adminController.linkAdd =  function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 响应模版
    res.render('admin/linkAdd');
}

// 插入链接数据
adminController.linkInsert = function(req,res){
	// 插入数据库
	linkModel.create(req.body,function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'插入数据失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/linkList');
		}
	})
}

// 链接列表
adminController.linkList = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 查询数据
	linkModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/linkList',{links:data});			
		}		
	});	
}

// 删除链接
adminController.linkRemove = function(req,res){
	// 删除数据
	linkModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/linkList');
		}
	})
}

// 编辑链接的页面
adminController.linkEdit = function(req,res){
	//判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	// 查询数据
	linkModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模版 分配数据
		    res.render('admin/linkEdit',{link:data});			
		}	
	})	
}

// 更新栏目数据
adminController.linkUpdate = function(req,res){
	// 更新数据
	linkModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据更新失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/linkList');
		}
	})
}


// 暴露 控制
module.exports = adminController;