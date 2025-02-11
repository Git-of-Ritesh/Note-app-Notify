import React, { useState } from 'react'
import { RiDeleteBin5Line } from "react-icons/ri"
import logo from '../../assets/logo/logo.png'
import profile from '../../assets/logo/profile/Profile.jpeg'
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BsPinAngle } from "react-icons/bs";
import { LuNotebookText } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { FiLogOut, FiSettings, FiLock, FiStar, FiBookOpen, FiBookmark, FiTrash2 } from "react-icons/fi";




const Sidebar = ({ userInfo, getAllNotes, getPinnedNotes }) => {

    const [activeTab, setActiveTab] = useState("all")
    const [dropdownOpen, setDropdownOpen] = useState(false);


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
        <aside className="h-full bg-zinc-100 w-14 flex flex-col p-2 border-r border-gray-300 justify-between">

            <div className='space-y-8'>
                {/* side bar logo */}
                <div className="">
                    <img src={logo} alt="Logo" className="w-12" />
                </div>


                <div className="flex flex-col gap-0">
                    <button className={`flex items-center justify-center  px-2 py-2 font-semibold rounded-lg transition-all ${activeTab === "all" ? "bg-gray-950 text-white" : "bg-transparent text-[#575656] hover:bg-gray-200 "}`}
                        onClick={() => {
                            setActiveTab("all");
                            getAllNotes();
                        }}>
                        <FiBookOpen className='size-4' /></button>

                    <button className={`flex items-center justify-center  px-2 py-2  rounded-lg transition-all ${activeTab === "Pinned" ? "bg-gray-950 text-white" : "bg-transparent text-[#575656] hover:bg-gray-200 "}`}
                        onClick={() => {
                            setActiveTab("Pinned");
                            getPinnedNotes();
                        }}
                    ><FiBookmark className='size-4' /></button>

                    <button className='flex items-center justify-center gap-5 w-full px-2 py-2 font-semibold text-sm text-[#575656] bg-transparent hover:bg-gray-200 rounded-lg transition-all'><FiTrash2 className='size-4' /></button>

                </div>

            </div>





            {/* user icon */}
            <div className="relative">
                <div
                    className="flex items-center gap-3  rounded-md cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <img src={profile} alt="profile" className="w-14 h-8 rounded-md object-cover" />
                </div>

                {dropdownOpen && (
                    <div className="absolute left-6 bottom-8 w-52 bg-white shadow-lg rounded-xl p-1 border border-gray-200 z-50">

                        <div className='flex justify-start p-2 items-center gap-2 mb-1 '>
                            <img src={profile} alt="profile" className="w-10 h-9 rounded-md object-cover" />
                            <div className='flex flex-col'>
                                <span className="font-medium text-gray-700">{userInfo?.username}</span>
                                <span className="font-normal text-xs -mt-1 text-gray-950">a@gamil.com</span>
                            </div>
                        </div>

                        <hr className='border-gray-100' />

                        <div className='flex flex-col gap-0'>

                            <button className='flex items-center gap-3 w-full px-2 py-2 text-sm font-normal text-gray-950 bg-transparent hover:bg-gray-100 rounded-lg transition-all '><FiSettings className='size-4' />Settings</button>

                            <button className='flex items-center gap-3 w-full px-2 py-2 text-sm font-normal text-gray-950 bg-transparent hover:bg-gray-100 rounded-lg transition-all '><FiLock className='size-4' />Privacy</button>

                            <button className='flex items-center gap-3 w-full px-2 py-2 text-sm font-normal text-gray-950 bg-transparent hover:bg-gray-100 rounded-lg transition-all'><FiStar className='size-4' />What's New</button>
                        </div>

                        <hr className='border-gray-100' />

                        <button
                            className="flex items-center gap-3 w-full px-2 py-2 text-sm font-normal rounded-lg text-gray-950 hover:bg-gray-100 transition"
                            onClick={onLogOut}
                        >
                            <FiLogOut className='size-4' />
                            Log out
                        </button>
                    </div>
                )}
            </div>


            {/* <div className=' flex flex-col border-[0.5px] border-[#000000] rounded-2xl px-2 py-3 gap-1'>
                    <div className='flex justify-start gap-2 items-center'>
                        <img src={profile} alt="profile" className='w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform' />

                        <span className='font-instumrntalSans font-semibold'>{userInfo?.username}</span>
                    </div>
                    <button className='flex justify-between bg-[#F8A025] rounded-xl p-1 px-3 font-instumrntalSans' onClick={onLogOut} >Logout <HiOutlineLogout className='size-6' /></button>
                </div> */}
        </aside>
    )
}

export default Sidebar