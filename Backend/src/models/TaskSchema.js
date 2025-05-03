import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }
},{timestamps: true});
const Task = mongoose.model('Task', TaskSchema);
export default Task;