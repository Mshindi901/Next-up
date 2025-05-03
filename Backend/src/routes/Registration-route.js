import express from 'express';
import Bcrypt from 'bcrypt';
import User from '../models/UserSchema.js';

const router = express.Router();
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields',
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            })
        }
        const salt = await Bcrypt.genSalt(10);
        const hashedPassword = await Bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
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