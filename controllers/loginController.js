const { comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("password or email is incorrect");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Email is not registered",
        user,
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfull",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
