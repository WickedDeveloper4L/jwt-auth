const express = require("express");
const {
  sendVerificationOTPEmail,
  verifyUserEmail,
} = require("./emailverification.controller");
const emailVerificationRouter = express.Router();
emailVerificationRouter.post("/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (!(email && otp)) {
      throw Error("provide values to email and otp");
    }

    await verifyUserEmail({ email, otp });
    res.status(200).json({ email, verified: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//request for new email verification
emailVerificationRouter.post("/", async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) throw Error("no value for email provided");

    const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);

    res.status(200).json(createdEmailVerificationOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = emailVerificationRouter;
