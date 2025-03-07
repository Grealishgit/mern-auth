import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'



const ResetPassword = () => {

    const { backendUrl } = useContext(AppContent)
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isEmailSent, setIsEmailSent] = useState('')
    const [otp, setOtp] = useState(0)
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

    const inputRefs = React.useRef([])
    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })
    }

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp',
                { email })
            if (data.success) {
                toast.success(data.message);
                setIsEmailSent(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value)
        setOtp(otpArray.join(''))
        setIsOtpSubmitted(true)
    }

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
                email,
                otp,
                newPassword,
            });
            if (data.success) {
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errorMessage =
                toast.error(errorMessage);
        }
    };


    return (
        <div className='flex items-center justify-center min-h-screen  bg-gradient-to-br from-sky-600 to-pink-400'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

            {!isEmailSent &&

                <form onSubmit={onSubmitEmail}
                    className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-sky-500 text-2xl font-semibold text-center mb-4'>Reset Your Password</h1>
                    <p className='text-center mb-6 text-indigo-300'>Enter your registered email address </p>
                    <div className='mb-4 flex gap-3  w-full px-5 py-2.5 rounded-md bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="" />
                        <input type="text" placeholder='Your Registered Email.'
                            className='bg-transparent outline-none text-white'
                            value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button className='w-full py-2.5 bg-gradient-to-r from-sky-500 to-pink-400 text-white rounded-md mt-3
                hover:from-indigo-500 hover:to-indigo-900 transition-all duration-700'>Submit</button>
                </form>
            }

            {/*OTP FORM */}
            {!isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-sky-500 text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
                    <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit OTP code sent to your email to reset your password</p>
                    <div className='flex justify-between mb-8' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input type="text" maxLength='1' key={index} required
                                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                                ref={e => inputRefs.current[index] = e}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}

                    </div>
                    <button className='w-full py-2.5 bg-gradient-to-r from-pink-400 to-sky-600 text-white rounded-md 
                hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-900 transition-all duration-700'>Submit</button>
                </form>
            }

            {/*new password */}
            {isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-sky-500 text-2xl font-semibold text-center mb-4'>Enter Your New Password</h1>
                    <p className='text-center mb-6 text-indigo-300'>Enter new password belowaddress </p>
                    <div className='mb-4 flex gap-3  w-full px-5 py-2.5 rounded-md bg-[#333A5C]'>
                        <img src={assets.lock_icon} alt="" />
                        <input type="password" placeholder='Your New Password.'
                            className='bg-transparent outline-none text-white'
                            value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <button className='w-full py-2.5 bg-gradient-to-r from-sky-500 to-pink-400 text-white rounded-md mt-3
                hover:from-indigo-500 hover:to-indigo-900 transition-all duration-700'>Submit</button>
                </form>
            }
        </div>
    )
}

export default ResetPassword
