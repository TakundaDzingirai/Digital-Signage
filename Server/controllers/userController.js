const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  static async register(req, res, next) {
    // Destructure user input data from the request body
    const { firstname, lastname, department, email, username, password, role } =
      req.body;

    // Hash the user-supplied password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User object with the hashed password
    const user = new User({
      firstname,
      lastname,
      email,
      role,
      username,
      department,
      password: hashedPassword,
    });

    // Save the new user to the database
    const newUser = new User(user);
    await newUser.save();

    // Generate a JSON Web Token for user authentication
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
    console.log(token);

    // Respond with a success message, the new user, and the JWT
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  }

  static async login(req, res, next) {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Find the user in the database by their username
    const user = await User.findOne({ username });

    // Check if the user exists and if the provided password matches the hashed password
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a new JWT for the authenticated user
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

    // Respond with the JWT
    res.json({ message: "Login successful", token });
  }

  static async logout(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    // Invalidate the token by adding it to the blacklist
    blacklist.add(token);
    // Respond with a success message for logout
    res.json({ message: "Logout successful" });
  }
}

module.exports = userController;
