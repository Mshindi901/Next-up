/* eslint-disable no-undef */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


const authenticationToken = async (req, res, next) => {
    const Header = req.headers['authorization'];
    if(!Header || !Header.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }
    const token = Header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
export default authenticationToken;