import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Sign Up')
    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true;

            if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
                    name,
                    email,
                    password,
                });

                if (data.success) { // Corrected from 'data.succes'
                    setIsLoggedin(true);
                    getUserData();
                    toast.success("Account created successfully!");
                    navigate('/');
                } else {
                    toast.error(data.message || "Sign-up failed");
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
                    email,
                    password,
                });

                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    toast.success("Login successful!");
                    navigate('/');
                } else {
                    toast.error(data.message || "Login failed");
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-sky-600 to-pink-400'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text:sm'>
                <h2 className='text-3xl font-semibold text-sky-500 text-center mb-3'>
                    {state === 'Sign Up' ? 'Create  Account' : 'Login'}
                </h2>
                <p className='text-center text-white text-md mb-6'>
                    {state === 'Sign Up' ? 'Create your account' : 'Login in to your Account!'}
                </p>

                <form onSubmit={onSubmitHandler}>

                    {state === 'Sign Up' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-md bg-[#333A5C]'>
                        <img src={assets.person_icon} alt="" />
                        <input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className='bg-transparent outline-none' type="text" placeholder="Full Name" required />
                    </div>)}

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-md bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="" />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none' type="email" placeholder="Your Email" required />
                    </div>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-md bg-[#333A5C]'>
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none' type="password" placeholder="Your Password" required />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className='mb-4 text-sky-500 cursor-pointer'>Forgot password? <span className='text-red-500'>Reset here</span> </p >

                    <button className='w-full py-2.5 rounded-md bg-gradient-to-r from-pink-400 to-sky-600 text-white font-medium'>{state}</button>
                </form>
                {state === 'Sign Up' ? (<p className='text-gray-400 text-centre sm:text-md text-xl mt-4'>
                    Already have an account?{''}
                    <span onClick={() => setState('Login')}
                        className='text-red-500 cursor-pointer underline'> Login</span>
                </p>) : (<p className='text-gray-400 text-centre sm:text-md text-xl mt-4'>
                    Don't have an account?{''}
                    <span onClick={() => setState('Sign Up')} className='text-green-400 cursor-pointer underline'> Sign Up</span>
                </p>
                )}



            </div>
        </div>
    )
}

export default Login
