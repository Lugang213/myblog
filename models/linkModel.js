//引入数据库配置模块
var mongoose = require('../configs/db_config.js');
// 定义链接集合骨架
var linkSchema = new mongoose.Schema({
	name : String,  // 栏目名称
	url : String,	// 栏目简介
	ctime: {		//  创建时间
		type: Date,	
		default: new Date()
	},
	order: Number	// 排序
});

// 创建栏目数据模型
var linkModel = mongoose.model('link',linkSchema);

module.exports = linkModel;