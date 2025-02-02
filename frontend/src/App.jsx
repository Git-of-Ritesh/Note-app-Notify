import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login/Login'
import Signup from './pages/Home/Signup/Signup'
import Practice from './pages/Home/Practice/Practice'

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/practice' element={<Practice/>}/>
  </Routes>
  </BrowserRouter>
}

export default App