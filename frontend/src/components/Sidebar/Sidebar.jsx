import React, { useState, useEffect, useRef } from 'react'
import logo from '../../assets/logo/logo4.png'
import profile from '../../assets/logo/profile/Profile2.jpg'
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FiLogOut, FiSettings, FiLock, FiStar, FiBookOpen, FiBookmark, FiTrash2 } from "react-icons/fi";




const Sidebar = ({ userInfo, getAllNotes, getTrashNotes, getPinnedNotes, setActiveTab, openSidebarMobile}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleDropdownOpen = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setDropdownOpen(false);
            }   
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [])


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogOut = async () => {
        try {
            dispatch(signOutStart())

            const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
            const res = await axios.post(
                `${import.meta.env.VITE_API_BACKENDBASE_URL}/api/auth/signout`,
                {}, // Empty body
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }// Config object
                });

            if (res.data.success === false) {
                dispatch(signOutFailure(res.data.message))
            }

            dispatch(signOutSuccess())
            // Show success toast, then navigate after a short delay
            toast('Logout Successfully  👍', {
                className: "w-[350px] rounded-2xl bg-white/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
                hideProgressBar: true,
                onClose: () => navigate('/Login'),
                autoClose: 600,// Toast duration (adjust as needed)
            });
            sessionStorage.removeItem('authToken'); // Remove token from session storage

        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
    }

    return (
        <aside className="h-full bg-zinc-100 w-56 sm:w-14 flex flex-col p-2 border-r border-gray-300 justify-between">

            <div className='space-y-8'>
                {/* side bar logo */}
                <div className="flex mt-3 gap-x-3 items-center sm:justify-center">
                    <img src={logo} alt="Logo" className="w-7 sm:w-8 rounded-lg" />
                    <h1 className='block sm:hidden'>Notify</h1>
                </div>


                <div className="flex flex-col gap-0">
                    <button className="relative group flex items-center sm:justify-center  px-2 py-2 font-semibold rounded-lg bg-transparent text-[#575656] hover:bg-gray-200 transition-all"
                        onClick={() => {
                            setActiveTab("all");
                            getAllNotes();
                        }}><div className="absolute left-full top-1/2 ml-2 w-20 text-sm font-normal z-50 bg-gray-950 border text-gray-50 p-1 rounded-lg shadow-lg opacity-0 translate-x-2 sm:group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 -translate-y-1/2 pointer-events-none">
                            All notes
                        </div>
                        <FiBookOpen className='size-4' />
                        <p className='block sm:hidden ml-6 text-sm font-normal'>All notes</p></button>


                    <button className="relative group flex items-center sm:justify-center  px-2 py-2  rounded-lg bg-transparent text-[#575656] hover:bg-gray-200 transition-all"
                        onClick={() => {
                            setActiveTab("pinned");
                            getPinnedNotes();
                        }}
                    ><div className="absolute left-full top-1/2 ml-2 w-20 text-sm font-normal z-50 bg-gray-950 border text-gray-50 p-1 rounded-lg shadow-lg opacity-0 translate-x-2 sm:group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 -translate-y-1/2 pointer-events-none">
                            Pinned
                        </div>
                        <FiBookmark className='size-4' />
                        <p className='block sm:hidden ml-6 text-sm font-normal'>Pinned Notes</p></button>

                    <button className='relative group flex items-center sm:justify-center w-full px-2 py-2 font-semibold text-sm text-[#575656] bg-transparent hover:bg-gray-200 rounded-lg transition-all'
                        onClick={() => {
                            setActiveTab("trash");
                            getTrashNotes();
                        }}>
                        <div className='absolute left-full top-1/2 ml-2 w-20 text-sm font-normal z-50 bg-gray-950 border text-gray-50 p-1 rounded-lg shadow-lg opacity-0 translate-x-2 sm:group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 -translate-y-1/2 pointer-events-none' >Trash</div>
                        <FiTrash2 className='size-4' />
                        <p className='block sm:hidden ml-6 text-sm font-normal'>Trash Notes</p></button>

                </div>

            </div>





            {/* user icon */}
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center gap-3  rounded-md cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => {handleDropdownOpen()
                    }}              
                >
                    <img src={profile} alt="profile" className="w-10 h-8 rounded-md object-cover" />
                    <div className='flex flex-col sm:hidden'>
                        <span className="font-medium text-gray-700">{userInfo?.username}</span>
                        <span className="font-normal text-xs -mt-1 text-gray-950">{userInfo?.email}</span>
                    </div>
                </div>

                {dropdownOpen && (
                    <div className="absolute left-6 bottom-8 w-52 bg-white shadow-lg rounded-xl p-1 border border-gray-200 z-50">

                        <div className='flex justify-start p-2 items-center gap-2 mb-1 '>
                            <img src={profile} alt="profile" className="w-10 h-9 rounded-md object-cover" />
                            <div className='flex flex-col'>
                                <span className="font-medium text-gray-700">{userInfo?.username}</span>
                                <span className="font-normal text-xs -mt-1 text-gray-950">{userInfo.email}</span>
                            </div>
                        </div>

                        <hr className='border-gray-100 my-1' />

                        <div className='flex flex-col gap-0'>

                            <button className='flex items-center gap-3 w-full px-2 py-2 text-sm font-normal text-gray-950 bg-transparent hover:bg-gray-100 rounded-md transition-all '><FiSettings className='size-4' />Settings</button>

                            <button className='flex items-center gap-3 w-full px-2 py-2 text-sm font-normal text-gray-950 bg-transparent hover:bg-gray-100 rounded-md transition-all '><FiLock className='size-4' />Privacy</button>

                            <button className='flex items-center gap-3 w-full px-2 py-2 text-sm font-normal text-gray-950 bg-transparent hover:bg-gray-100 rounded-md transition-all'><FiStar className='size-4' />What's New</button>
                        </div>

                        <hr className='border-gray-100 my-1' />

                        <button
                            className="flex items-center gap-3 w-full px-2 py-2 text-sm font-normal rounded-md text-gray-950 hover:bg-gray-100 transition"
                            onClick={onLogOut}
                        >
                            <FiLogOut className='size-4' />
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar