const { createToken } = require("../utilities");
const User = require("../models/user.model");

//signup Controller
const userSignup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName) {
      return res.status(400).json({ error: "Full Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(400).json({ error: "User already exist" });
    }

    //Model instance
    const user = new User({
      fullName,
      email,
      password,
    });

    //Save to db
    await user.save();

    //Create and sign token
    const accessToken = createToken(user._id);

    return res.status(200).json({ error: false, user, accessToken, message: "Registration Successful" });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

//Login Controller
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(400).json({ error: "User not found" });
    }

    //validate user
    if (userInfo.email === email && userInfo.password === password) {
      //Create and sign token
      const accessToken = createToken(userInfo._id);
      return res.status(200).json({ error: false, userInfo, accessToken, message: "Login Successful" });
    } else {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

const getUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const isUser = await User.findOne({ _id: userId });

    if (!isUser) {
      res.status(401);
    }

    return res.status(200).json({ user: { _id: isUser._id, fullName: isUser.fullName, email: isUser.email, createdOn: isUser.createdOn } });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = { userSignup, userLogin, getUser };
