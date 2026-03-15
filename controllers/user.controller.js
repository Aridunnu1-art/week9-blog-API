const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const joi = require('joi');
const usermodel = require('../models/user.model.js');
const signup = async (req, res, next) => {
    const {email, password, name} = req.body;
    if(!email.trim()) {
        return res.status(400).json("Invalid email")
    }
    console.log(email);
    const extinguisher = await usermodel.findOne({ email })

    console.log(extinguisher);

    if (extinguisher) {
        return res.status(400).json({ message: 'email in already taken' })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await usermodel.create({
        name: name,
        email: email,
        Password: hashedPassword,
    });
    res.status(200).json({message: "user created", user: newuser});
};
const login = async(req, res)=> {
    const{email, Password} = req.body
const user = await usermodel.findOne({ email });

if (!user) {
    return res.status(404),json('user does not exist');
}
const isMatch = await bcrypt.compare(Password, user.Password);
if (!isMatch) {
    return res.status(400).json('Unexpected error Occured')
}

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d', });
res.status(200).json({message: "Login Successful", user, token }); 
};

module.exports = {
    signup, 
    login,
};
