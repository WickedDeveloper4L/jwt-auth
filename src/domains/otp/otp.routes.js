const express = require("express");
const { sendOTP } = require("./otp.controller");
const otpRouter = express.Router();

//request new verification otp

otpRouter.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createdOTP = await sendOTP({
      email,
      message,
      subject,
      duration,
    });

    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = otpRouter;
