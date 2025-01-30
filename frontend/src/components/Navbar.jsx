import React from 'react'
import logo from '../assets/logo/logo.png'
import Searchbar from './searchbar/searchbar'
import { SlTag } from 'react-icons/sl'
import { CiImport } from "react-icons/ci"
import { RiMenu2Fill } from "react-icons/ri"
import profile from '../assets/logo/profile/Profile.jpeg'
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogOut = async() => {
    try{
      dispatch(signOutStart())

      const res = await axios.get("http://localhost:3000/api/auth/signout", {withCredentials: true})

      if(res.data.success === false){
        dispatch(signOutFailure(res.data.message))
      }

      dispatch(signOutSuccess())
      navigate('/Login')

    }catch(error){
      dispatch(signOutFailure(error.message))
    }
  }

  return (
    <nav className="flex justify-between items-center bg-white text-black p-3">
      <div className='flex items-center justify-between w-2/5'>
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <span className="-ml-1 text-3xl font-bold font-Logo">Notetify</span>
        </div>

        {/*search bar*/}
        <Searchbar />
      </div>


      <div className='flex items-center w-2/4 justify-between'>
        <div className='flex space-x-14'>
          <SlTag className='size-5' />
          <CiImport className='size-6' />
        </div>
        <div className='flex items-center space-x-6'>
          <button className='bg-rose-700 p-2 text-white rounded-lg' onClick={onLogOut}>logout</button>
          <RiMenu2Fill className='size-6'/>
          <div>
            <img src={profile} alt="profile" className='w-12 h-12 rounded-full border-2 border-white object-cover cursor-pointer hover:scale-110 transition-transform' />
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar