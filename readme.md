# blog管理系统

## 技术构成：
	html、css、js、H5、css3、jquery
	Bootstrap 框架  
	Node.js    Express 框架  
	mongoDB		mongoose

## 功能:
	前台：
		首页：栏目导航、排序
		列表页:分页
		内容页

	后台：
		登录/注册：验证码
		栏目：添加栏目、栏目列表、编辑、删除
		文章：发布文章、文章列表、上传图片、编辑、删除、分页
		友情链接：添加链接、链接列表、修改、删除


### 栏目集合 items
	属性 		类型				描述
	_id			ObjectId		一条数据的唯一标记
	name 		String			栏目名称
	info 		String			栏目简介
	ctime		Date			栏目创建时间
	order		Number			排序
	itemRouter  String          栏目路由

### 文章  articles
	属性 			类型				描述
	_id				ObjectId		一条数据的唯一标记
	itemId	 		ObjectId		所在栏目
	title 			String			标题
	author 			String			作者
	content 		String 			内容
	keywords		String			关键字
	description		String			描述
	imgurl			String 			封面路径
	ctime 			Date			栏目创建时间


### 管理员 admin
	属性 			类型				描述
	_id				ObjectId		一条数据的唯一标记
	name	 		String			账号
	password		String			密码
	info  			String          简介
	tel  			String          电话
	ctime 			Date			创建时间

### 友情链接 link
	属性 			类型				描述
	_id				ObjectId		一条数据的唯一标记
	name	 		String			链接名称
	url				String			链接地址
	order 			String          排序
	ctime 			Date			创建时间



## 项目目录结构

	-|bin/							启动项目录
	-|--|www 						启动文件
	-|configs/						配置文件目录
	-|--|db_config.js       		数据库的配置文件
	-|--|uploadImage_config.js      图片上传配置文件
	-|controllers/					控制器的目录
	-|--|adminController.js 		管理员的控制器
	-|--|indexController.js 		首页的控制器
	-|models/						放 model 目录
	-|--|itemModel.js 				栏目的数据模型
	-|--|articleModel.js 			文章的数据模型
	-|--|adminModel.js 				管理员的数据模型
	-|--|linkModel.js 				友情链接的数据模型	
	-|routes/						路径文件的目录
	-|--|index.js 					前台路由(用户)
	-|--|admin.js 					后台路由(管理员)
	-|views/						模版(视图)目录
	-|public/						静态资源库
	-|uploads                       上传文件目录
	-|node_modules/					项目依赖模块的目录
	-|app.js 						项目入口文件
	-|package.json 					项目的配置文件

## 数据库文件夹
	xbydata

### 下载依赖
	/npm install

### 启动项目
	npm start

### 后台登陆
	用户名：admin      密码：111