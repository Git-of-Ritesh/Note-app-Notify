import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi"
import Notecard from '../Notecard/Notecard'
import Searchbar from '../searchbar/searchbar'

const Notespage = ({ onNewNote, allNotes }) => {


  return (
    <div className='w-96 h-screen px-1'>

      {/*  search bar*/}
      <Searchbar />


      <div className='flex w-full justify-between mt-5'>
        <h1 className='font-instumrntalSans font-semibold text-4xl ml-3'>Notes</h1>
        <button
          onClick={onNewNote}
          className='flex items-center gap-2 shadow-md drop-shadow-lg bg-my-yellow text-white font-bold py-2 px-4 rounded-2xl'><FiPlus />New Note</button>
      </div>

      <div className='flex flex-col overflow-y-auto h-[calc(100vh-100px)] mt-3 pb-20'>
        {allNotes.map((note, index) => (
         <Notecard 
         key={note._id}
         title={note.title}
         date={note.createdAt}
         content={note.content}
         />  
        ))}  
      </div>
    </div>
  )
}

export default Notespage