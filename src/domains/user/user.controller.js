const user = require("./user.model");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const createToken = require("../../utils/createToken");
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

const authenticateUser = async (data) => {
  try {
    const { email, password } = data;

    const fetchedUser = await user.findOne({ email });
    if (!fetchedUser) {
      throw Error("invalid email entered!");
    }
    const hashedPassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      throw Error("Invalid password entered!");
    }

    // create Token if there was a match
    const tokenData = { userId: fetchedUser._id, email };

    const token = await createToken(tokenData);

    //assign user token
    fetchedUser.token = token;
    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, authenticateUser };
