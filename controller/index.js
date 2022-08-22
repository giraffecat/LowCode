const Busboy = require("busboy");
const fs = require("fs-extra");
const config = require("../config/default.js");

class HomeController {
  constructor() {
    this.imgUrl = "";
    this.postImageFiles = this.postImageFiles.bind(this)
  }
  // 上传商品图片
  async postImageFiles(req, res, next) {
    // console.log(req)

    const busboy = Busboy({ headers: req.headers });

    busboy.on("file", (name, file, info) => {
        // console.log(info);
      // 有文件来了，就保存在./public/uploadImgs/文件夹下，并重命名
      const filefolder = "./public/uploadImgs/";
      // 取出后缀名，文件名随机字符串：当前时间毫秒字符串_随机数
      const suffix = info.filename.split(".")[1],
        randonString =
          Date.now() + "_" + Math.random().toString(36).slice(2, 7);
      // 文件名： 文件名随机字符串.后缀
      const filenm = randonString + "." + suffix; // 文件名

      // 保存文件到指定文件夹 ./public/uploadImgs/
      file.pipe(fs.createWriteStream(filefolder + filenm)); //利用fs模块创建可以写入的流,并指定保存路径和名称

      // 图片的url
    //   console.log(this);
      this.imgUrl = filenm;
    });

    busboy.on("close", () => {
      //
      res.json({
        msg: "图片上传成功",
        code: 200,
        data: null,
        ok: true,
      });
    });
    req.pipe(busboy);
  }

  // 测试用的
  async getHelloWorld(req, res) {
    res.json({
      msg: "hello from the other side",
      code: 200,
      data: null,
      ok: true,
    });
  }
}

module.exports = new HomeController();
