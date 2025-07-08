const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

router.post('/register' , async (req,res) => {
    const {name,email,password,age,mobile,dob,gender,department,role,joiningDate,address,resume} = req.body

    try{
        const existing = await User.findOne({email})
        if(existing){
            return res.status(400).json({message: 'User already exists'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({name,email,password: hashedPassword,age,mobile,dob,gender,department,role,joiningDate,address,resume})
        await user.save()
        res.status(201).json({ message: "User registered successfully" });

    }
    catch(error){
        console.error("Register error:", error);

        res.status(500).json({ message: "Invalid Register" });

    }
})

router.post('/login' , async (req,res) => {
    const { email, password } = req.body;
    console.log("user", email)
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message : 'Invalid credentials'})

        }
        const matchPassword = await bcrypt.compare(password,user.password)
        if (!matchPassword) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET , {expiresIn:'1h'})
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                department: user.department
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({message:'Server error'})
        
    }
})

module.exports = router 