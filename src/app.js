const express = require("express");
const cors = require("cors");
const bodyParser = express.json;
//mongodb
require("./services/mongo");

const app = express();

app.use(cors());
app.use(bodyParser());

module.exports = app;
