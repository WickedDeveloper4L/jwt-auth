const express = require("express");
const api = express.Router();

const userRoutes = require("../domains/user/routes");
const otpRouter = require("../domains/otp/otp.routes");
const emailVerificationRouter = require("../domains/email_verification/emailVerification.routes");
const forgotPasswordRouter = require("../domains/forgot_password/forgotPassword.routes");

api.use("/user", userRoutes);
api.use("/otp", otpRouter);
api.use("/email_verification", emailVerificationRouter);
api.use("/forgot_password", forgotPasswordRouter);
module.exports = api;
