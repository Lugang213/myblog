var express = require('express');
var router = express.Router();
// 引入 管理员 系统 的控制器
var adminController = require('../controllers/adminController.js');


/* 管理员的首页 */
router.get('/',adminController.index);

// 添加栏目
router.get('/itemAdd',adminController.itemAdd);
// 插入 栏目数据
router.post('/itemInsert',adminController.itemInsert);
// 栏目列表
router.get('/itemList',adminController.itemList);
// 删除栏目
router.get('/itemRemove/:_id',adminController.itemRemove);
// 编辑栏目页面
router.get('/itemEdit/:_id',adminController.itemEdit);
// 更新数据
router.post('/itemUpdate',adminController.itemUpdate);


// 发布文章
router.get('/articleAdd',adminController.articleAdd);
// 插入文章
router.post('/articleInsert',adminController.articleInsert);
// 文章列表
router.get('/articleList',adminController.articleList);
// 编辑文章的页面
router.get('/articleEdit/:_id',adminController.articleEdit);
// 更新文章封面
router.post('/articleImageUpdate',adminController.articleImageUpdate);
// 更新文章文本
router.post('/articleTextUpdate',adminController.articleTextUpdate);
// 删除文章
router.get('/articleRemove/:_id',adminController.articleRemove);


// 添加用户
router.get('/adminAdd',adminController.adminAdd);
// 插入用户信息
router.post('/adminInsert',adminController.adminInsert);
// 用户列表
router.get('/adminList',adminController.adminList);
// 删除用户
router.get('/adminRemove/:_id',adminController.adminRemove);
// 编辑用户页面
router.get('/adminEdit/:_id',adminController.adminEdit);
// 更新用户数据
router.post('/adminUpdate',adminController.adminUpdate);

// 验证码
router.get('/code',adminController.code);

// 登录页面
router.get('/login',adminController.login);
// 登录的操作
router.post('/doLogin',adminController.doLogin);
// 退出登录
router.get('/logOut',adminController.logOut);

// 链接管理
// 添加链接
router.get('/linkAdd',adminController.linkAdd);
// 插入链接数据
router.post('/linkInsert',adminController.linkInsert);
// 链接列表
router.get('/linkList',adminController.linkList);
// 删除链接
router.get('/linkRemove/:_id',adminController.linkRemove);
// 编辑链接页面
router.get('/linkEdit/:_id',adminController.linkEdit);
// 更新数据
router.post('/linkUpdate',adminController.linkUpdate);

module.exports = router;
