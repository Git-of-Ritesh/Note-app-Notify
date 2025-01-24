import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi"
import Notecard from '../Notecard/Notecard'

const Notespage = ({onNewNote}) => {

  return (
    <div className='w-96 h-screen'>
        <div className='flex w-full gap-28 mt-5'>
            <h1 className='font-instumrntalSans font-bold text-4xl ml-3'>Notes</h1>
            <button 
            onClick={onNewNote}
            className='flex items-center gap-2 shadow-md drop-shadow-lg bg-my-yellow text-white font-bold py-2 px-4 rounded-2xl'><FiPlus />New Note</button>
        </div>

        <div className='flex flex-col overflow-y-auto h-[calc(100vh-100px)] mt-3 pb-20 pr-3'>
           <Notecard title={"Project of web"} content={"Loren is the key od loren is ithe helping sapce of the owrd inthe art of human world in here in siel in doubt in the world should be writeen her in case o fht higght os sate"} date={"10/12/2024"}/>
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