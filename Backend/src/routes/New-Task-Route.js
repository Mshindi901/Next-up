import express from 'express';
import Task from '../models/TaskSchema.js';


const router = express.Router();
router.post('/task', async (req, res) => {
    const { name, description, category } = req.body;
    if(!name || !description || !category){
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields',
        })
    }
    try {
        const newTask = new Task({
            name,
            description,
            category,
        });
        await newTask.save();
        return res.status(200).json({
            success: true,
            message: 'Task created successfully',
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