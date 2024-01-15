const { hashData } = require("../../utils/hashData");
const { sendOTP, verifyOTP, deleteOTP } = require("../otp/otp.controller");
const user = require("../user/user.model");

const resetUserPassword = async ({ email, otp, newPassword }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid code passed, check your inbox.");
    }

    //now update user record with new password
    if (newPassword.length < 8) {
      throw Error("password is too short!");
    }
    const hashedNewPassword = await hashData(newPassword);
    await user.updateOne({ email }, { password: hashedNewPassword });
    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

const sendPasswordResetOTPEmail = async (email) => {
  try {
    //check if user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      throw Error("There's no account for the provided email.");
    }
    if (!existingUser.verified) {
      throw Error("Email hasn't been verified yet. Check your inbox.");
    }
    const otpDetails = {
      email,
      subject: "Password Reset",
      message: "Enter the code below to reset your password.",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendPasswordResetOTPEmail, resetUserPassword };
