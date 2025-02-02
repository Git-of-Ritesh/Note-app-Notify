import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri"
import logo from '../../assets/logo/logo.png'
import profile from '../../assets/logo/profile/Profile.jpeg'
import { HiOutlineLogout } from "react-icons/hi";
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BsPinAngle } from "react-icons/bs";
import { LuNotebookText } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineWbIncandescent } from "react-icons/md";


const Sidebar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogOut = async () => {
        try {
            dispatch(signOutStart())

            const res = await axios.get("http://localhost:3000/api/auth/signout", { withCredentials: true })

            if (res.data.success === false) {
                dispatch(signOutFailure(res.data.message))
            }

            dispatch(signOutSuccess())
            navigate('/Login')

        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
    }

    return (
        <aside className="h-full bg-white w-56 flex flex-col p-5 rounded-3xl justify-between">

            <div className='space-y-8'>
                {/* side bar logo */}
                <div className="flex items-center justify-center">
                    <img src={logo} alt="Logo" className="-ml-5 size-16" />
                    <span className="-ml-4 text-3xl font-normal font-Logo">otetify</span>
                </div>


                <div className="flex flex-col gap-3">
                    <button className='flex items-center gap-5 font-instumrntalSans font-semibold text-[#575656] '><LuNotebookText className='size-5' />All notes</button>
                    <button className='flex items-center gap-5 font-instumrntalSans font-semibold text-[#575656] '><BsPinAngle className='size-5' strokeWidth={0.5} />Pinned notes</button>
                    <button className='flex items-center gap-5 font-instumrntalSans font-semibold text-[#575656]'><RiDeleteBin5Line className='size-5' />Deleted notes</button>
                </div>
            </div>


            <div className='space-y-8'>
                <div className='flex flex-col gap-3'>
                    <hr />
                    <button className='flex items-center gap-5 font-instumrntalSans font-semibold text-[#575656] '><AiOutlineSetting className='size-5' />Settings</button>
                    <button className='flex items-center gap-5 font-instumrntalSans font-semibold text-[#575656] '><MdOutlinePrivacyTip className='size-5' />Privacy policy</button>
                    <button className='flex items-center gap-5 font-instumrntalSans font-semibold text-[#575656]'><MdOutlineWbIncandescent className='size-5' />What's new</button>
                </div>

                <div className=' flex flex-col border-[0.5px] border-[#000000] rounded-2xl px-2 py-3 gap-1'>
                    <div className='flex justify-start gap-2 items-center'>
                        <img src={profile} alt="profile" className='w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform' />

                        <span className='font-instumrntalSans font-semibold'>John snow</span>
                    </div>
                    <button className='flex justify-between bg-[#F8A025] rounded-xl p-1 px-3 font-instumrntalSans' onClick={onLogOut} >Logout <HiOutlineLogout className='size-6' /></button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar