import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ResetPassword from './Pages/ResetPassword'
import EmailVerify from './Pages/EmailVerify'
import Menu from './Pages/Menu'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MyProfile from './Pages/MyProfile'


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/my-profile' element={<MyProfile />} />
      </Routes>
    </div>
  )
}

export default App
