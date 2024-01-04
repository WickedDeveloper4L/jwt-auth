const express = require("express");
const cors = require("cors");
const api = require("./routes/api");
const bodyParser = express.json;
//mongodb
require("./services/mongo");

const app = express();

app.use(cors());
app.use(bodyParser());
app.use("/api/v1", api);
module.exports = app;
