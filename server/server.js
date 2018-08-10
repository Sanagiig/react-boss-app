const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const utility = require("utility");
const webRouter = require("./router");
const models = require("./model/user");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", webRouter);

app.listen(9093, function() {
  console.log("app listen at 9000");
});
