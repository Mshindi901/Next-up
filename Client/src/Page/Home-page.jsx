import { MdOutlineHistory } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function HomePage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userTasks, setUserTasks] = useState([]);
    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('User'));
            if(user) {
                setUserName(user.name);
            }
        } catch (error) {
            console.log(error);
            navigate('/login');
        }

    },[navigate])


    const handleGettingUserTasks = useCallback( async () => {
        const token = localStorage.getItem('Token');
        if(!token) {
            console.log('No token found');
            navigate('/login');
            return;
        }
        try {
            const data = await axios.get('http://localhost:5000/api/all-tasks', {
                headers: {Authorization: `Bearer ${token}`}
            })
            if(data.data.success) {
                setUserTasks(data.data.task);
            }
        } catch (error) {
            console.log(error);
        }

    },[navigate])

    useEffect(() => {handleGettingUserTasks()},[handleGettingUserTasks])

    const handleTaskRemoval = async (taskId, e) => {
        e.preventDefault();
        const token = localStorage.getItem('Token');
        if(!token) {
            console.log('No token found');
            navigate('/login');
            return;
        }
        try {
            const data = await axios.delete(`http://localhost:5000/api/delete-task/${taskId}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            if(data.data.success) {
                setUserTasks(userTasks.filter(task => task._id !== taskId));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <div className="w-full min-h-screen flex flex-col bg-slate-100">
                {/*The top section for adding task*/}
                {/*The section should stay at the top in desktops and at the bottom in mobile*/}
                <div className="w-full h-fit p-6 md:top-0 bottom-0 flex justify-center items-center bg-white shadow-xl">
                    <button className="md:w-1/5 w-3/4 h-max py-3 md:py-4 rounded-2xl shadow-lg bg-component text-white text-2xl font-open" onClick={() => {navigate('/tasks')}}>Add Task</button>
                </div>

                {/*The main section for displaying tasks*/}
                <div className="w-full h-full flex md:flex-row">
                    {/*The sidebar for more tools*/}
                    <div className="md:w-1/5 w-3/4 min-h-screen md:flex flex-col hidden bg-white shadow-xl p-6 justify-between">
                        <div className="flex flex-row justify-between items-center p-6">
                            <h1 className="md:text-4xl text-3xl font-open text-sky font-semibold">NextUp</h1>
                            <button className="text-2xl md:text-4xl text-sky font-semibold"><IoMdCloseCircleOutline/></button>
                        </div>

                        <div className="w-full h-fit p-3 flex flex-col gap-4 border-l-2 border-slate-200">
                            <p className="font-open text-2xl md:text-3xl text-center text-sky">Your Tasks</p>
                            <button className="w-full h-max p-4 text-2xl font-mono font-semibold text-component">Completed</button>
                            <button className="w-full h-max p-4 text-2xl font-mono font-semibold text-component">Incomplete</button>
                            <button className="w-full h-max p-4 text-2xl font-mono font-semibold text-component">Archived</button>
                        </div>


                        <div className="flex flex-col justify-center gap-3">
                            <button className="w-full h-max p-4 flex justify-between items-center text-component text-2xl">History<MdOutlineHistory/></button>
                            <button className="w-full h-max p-4 flex justify-between items-center text-component text-2xl">Donate <BiSolidDonateHeart/></button>
                            <button className="w-full h-max p-4 flex justify-between items-center text-component text-2xl">Contact <IoIosMail/></button>
                        </div>
                    </div>

                    {/*The main section for displaying tasks*/}
                    <div className='md:w-4/5 w-full h-full flex flex-col gap-2'>
                        <div className="w-full h-fit p-6 flex flex-row justify-between">
                            <h1 className="md:text-4xl text-2xl font-open text-sky font-semibold">NextUp</h1>
                            <p className="md:text-2xl text-xl font-open text-component font-semibold">Hello {userName} </p>
                        </div>

                        {/* The section where the grid of cards will appear*/}
                        <div className="w-full md:w-4/5 h-full min-h-screen grid md:grid-cols-4 grid-cols-1 gap-4 p-3">
                            {userTasks.map((task, id) => (
                                <div className="md:h-96 h-fit md:p-4 shadow-2xl border rounded-2xl flex flex-col gap-4 bg-component p-6" key={id}>
                                    <h1 className="text-2xl md:text-3xl font-open text-white font-bold">{task.name}</h1>
                                    <div className="flex flex-col gap-6">
                                        <p className="text-xl md:text-2xl font-open text-white font-semibold">{task.description}</p>
                                        <p className="text-lg md:text-xl font-open text-white font-semibold">{task.category}</p>
                                    </div>
                                    <div className="flex justify-between p-4 bottom-0">
                                        <button className="w-max h-max px-4 py-4 rounded-full bg-component text-xl md:text-2xl text-red-600 font-bold" onClick={(e) => {handleTaskRemoval(task._id, e)}}><FaRegTrashAlt/></button>
                                        <button className="w-max h-max px-4 py-4 rounded-full bg-component text-xl md:text-2xl text-green-600 font-bold" onClick={(e) => {handleTaskRemoval(task._id, e)}}><FaRegCheckCircle/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}