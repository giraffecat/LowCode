const express = require('express')
// 创建一个express实例
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes/index.js')
var authRouter = require('./routes/auth');


// view引擎设置
app.set('view engine','ejs'); 
// 设置public文件夹
app.use(express.static('public')); 


// body parser中间件 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json./models/getCategoryList
app.use(bodyParser.json())

// ---- CORS setHeader 跨域设置 ----
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})


// 设置路由
app.use('/',router);
app.use('/oauth', authRouter);
//
const PORT = process.env.PORT || 3000;

app.listen(PORT)