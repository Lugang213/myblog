//引入数据库配置模块
var mongoose = require('../configs/db_config.js');
// 定义栏目集合骨架
var itemSchema = new mongoose.Schema({
	name : String,  // 栏目名称
	info : String,	// 栏目简介
	itemRouter : String, //栏目路由
	ctime: {		//  创建时间
		type: Date,	
		default: new Date()
	},
	order: Number	// 排序
});

// 创建栏目数据模型
var itemModel = mongoose.model('item',itemSchema);

module.exports = itemModel;