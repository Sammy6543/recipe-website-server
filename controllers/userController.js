const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register user
const userRegister = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);


    const userData = req.body;
    const { username, email, password } = userData

    // all fields are required
    if (!username || !email || !password) {
        return res.status(404).json({ msg: "All Fields are Required", success: false });
    }
    try {

        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exist", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: req.file.cloudinaryUrl,
        })

        await newUser.save();

        return res.status(201).json({
            msg: "User Registerd Successfully", success: true, user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePicture: req.file.cloudinaryUrl,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

// User Login
const userLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }
    try {
        // get email & password
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ msg: "Invalid Credentials", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials", success: false });
        }

        const payload = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            msg: "LogIn Successfully", success: true, token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
            }
        })

    } catch (error) {
        console.log("LogIn Error: ", error);
        return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
}

// get only one id
const getMe = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ msg: "Invalid User ID" });
    }
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "Welcome User",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" })
    }
}

module.exports = { userRegister, userLogin, getMe }