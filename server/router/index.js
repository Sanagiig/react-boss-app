const express = require("express");
const router = express.Router();

const user = require("./user");
const getMethods = require("./get");
const postMethods = require("./post");

router.use("/", getMethods.log);
router.get("/", getMethods.index);

//user
router.post("/user/register", user.handleRegister);
router.post("/user/login", user.handleLogin);
router.get("/checkState", user.checkState);
router.get("/data", getMethods.getData);
router.get("/user/info", user.getUserInfo);
router.get("/user/allInfo", user.getAllUserInfo);
router.post("/user/update", user.handleUserInfoUpdate);

module.exports = router;
