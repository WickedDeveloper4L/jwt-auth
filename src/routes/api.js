const express = require("express");
const api = express.Router();

const userRoutes = require("../domains/user/routes");
const otpRouter = require("../domains/otp/otp.routes");

api.use("/user", userRoutes);
api.use("/otp", otpRouter);
module.exports = api;
