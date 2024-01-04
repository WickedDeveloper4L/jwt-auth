const express = require("express");

const router = express.Router();
const { createNewUser } = require("./user.controller");
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
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
