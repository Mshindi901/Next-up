/* eslint-disable no-undef */
import express from 'express';
import jwt from 'jsonwebtoken';
import Bcrypt from 'bcrypt';
import User from '../models/UserSchema.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields',
        })
    }
    try {
        const Account = await User.findOne({email});
        if(!Account){
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }
        const isMatch = await Bcrypt.compare(password, Account.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
        const token = jwt.sign({id: Account._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        if(!token){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token,
            user: Account,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})
export default router;