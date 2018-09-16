// 管理员  的控制器
var indexController = {};
// 引入 栏目 数据库模型
var itemModel = require('../models/itemModel.js');
// 引入 文章 数据库模型
var articleModel = require('../models/articleModel.js');
// 引入友情链接数据库模板
var linkModel = require('../models/linkModel.js');

// 首页
indexController.index = function(req, res, next) {
	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			getItemArticles(0)
			function getItemArticles(i){
				// 取栏目对应的 文章
				articleModel.find({itemId:data[i]._id}).limit(5).exec(function(err,articles){
					// 把查到的栏目文章的列表放到 data 里
					data[i].articlelist = articles;
					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						linkModel.find({}).sort({order:1}).exec(function(er,data1){
							if(err){
								// 响应 报错模版
								res.render('admin/error',{errText:'数据查询失败'});
							}else{

								// 响应模版 分配数据
							   	res.render('index',{links:data1,items:data});  				
							}

						});			
					}
				})
			}
		}		
	});
}

// 列表页
indexController.life = function(req,res){
	// console.log(req.query.page);
	var router =req.query.router;
	console.log(router);
	var page = req.query.page?req.query.page:1;

	// 每页显示的条数
	var pageSize = 5;
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log(err)
		}else{
			getarticles(0);
			function getarticles(i){
				articleModel.find({itemId:data[i]._id}).populate('itemId',{name:1}).count(function(err,total){
				// console.log(total);
				// 一共多少页 ?
					var maxPage =  Math.ceil(total/pageSize);
					// 判断上一页的边界
					if(page<1) page = 1;
					// 判断下一页的边界
					if(page>maxPage) page = maxPage;
					// 偏移量
					var offsetPage = pageSize*(page-1);

					articleModel.find({itemId:data[i]._id}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data1){
						// console.log(data1);
							linkModel.find({}).sort({order:1}).exec(function(err,link){
								// res.redirect('list');
								// res.send('ok');
								res.render('list',{items:data,article:data1,links:link,page:page,maxPage:maxPage,router:router})

							})
						
					})
				})
				
			}
			
		}
	})
}

// jishu
indexController.jishu = function(req,res){
	// console.log(req.query.page);
	var router =req.query.router;
	console.log(router);
	var page = req.query.page?req.query.page:1;

	// 每页显示的条数
	var pageSize = 5;
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log(err)
		}else{
			getarticles(1);
			function getarticles(i){
				articleModel.find({itemId:data[i]._id}).populate('itemId',{name:1}).count(function(err,total){
				// console.log(total);
				// 一共多少页 ?
					var maxPage =  Math.ceil(total/pageSize);
					// 判断上一页的边界
					if(page<1) page = 1;
					// 判断下一页的边界
					if(page>maxPage) page = maxPage;
					// 偏移量
					var offsetPage = pageSize*(page-1);

					articleModel.find({itemId:data[i]._id}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data1){
						// console.log(data1);
							linkModel.find({}).sort({order:1}).exec(function(err,link){
								// res.redirect('list');
								// res.send('ok');
								res.render('list',{items:data,article:data1,links:link,page:page,maxPage:maxPage,router:router})

							})
						
					})
				})
				
			}
			
		}
	})
}

// note
indexController.note = function(req,res){
	// console.log(req.query.page);
	var router =req.query.router;
	console.log(router);
	var page = req.query.page?req.query.page:1;

	// 每页显示的条数
	var pageSize = 5;
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			console.log(err)
		}else{
			getarticles(2);
			function getarticles(i){
				articleModel.find({itemId:data[i]._id}).populate('itemId',{name:1}).count(function(err,total){
				// console.log(total);
				// 一共多少页 ?
					var maxPage =  Math.ceil(total/pageSize);
					// 判断上一页的边界
					if(page<1) page = 1;
					// 判断下一页的边界
					if(page>maxPage) page = maxPage;
					// 偏移量
					var offsetPage = pageSize*(page-1);

					articleModel.find({itemId:data[i]._id}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data1){
						// console.log(data1);
							linkModel.find({}).sort({order:1}).exec(function(err,link){
								// res.redirect('list');
								// res.send('ok');
								res.render('list',{items:data,article:data1,links:link,page:page,maxPage:maxPage,router:router})

							})
						
					})
				})
				
			}
			
		}
	})
}
// about
indexController.about = function(req, res, next) {
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		// console.log(itemModel)
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			linkModel.find({}).sort({order:1}).exec(function(err,data1){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
			 		// res.render('about',{items:data,links:data1});
			 	}
			})	
	 	}
	})	
}


// 内容页
indexController.content = function(req, res, next) {
	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		// console.log(itemModel)
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			linkModel.find({}).sort({order:1}).exec(function(err,data2){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					articleModel.findOne({_id:req.params._id}).exec(function(err,data1){
						res.render('content',{items:data,articles:data1,links:data2});		
					})
				}
			})
		}		
	});
}

// 留言
indexController.message = function(req, res, next) {
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		// console.log(itemModel)
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			linkModel.find({}).sort({order:1}).exec(function(err,data1){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
	 				res.render('message',{items:data,links:data1});
	 			}
	 		})
	 	}
	})	
}

// 首页阅读全文
indexController.read = function(req, res, next) {
	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		// console.log(itemModel)
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			linkModel.find({}).sort({order:1}).exec(function(err,data1){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					articleModel.findOne({_id:req.params._id}).exec(function(err,data2){
						res.render('content',{items:data,links:data1,articles:data2});		
					})
				}
			})
		}		
	});
}
	


// 暴露 控制
module.exports = indexController;

