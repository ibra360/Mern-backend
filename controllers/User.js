const Users = require("../models/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  console.log("User==", Users);
  try {
    const allUsers = await Users.find();
    res.status(200).json({
      sucess: true,
      data: allUsers,
    });
  } catch (e) {
    res.status(401).json({
      sucess: false,
      data: e._message,
    });
    console.log("Error ==>", e);
  }
};

exports.registerUser = async (req, res) => {
  // addUser
  console.log("req", req.body);

  try {
    const email = req.body.email;
    // uniqueMail
    const user = await Users.findOne({ email });
    console.log(user, "userrrrrrrrrrrrrrrr");
    if (user) {
      throw "Email address already registered!";
    }
    // password convert
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const newUser = new Users(req.body);
    // const token = user.getSignedJwtToken()
    newUser.save();

    res.status(200).json({
      sucess: true,
      data: newUser,
    });
    // sendTokenResponse(newUser, 200, res);
  } catch (e) {
    console.log("catching error in addUser==>", e);
    res.status(400).json({
      sucess: false,
      data: e._message,
    });
  }
};

exports.loginUser = async (req, res) => {
  console.log("LOGIN BODY", req.body);

  const { email, password } = req.body;

  const user = await Users.findOne({ email: email });
  console.log("user 1", user);

  if (!user) {
    // return next(new ErrorResponse('Invalid Crednetials'), 401)
    res.status(401).json({
      sucess: false,
      data: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("USER 2", isMatch);

  if (!isMatch) {
    // return next(new ErrorResponse('Incorrect Password'), 401)
    res.status(401).json({
      sucess: false,
      data: "Incorrect Password",
    });
  }

  sendTokenResponse(user, 200, res, req);
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(404).json({
        sucess: false,
        error: "INVALID ID",
      });
    }
    res.status(200).json({
      sucess: true,
      message: `User ${req.params.id} is succesfully deleted`,
      data: {},
    });
  } catch (err) {
    console.log("DELETE ERROR", err.message);
    res.status(404).json({
      sucess: false,
      error: err.message,
    });
  }
};


const sendTokenResponse = (user, statusCode, res, req) => {
  // const token = user.getSignedJwtToken();
  console.log("CHAL GAYA");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  console.log("tokennnnn", token);

  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000
  //   ),
  //   httpOnly: true,
  req.body.user = user;
  res.status(statusCode).json({
    sucess: true,
    token,
    data: user,
  });
};
