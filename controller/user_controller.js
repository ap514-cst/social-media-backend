// controllers/authController.js
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Jwt_secret}=require("../key");
const { Router } = require("express");

// 🔹 REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash

    bcrypt.hash(password, 10).then((hashedPassword) => {
      const user =new User({
        name,
        email,
        password: hashedPassword
      });

    const newUser= user.save()
    if(newUser){
      res.status(202).json({message:"data save"})
    }else{
      res.status(400).json({message:"data save faild"})
    }

    })



  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/authController.js

// 🔹 LOGIN
const login = async (req, res) => {
 try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id },   // ✅ IMPORTANT
      Jwt_secret,
      { expiresIn: "1h" }
    );

    const { password: _, ...safeUser } = user._doc;
    console.log(token,user)
    
    res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// search user by name ..
const searchUser= async(req,res)=>{
  try {
    const keyword=req.query.search;

    if(!keyword){
      return res.json([])
    }
    const result=await User.find({
      $or:[
        {name:{$regex:keyword,$options:"i"}}
      ]
    }).select("_id name")
    .limit(5)

    res.json(result)
    
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = { register, login,searchUser };



