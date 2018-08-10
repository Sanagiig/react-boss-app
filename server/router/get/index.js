exports.log = function(req, res, next) {
  console.log("received a get request at ", Date.now());
  next();
};

exports.index = function(req, res) {
  res.send("<h1>hello world</h1>");
};

exports.getUserInfo = function(req, res) {
  res.json({ name: "sanagi", age: 20, type: "it" });
};

exports.getData = function(req, res) {
  res.json({ name: "sanagi", type: "it" });
};
