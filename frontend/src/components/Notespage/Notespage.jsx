import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi"
import Notecard from '../Notecard/Notecard'
import axios from 'axios'
import Searchbar from '../searchbar/searchbar'


const Notespage = ({getAllNotes, onNewNote, allNotes, isCreateOpen, onEditNote, closeEditor }) => {

  //delete note
  const deleteNote = async (noteId) => {

    try {
      const res = await axios.delete(`http://localhost:3000/api/note/delete-note/${noteId}`, {withCredentials: true})
      
      if (res.data.success === false) {
        console.log(res.data.message)
        return
      }

      getAllNotes()
      if(isCreateOpen){
        closeEditor()
      }

    } catch (error) {
      console.log(error.message)  
    }
  }


  return (
    <div className='w-80 h-screen border-r'>

      <div className='flex flex-col w-full border-b justify-between gap-y-3 p-4'>

        <div className='flex w-full justify-between'>
          <h1 className='font-instumrntalSans font-normal text-lg'>All Notes</h1>
          <button
            onClick={onNewNote}
            className='flex items-center gap-2 shadow-md bg-gray-950 text-white text-xs font-light py-1 px-2 rounded-lg'><FiPlus />New Note</button>
        </div>

        <Searchbar/>

      </div>



      <div className="content-start flex flex-col overflow-y-auto w-full h-[calc(100vh-100px)] gap-x-2">
        {allNotes.map((note, index) => (
          <Notecard
            key={note._id}
            title={note.title}
            date={note.createdAt}
            content={note.content}
            tags={note.tags}
            isPinned={note.isPinned}
            onClick={()=> onEditNote(note)}
            onDelete={()=>deleteNote(note._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Notespage