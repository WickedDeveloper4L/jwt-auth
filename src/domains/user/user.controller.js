const user = require("./user.model");
const { hashData } = require("../../utils/hashData");
const createNewUser = async (data) => {
  try {
    const { name, email, password } = data;

    //checking if user alreaDY exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      throw Error("User with the same email already exists!");
    }

    //hash password
    const hashedPassword = await hashData(password);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    //save user
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser };
