import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi"
import Notecard from '../Notecard/Notecard'
import axios from 'axios'
import Searchbar from '../searchbar/searchbar'


const Notespage = ({getAllNotes, getTrashNotes, onNewNote, allNotes, isCreateOpen, onEditNote, closeEditor, activeTab }) => {
  const [searchQuery, setSearchQuery] = useState("")

  // filter notes by search query
  const filteredNotes = allNotes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))

  // Rendering tabs
  const renderTabs = () => {
    if(activeTab === 'all'){
      return <p>All Notes</p>; 
    }
    else if(activeTab === 'pinned'){
      return <p>Pinned Notes</p>
    }
    else if(activeTab === 'trash'){
      return <p>Trash Notes</p>
    }
    else {
      return <p>All Notes</p>
    }
  }

  //delete note
  const trashNote = async (noteId) => {

    try {
      const res = await axios.put(`http://localhost:3000/api/note/move-to-trash/${noteId}`,{}, {withCredentials: true})
      
      if (res.data.success === false) {
        console.log(res.data.message)
        return
      }

      await getAllNotes()
      if(isCreateOpen){
        closeEditor()
      }

    } catch (error) {
      console.log(error.message)  
    }
  }

  const restoreNote = async (noteId) => {

    try {
      const res = await axios.put(`http://localhost:3000/api/note/restore-note/${noteId}`,{}, {withCredentials: true})
      
      if (res.data.success === false) {
        console.log(res.data.message)
        return
      }

      await getTrashNotes()
      if(isCreateOpen){
        closeEditor()
      }

    } catch (error) {
      console.log(error.message)  
    }
  }

  const deleteNote = async (noteId) => {

    try {
      const res = await axios.delete(`http://localhost:3000/api/note/delete-note/${noteId}`,{withCredentials: true})
      
      if (res.data.success === false) {
        console.log(res.data.message)
        return
      }

      await getTrashNotes()
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
          <h1 className='font-instumrntalSans font-normal text-lg'>{renderTabs()}</h1>
          <button
            onClick={onNewNote}
            className='flex items-center gap-2 shadow-md bg-gray-950 text-white text-xs font-light py-1 px-2 rounded-lg'><FiPlus />New Note</button>
        </div>

        <Searchbar setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>

      </div>



      <div className="content-start flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-100px)] gap-x-2">
      {filteredNotes.length > 0 ? (
      filteredNotes.map((note, index) =>(
        // {allNotes.map((note, index) => (
          <Notecard
            key={note._id}
            title={note.title}
            date={note.createdAt}
            content={note.content}
            tags={note.tags}
            isPinned={note.isPinned}
            onClick={()=> onEditNote(note)}
            onTrash={()=>trashNote(note._id)}
            onDelete={()=>deleteNote(note._id) }
            onRestore={()=>restoreNote(note._id)}
            activeTab={activeTab}
          />
        ))) : (<p className="text-gray-500 text-center">No matching notes found.</p>)}
      </div>
    </div>
  )
}

export default Notespage