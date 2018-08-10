const userModel = require("../../model").userModel;
const User = userModel.getModelByName("user");
const encrypt = require("../../util").md5Encrypt;

function docToUserInfo(doc) {
  const data = {
    username: doc.username,
    desc: doc.desc,
    role: doc.role,
    title: doc.title,
    avatar: doc.avatar
  };

  if (doc.role === "boss") {
    data.money = doc.money;
    data.company = doc.company;
  }
  return data;
}
exports.checkState = function(req, res) {
  res.json({ status: 1 });
};

exports.getUserInfo = function(req, res) {
  User.findOne({ _id: req.query.userId }, function(err, doc) {
    let code = 0;
    let msg = "ok";
    let data = "";
    if (err) {
      code = 1;
      msg = "查询数据出错";
    }
    if (!doc) {
      code = 1;
      msg = "用户未登录或登录信息失效";
    } else {
      data = docToUserInfo(doc);
    }
    res.json({ code, msg, data });
  });
};

exports.getAllUserInfo = function(req, res) {
  let json;
  User.find({}, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "mongo error" });
    }
    json = doc;
  });

  res.json({ code: 0, data: json });
};
exports.handleRegister = function(req, res) {
  const body = req.body;
  let username = body.username;
  let password = body.password;
  let role = body.role;
  let code = 0;
  let msg = "ok";

  User.findOne({ username }, function(err, doc) {
    if (doc) {
      code = 1;
      msg = `账号 ${username} 已被注册`;
    }

    if (code === 0) {
      User.create({ username, password: encrypt(password), role });
    }

    res.json({
      code,
      msg
    });
  });
};

exports.handleLogin = function(req, res) {
  const body = req.body;
  if (!body.username || !body.password) {
    return res.json({ code: 1, msg: "账号密码不能为空" });
  }

  body.password = encrypt(body.password);
  User.findOne(req.body, function(err, doc) {
    if (err) {
      res.json({ code: 500, msg: "查询数据库时出错" });
      return;
    }
    if (doc) {
      res.cookie("userId", doc._id.toString());
      res.json({
        code: 0,
        msg: "登录成功",
        data: docToUserInfo(doc)
      });
    } else {
      res.json({ code: 1, msg: "登录失败，账号或者密码不正确" });
    }
  });
};

//更新用户信息
exports.handleUserInfoUpdate = function(req, res) {
  const userId = req.body.userId;
  console.log("user id", userId);
  if (!userId) {
    res.json({ code: 1, msg: "没有收到相应的用户ID" });
  } else {
    User.findByIdAndUpdate(userId, req.body, function(err, doc) {
      console.log("searching ...");
      if (err) {
        res.json({ code: 1, msg: "查询数据库时出错" });
      } else {
        res.json({ code: 0, data: doc });
      }
    });
  }
};
