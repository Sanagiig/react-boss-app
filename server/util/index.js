util = require("utility");

exports.md5Encrypt = function(v) {
  return util.md5(util.md5(v + "Sanagi is me @#$~~~"));
};
