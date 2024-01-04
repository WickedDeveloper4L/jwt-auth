const express = require("express");
const api = express.Router();

const userRoutes = require("../domains/user/routes");

api.use("/user", userRoutes);

module.exports = api;
