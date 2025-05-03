import Image from '../assets/Todo Image.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function TaskForm() {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const handleNewTaskCreation = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:5000/api/task', {
                name: taskName,
                description,
                category
            },);
            if(data.data.success) {
                console.log('Task created successfully');
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <div className="w-full h-full min-h-screen flex md:flex-row flex-col">
                {/*The Form section*/}
                <div className='md:w-1/4 w-full h-full min-h-screen flex justify-center items-center p-6'>
                    <form action="" method="post" className='w-full h-full flex flex-col gap-4' onSubmit={handleNewTaskCreation}>
                        <h1 className='text-sky text-2xl md:text-3xl font-bold font-sans text-center'>Lets Get Working !</h1>
                        <p className='text-center md:text-2xl text-xl text-sky font-semibold'>Fill The Details</p>

                        <input type="text" placeholder='Task name' className='w-full py-3 outline-none border-b-2 border-black bg-none rounded-2xl' value={taskName} onChange={(e) => {setTaskName(e.target.value)}}/>
                        <input type="text" placeholder='Description' className='w-full py-3 outline-none border-b-2 border-black bg-none rounded-2xl' value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                        <select name="" id="" className='w-full py-3 outline-none border-b-2 border-black bg-none rounded-2xl' value={category} onChange={(e) => {setCategory(e.target.value)}}>
                            <option value="" className='text-black text-xl md:text-2xl' disabled>Select Category</option>
                            <option value="Important" className='text-red-500 md:text-2xl text-2xl'>Important</option>
                            <option value="Less Important" className='text-yellow-500 md:text-2xl text-2xl'>Less Important</option>
                            <option value="Not Important" className='text-green-500 md:text-2xl text-2xl'>Not Important</option>
                        </select>
                        <input type="submit" value="Create Task" className='w-full py-3 border rounded-2xl shadow-xl bg-component md:text-2xl text-xl text-white'/>
                    </form>
                </div>
                <div className='md:w-3/4 md:h-full min-h-screen w-full h-1/4 md:border-l border-t md:rounded-2xl rounded-b-full bg-cover bg-center md:flex hidden items-center md:p-0 p-3 'style={{backgroundImage: `url(${Image})`}}>
                    <div className='md:w-1/2 w-full h-fit p-4 flex flex-col gap-6'>
                        <h1 className='md:text-5xl text-3xl text-white font-bold'>Welcome To Next Up</h1>
                        <p className='md:text-3xl text-xl text-white font-serif'>NextUp is a Full-stack to do List App That has been Built with modern Technologies and modern UI design</p>
                    </div>
                </div>
            </div>
        </>
    )
}