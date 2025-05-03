import express from 'express';
import Task from '../models/TaskSchema.js';
import authenticationToken from '../middleware/authentication.js';

const router = express.Router();
router.get('/all-tasks', authenticationToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({userId});
        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tasks found',
            })
        }
        return res.status(200).json({
            success: true,
            task: tasks,
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