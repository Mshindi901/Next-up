import Image from '../assets/Form-Background.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast, Bounce, ToastContainer} from 'react-toastify';
export default function Forms() {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();
    const handleFormChange = () => {
        if(isRegister === false) {
            setIsRegister(true);
        }
        else {
            setIsRegister(false);
        }
    }

    const NewAccountToast = () => {
        toast.success('Account Created Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });     
    }
    const LoginToast = () => {
        toast.success('Logged in Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    const handleNewAccountCreation = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:5000/api/register', {
                name,
                email,
                password
            });
            if(data.data.success) {
                console.log('User registered successfully');
                setIsRegister(true);
            }
            NewAccountToast();
        } catch (error) {
            console.log(error)
        }

    }
    const handleAccountLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:5000/api/login', {
                email: loginEmail,
                password: loginPassword
            });
            if(data.data.success) {
                console.log('User logged in successfully');
                localStorage.setItem('User', JSON.stringify(data.data.user));
                localStorage.setItem('Token', data.data.token);
                LoginToast();
                navigate('/tasks');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <div className="w-full h-full min-h-screen flex md:flex-row flex-col items-center justify-center">

                {/*The Form section*/}
                <div className='md:w-1/4 w-full h-full min-h-screen p-6 flex justify-center items-center'>
                    {!isRegister &&
                        <form action="" method="post" className='w-full h-full flex flex-col gap-4' onSubmit={handleAccountLogin}>
                            <h1 className='text-sky text-2xl md:text-3xl font-bold font-sans text-center'>Welcome Back!</h1>
                            <p className='text-black text-xl md:text-2xl flex gap-2'>Don't have an Account?<button className='text-blue-500 underline hover:no-underline md:text-2xl text-xl' type='button' onClick={handleFormChange}>SignUp</button></p>
    
                            <input type="email" placeholder='Email Address' className='w-full py-3 outline-none border-b-2 border-black bg-none rounded-2xl' value={loginEmail} onChange={(e) => {setLoginEmail(e.target.value)}}/>
                            <input type="password" name="" id="" placeholder='Password' className='w-full py-3 border-b-2 border-black bg-none rounded-2xl' value={loginPassword} onChange={(e) => {setLoginPassword(e.target.value)}}/>
                            <p className='text-black text-xl md:text-2xl flex gap-2'>Forgot Password?<button className='text-blue-500 underline hover:no-underline md:text-2xl text-xl'>Reset</button></p>
                            <input type="submit" value="Login" className='w-full py-3 border rounded-2xl shadow-xl bg-component md:text-2xl text-xl text-white'/>
                        </form> 
                    }
                    {
                       isRegister && 
                        <form action="" method="post" className='w-full h-full flex flex-col gap-4' onSubmit={handleNewAccountCreation}>
                            <h1 className='text-sky text-2xl md:text-3xl font-bold font-sans text-center'>Welcome !</h1>
                            <p className='text-center md:text-2xl text-xl text-sky font-semibold'>Become a part of us Today</p>

                            <input type="text" placeholder='Name' className='w-full py-3 outline-none border-b-2 border-black bg-none rounded-2xl' value={name} onChange={(e) => {setName(e.target.value)}}/>
                            <input type="email" placeholder='Email Address' className='w-full py-3 outline-none border-b-2 border-black bg-none rounded-2xl'value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            <input type="password" name="" id="" placeholder='Password' className='w-full py-3 border-b-2 border-black bg-none rounded-2xl' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                            <p className='text-black text-xl md:text-2xl flex gap-2'>Already Have an Account?<button className='text-blue-500 underline hover:no-underline md:text-2xl text-xl' type='button' onClick={handleFormChange}>SignIn</button></p>
                            <input type="submit" value="Register" className='w-full py-3 border rounded-2xl shadow-xl bg-component md:text-2xl text-xl text-white'/>
                        </form>
                    }
                    <ToastContainer/>
                </div>
                <div className='md:w-3/4 md:h-full min-h-screen w-full h-1/4 md:border-l border-t md:rounded-2xl rounded-b-full bg-cover bg-center md:flex hidden items-center md:p-0 p-3 'style={{backgroundImage: `url(${Image})`}}>
                    <div className='md:w-1/2 w-full h-fit p-5 flex flex-col bg-none gap-6'>
                        <h1 className='md:text-5xl text-3xl text-sky font-bold'>Welcome To Next Up</h1>
                        <p className='md:text-3xl text-xl text-sky font-serif'>NextUp is a Full-stack to do List App That has been Built with modern Technologies and modern UI design</p>
                    </div>
                </div>
            </div>
        </>
    )
}