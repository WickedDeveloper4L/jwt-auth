const express = require("express");
const auth = require("../../middlewares/auth.js");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./user.controller");
const {
  sendVerificationOTPEmail,
} = require("../email_verification/emailverification.controller.js");
//SignIn
router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (!(email && password)) {
      throw Error("empty input fields!");
    }
    const authenticatedUser = await authenticateUser({ email, password });

    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!(name && email && password)) {
      throw Error("empty input fields!");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("Invalid Name entered!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("invalid email!");
    } else if (password.length < 8) {
      throw Error("password is too short!");
    } else {
      //good credentials, create new user
      const newUser = await createNewUser({
        name,
        email,
        password,
      });
      await sendVerificationOTPEmail(email);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//protected Route
router.get("/private_data", auth, (req, res) => {
  res
    .status(200)
    .send(`You're currently in the territory of ${req.currentUser.email}`);
});

module.exports = router;
