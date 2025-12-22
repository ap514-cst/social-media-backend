
const userModel = require("../model/user.model");

//create new user..
//register controller..
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.find({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User already exists" })
        } else {
            const newUser = new userModel({ name, email, password });
            const User = await newUser.save();
            if (User) {
                res.status(201).json({ message: "User registerd successfully", User })
            } else {
                res.status(400).json({ message: "Failed to register user" })
            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }
}

//login controller..
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        } if (user.password !== password) {
            return res.status(400).json({ message: "password is incorrect" })
        } 
          return  res.status(200).json({ message: "login successful" })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    register,
    login
}