const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/User');

const userCtrl = {
    //! Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        //! Check if the user is already registered
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Username already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.json({
            status: 'success',
            message: 'User registered successfully',
            user
        })
    }),
    //! Login
    login: asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ id: user._id }, 'auth-api', { expiresIn: '1d' });
        res.json({
            status: 'success',
            message: 'User logged in successfully',
            user,
            token
        })
    }),

    //! Profile
    profile: asyncHandler(async (req, res) => {
        //! Find the user
        const user = await User.findById(req.user);
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.json({
            status:'success',
            user
        })
    })
}

module.exports = userCtrl;