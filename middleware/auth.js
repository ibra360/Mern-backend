const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("SADDDASSAD");
    token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);
  }
  console.log("token", token);
  // else if(req.cookies.token){
  //     token=req.cookies.token
  // }

  //Make sure token exists
  if (!token) {
    res.status(401).json({
      sucess: false,
      data: "No token",
    });
  }

  try {
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED", decoded, req);
    req.body.data = decoded.id ;
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log("df");
    console.log(error.message);
    res.status(401).json({
      sucess: false,
      data: "Not Authorised to access ths route",
    });
  }
};
