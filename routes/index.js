const express = require('express')
const router = express.Router() //初始化路由

const HomeController = require('../controller/index')

// 上传图片
router.post('/fileUpload', HomeController.postImageFiles)

router.get('/test', HomeController.getHelloWorld)
//向外暴露
module.exports = router;