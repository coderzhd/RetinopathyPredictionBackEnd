const express = require("express");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 允许来自所有域的跨域请求
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 处理上传文件接口
app.post("/upload", (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join(__dirname, "uploads", filename);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on("finish", function () {
    res.send("文件上传成功");
  });

  return req.pipe(busboy);
});

// 开始分析接口
app.post("/api/data-analyse", (req, res) => {
  // 从请求体中获取用户ID和图片ID数组
  const userId = req.body.userId;
  const imageIds = req.body.fileList;
  console.log(userId, imageIds);
  // 在这里进行处理，生成你需要返回的结果数组
  const resultArray = [
    {
      id: 1,
      url: "https://lin-xin.gitee.io/images/post/wms.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 2,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 3,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
  ];
  // 返回结果给前端
  res.json({ success: true, result: resultArray });
});

// 返回列表接口
app.get("/api/datalist", (req, res) => {
  const userID = req.query.userID;
  // 在这里进行处理，生成你需要返回的结果数组
  const resultArray = [
    {
      id: 1,
      url: "https://lin-xin.gitee.io/images/post/wms.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 2,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 3,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 4,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 5,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 6,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 7,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
    {
      id: 8,
      url: "https://lin-xin.gitee.io/images/post/node3.png",
      result: "无症状",
      acc: 0.8733,
    },
  ];

  // 返回结果给前端
  res.json({ success: true, result: resultArray });
});

// 删除记录接口
app.delete("/api/delete", (req, res) => {
  const recordId = req.query.recordId;

  console.log(recordId);

  // 返回结果给前端
  res.json({ success: true });
});

app.use(express.static("./uploads"));

app.listen(3000, function () {
  console.log("服务启动成功：http://localhost:3000");
});
