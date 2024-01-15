const { sendOTP, verifyOTP, deleteOTP } = require("../otp/otp.controller");
const user = require("../user/user.model");

const verifyUserEmail = async ({ email, otp }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid code passed. check your inbox.");
    }

    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};
const sendVerificationOTPEmail = async (email) => {
  try {
    //check if account exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      throw Error("user does not exist and is not a registered user!");
    }

    const otpDetails = {
      email,
      subject: "Email verification",
      message: "Verify your email with the code below.",
      duration: 1,
    };

    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendVerificationOTPEmail, verifyUserEmail };
