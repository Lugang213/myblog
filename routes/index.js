var express = require('express');
var router = express.Router();
// 引入前台控制器
var indexController = require('../controllers/indexController.js');

// 博客首页
router.get('/',indexController.index);

// 列表页
router.get('/life',indexController.life);
router.get('/jishu',indexController.jishu);
router.get('/note',indexController.note);

// 关于我
router.get('/about',indexController.about);

// 内容页
router.get('/content/:_id',indexController.content);

// 留言
router.get('/message',indexController.message);

// 阅读全文
router.get('/read/:_id',indexController.read);



module.exports = router;
