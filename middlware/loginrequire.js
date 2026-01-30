const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { Jwt_secret } = require("../key");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Login required" });
    }

    // Authorization: Bearer token
    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, Jwt_secret);

    const user = await User.findById(payload. _id);
    console.log(user);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 👈 VERY IMPORTANT
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
