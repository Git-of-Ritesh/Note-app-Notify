import React, { useState } from 'react'
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
import { BiCategory } from "react-icons/bi";
import { LiaHashtagSolid } from "react-icons/lia";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";


const Sidebar = ({userInfo}) => {

    const [categoryisOpen, setCategoryIsOpen] = useState(false);
    const [tagisOpen, setTagIsOpen] = useState(false);
    
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


                <div className="flex flex-col gap-1">
                    <button className='flex items-center gap-5 w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all '><LuNotebookText className='size-5' />All notes</button>

                    <button className='flex items-center gap-5 w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all'><BsPinAngle className='size-5' strokeWidth={0.5} />Pinned notes</button>

                    <button className='flex items-center gap-5 w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all'><RiDeleteBin5Line className='size-5' />Deleted notes</button>

                    {/* drop down  */}

                    <div className=" relative w-full">
                        {/* Main Button */}
                        <button
                            className="flex items-center justify-between w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all"
                            onClick={() => setCategoryIsOpen(!categoryisOpen)}
                        >
                            <div className="flex items-center gap-5">
                                <BiCategory
                                    className="size-5" />
                                Categories
                            </div>
                            {categoryisOpen ? <FiChevronUp className="size-5" /> : <FiChevronDown className="size-5" />}
                        </button>

                        {/* Dropdown Menu */}
                        {categoryisOpen && (
                            <div className="absolute w-full z-50 bg-white shadow-lg rounded-lg px-2">
                                {[
                                    { name: "Work", color: "bg-blue-500" },
                                    { name: "Personal", color: "bg-green-500" },
                                    { name: "Ideas", color: "bg-yellow-500" }
                                ].map((category) => (
                                    <div key={category.name} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-all">
                                        <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                                        <span className="text-[#575656] font-medium">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* tags */}

                    <div className="relative w-full">
                        {/* Main Button */}
                        <button
                            className="flex items-center justify-between w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all"
                            onClick={() => setTagIsOpen(!tagisOpen)}
                        >
                            <div className="flex items-center gap-5">
                                <LiaHashtagSolid
                                    className="size-5" />
                                Tags
                            </div>
                            {tagisOpen ? <FiChevronUp className="size-5" /> : <FiChevronDown className="size-5" />}
                        </button>

                        {/* Dropdown Menu */}
                        {tagisOpen && (
                            <div className="absolute w-full z-40 bg-white shadow-lg rounded-lg px-2">
                                {[
                                    { name: "#Work" },
                                    { name: "#Personal" },
                                    { name: "#Ideas" }
                                ].map((category) => (
                                    <div key={category.name} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-all">
                                        <span className="text-[#575656] font-medium">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>




            <div className='space-y-8'>
                <div className='flex flex-col gap-1'>
                    <hr />
                    <button className='flex items-center gap-5 w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all '><AiOutlineSetting className='size-5' />Settings</button>

                    <button className='flex items-center gap-5 w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all '><MdOutlinePrivacyTip className='size-5' />Privacy policy</button>

                    <button className='flex items-center gap-5 w-full px-2 py-2 font-semibold text-[#575656] bg-transparent hover:bg-gray-100 rounded-lg transition-all'><MdOutlineWbIncandescent className='size-5' />What's new</button>
                </div>

                <div className=' flex flex-col border-[0.5px] border-[#000000] rounded-2xl px-2 py-3 gap-1'>
                    <div className='flex justify-start gap-2 items-center'>
                        <img src={profile} alt="profile" className='w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform' />

                        <span className='font-instumrntalSans font-semibold'>{userInfo?.username}</span>
                    </div>
                    <button className='flex justify-between bg-[#F8A025] rounded-xl p-1 px-3 font-instumrntalSans' onClick={onLogOut} >Logout <HiOutlineLogout className='size-6' /></button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar