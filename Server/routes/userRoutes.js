if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router({ mergeParams: true });

// This route will be used to register users
router.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, department, email, username, password, role } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      role,
      username,
      department,
      password: hashedPassword,
    });

    const newUser = new User(user);
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        department: user.department,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: "7d", // You can adjust the token expiration as needed
      }
    );

    console.log(token);
    // Include the token in the response
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Login and generate a JWT token
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Include the 'username' in the token payload
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        department: user.department,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/logout", (req, res) => {
  // You can handle logout logic here if needed
  res.json({ message: "Logout successful" });
});

module.exports = router;
