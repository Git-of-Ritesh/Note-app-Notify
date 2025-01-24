import React from 'react'
import { FiPlus } from "react-icons/fi"
import Notecard from '../Notecard/Notecard'

const Notespage = () => {
  return (
    <div className='w-6/12 h-screen'>
        <div className='flex gap-28 mt-5'>
            <h1 className='font-instumrntalSans font-bold text-4xl ml-3'>Notes</h1>
            <button className='flex items-center gap-2 shadow-md drop-shadow-lg bg-my-yellow text-white font-bold py-2 px-4 rounded-2xl'><FiPlus />New Note</button>
        </div>

        <div className='flex flex-col overflow-y-auto h-[calc(100vh-100px)] mt-3 pb-20 pr-5'>
           <Notecard/>
           <Notecard/>
           <Notecard/>
           <Notecard/>
           <Notecard/>
           <Notecard/>
           <Notecard/>
           <Notecard/>
        </div>
    </div>
  )
}

export default Notespage