import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi"
import Notecard from '../Notecard/Notecard'


const Notespage = ({ onNewNote, allNotes, isCreateOpen, onEditNote, selectedNote }) => {


  return (
    <div className='w-full h-screen px-0'>

      <div className='flex flex-col w-96 justify-between '>

        <div className='flex w-96 gap-5 mt-5'>
          <h1 className='font-instumrntalSans font-semibold text-4xl ml-3'>Notes</h1>
          <button
            onClick={onNewNote}
            className='flex items-center gap-2 shadow-md drop-shadow-lg bg-my-yellow text-white font-bold py-2 px-4 rounded-2xl'><FiPlus />New Note</button>
        </div>

      </div>



      <div className={`content-start flex overflow-y-auto w-full h-[calc(100vh-100px)] mt-3 gap-x-2  ${isCreateOpen ? 'flex-col' : 'flex-row flex-wrap'}`}>
        {allNotes.map((note, index) => (
          <Notecard
            key={note._id}
            title={note.title}
            date={note.createdAt}
            content={note.content}
            isSelected={selectedNote?._id === note._id}
            onClick={()=> onEditNote(note)}
          />
        ))}
      </div>
    </div>
  )
}

export default Notespage