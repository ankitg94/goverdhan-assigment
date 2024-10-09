import React from 'react'

import { Route,Routes } from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import Profile from './Pages/Profile'
import Message from './Pages/Meassage'
const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<RegisterForm/>}/>
    <Route path="/login" element ={<LoginForm/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path='/message' element={<Message/>}/>
    </Routes>
      
    </>
  )
}

export default App
