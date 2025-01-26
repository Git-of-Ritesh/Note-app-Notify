import React from 'react'
import { RiSaveLine } from "react-icons/ri"
import { RxCross2 } from "react-icons/rx"
import { MdOutlineDeleteOutline } from "react-icons/md"

const CreateNote = ({ value, onChange, onClose }) => {

    return (
        <div className='h-screen pl-2'>

            <div className='flex items-center justify-between w-full my-6 gap-4'>

                <button className='flex items-center gap-1 bg-my-grey p-2 px-4 shadow-md drop-shadow-lg rounded-2xl'><RiSaveLine />Save</button>

                <div className='flex items-center gap-2'>
                    <button className='flex items-center '><MdOutlineDeleteOutline className='size-6' /></button>
                    <button onClick={() => { console.log("Close button clicked!"); onClose(); }}><RxCross2 className='size-5' /></button>
                </div>

            </div>

            <div className='flex flex-col gap-4'>

                <input className='text-3xl font-bold my-3 outline-none border-none bg-transparent p-0 focus:ring-0' type="text" placeholder='New Title' autoFocus />

            </div>

            <div className='flex-1 h-[calc(100vh-100px)] overflow-hidden'>

                <textarea className='w-full min-h-[80%] max-h-[90%] overflow-y-auto outline-none border-none bg-transparent p-0 focus:ring-0' placeholder='Write your note here...' />

            </div>

        </div>
    )
}

export default CreateNote