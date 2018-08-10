const db = require("../../config").db;

const mongoose = require("mongoose");

mongoose.connect(
  db.url,
  () => {
    console.log("connect suc");
  }
);

const models = {
  user: {
    username: { type: String, require: true },
    password: { type: String, require: true },
    // 0 牛人  1：boss
    role: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    //职位名称
    title: { type: String },
    //boss 专有
    company: { type: String },
    money: { type: String }
  },

  chart: {}
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m], { timestamps: true }));
}

module.exports = {
  getModelByName: function(name) {
    return mongoose.model(name);
  }
};
