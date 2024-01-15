const express = require("express");
const { sendOTP, verifyOTP } = require("./otp.controller");
const otpRouter = express.Router();

otpRouter.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validOTP = await verifyOTP({ email, otp });
    res.status(200).json({ valid: validOTP });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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
