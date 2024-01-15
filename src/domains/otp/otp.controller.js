const generateOTP = require("../../utils/generateOTP");
const { hashData } = require("../../utils/hashData");
const sendEmail = require("../../utils/sendEmail");
const OTP = require("./otp.model");
require("dotenv").config();

const { AUTH_EMAIL, AUTH_PASS } = process.env;
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email, subject, message, duration)) {
      throw Error("Provide values for email, subject, message");
    }
    //delete any old record
    await OTP.deleteOne({ email });

    //Generate OTP
    const generatedOTP = await generateOTP();

    //Send Email
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
    };

    await sendEmail(mailOptions);

    //save otp record
    const hashedOTP = await hashData(generateOTP);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};
module.exports = { sendOTP };
