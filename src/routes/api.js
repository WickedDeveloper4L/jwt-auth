const express = require("express");
const api = express.Router();

const userRoutes = require("../domains/user/routes");
const otpRouter = require("../domains/otp/otp.routes");
const emailVerificationRouter = require("../domains/email_verification/emailVerification.routes");

api.use("/user", userRoutes);
api.use("/otp", otpRouter);
api.use("/email_verification", emailVerificationRouter);
module.exports = api;
