import React, { useContext, useState, useEffect } from 'react';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const { userData } = useContext(AppContent);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [userData]);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <h1 className='text-2xl font-semibold text-indigo-500'>Loading...</h1>
            </div>
        );
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-[url("/laptop.jpg")] bg-cover bg-center cursor-pointer'>
            <div className='bg-gradient-to-br from-black via-green-700 to-emerald-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-blue-300 text-sm'>
                <h2 className='text-3xl font-semibold text-sky-500 text-center mb-3 underline'>
                    Your profile
                </h2>
                <p className='text-center text-white text-md mb-6'>
                    This is your profile information.
                </p>

                <form>
                    <label htmlFor="name" className='text-md  font-semibold text-white'>Your Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Your Name'
                        value={userData?.name || ''}
                        readOnly
                        className='mb-4 flex items-center font-bold gap-3 w-full px-5 py-2.5 rounded-md bg-transparent'
                    />

                    <label htmlFor="email" className='text-md text-white font-semibold'>Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Your Email'
                        value={userData?.email}
                        readOnly
                        className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-md bg-transparent'
                    />

                    <label htmlFor="Email Verification" className='text-md text-white font-semibold'>Email Verification</label>
                    <input
                        type="text"
                        id="verification"
                        placeholder='Account Verified'
                        value={userData?.isAccountVerified}
                        readOnly
                        className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-md bg-transparent'
                    />
                    <button onClick={() => navigate('/menu')} className='ml-16 px-14 py-2 text-md  text-white bg-gray-500 rounded-md hover:bg-orange-400'>Close</button >
                </form>
            </div>
        </div>
    );
};

export default MyProfile;
