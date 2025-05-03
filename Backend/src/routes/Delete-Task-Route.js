import express from 'express';
import Task from '../models/TaskSchema.js';
import mongoose from 'mongoose';

const router = express.Router();
router.delete('/delete-task/:id', async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: 'Invalid task ID',
        });
    }
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
})
export default router;