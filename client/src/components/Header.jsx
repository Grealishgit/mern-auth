import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()
    const { userData, setIsLoggedin } = useContext(AppContent)

    return (
        <div className='flex flex-col bg-gradient-to-r from-green-400 via-teal-700 to-emerald-800 rounded-lg items-center mt-20 px-4 text-center text-gray-800'>
            <img src={assets.header_img} alt=""
                className='w-36 h-36 mt-4 rounded-full mb-6' />

            <h1 className='flex items-center font-bold gap-2 text-xl sm:text-3xl'>
                Hey <span className='text-white font-semibold'>{userData ? userData.name : 'Developer'}</span>!
                <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
            </h1>

            <h2 className='text-3xl text-orange-700 sm:text-5xl font-semibold mb-4'>
                Welcome to TutoPoint.
            </h2>

            <p className='mb-8 text-white max-w-md'>
                Lets start with a quick tour and we will get you started with TutoPoint, meanwhile ,
                you can explore the features and tools we have to offer.
            </p>
            {userData &&
                <button onClick={() => navigate('/menu')} className='border border-gray-700 mb-4 rounded-md px-8 py-2.5 hover:bg-orange-300 transition-all'>
                    Get Started
                </button>

            }
        </div>
    )
}

export default Header
