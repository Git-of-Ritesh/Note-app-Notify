import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/NoteEditor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const { currentUser, loading, errorDispatch } = useSelector((state) => state.user) // used for current user detail

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteOpen, setNoteOpen] = useState(true);

  const handleOpenEditor = (note = null) => {
    setIsCreateOpen(true);
    setSelectedNote(note);
  }

  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser == null) {
      navigate('/Login')
    } else {
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  }, [])

  // get all notes API
  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", { withCredentials: true })

      if (res.data.success === false) {
        console.log(res.data)
      }
      else {
        setAllNotes(res.data.note.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        // setAllNotes(res.data.note || [])
      }

    } catch (error) {
      console.log(error)
    }
  }

  // pinned notes
  const getPinnedNotes = () => {
    const pinnedNotes = allNotes.filter(note => note.isPinned)
    setAllNotes(pinnedNotes)
  }

  return (
    <div className='bg-gray-50 w-screen h-screen'>
      <div className='flex w-full h-full overflow-hidden'>
        <div>
          <Sidebar getAllNotes={getAllNotes} userInfo={userInfo} getPinnedNotes={getPinnedNotes} />
        </div>

        <div className={`transition-all duration-700 ease-in-out ${noteOpen ? "max-w-[400px]" : "max-w-0"}`}>
          <Notespage allNotes={allNotes} onNewNote={() => handleOpenEditor()} onEditNote={handleOpenEditor}  isCreateOpen={isCreateOpen} getAllNotes={getAllNotes} closeEditor={() => { setIsCreateOpen(false) }} />
        </div>

        <div className={`w-full pb-4 transition-all ${isCreateOpen ? 'block' : 'hidden'}`}>
          <CreateNote onClose={() => { setIsCreateOpen(false); setSelectedNote(null); }} getAllNotes={getAllNotes} selectedNote={selectedNote} noteClose={() => { setNoteOpen(!noteOpen) }} />
        </div>
      </div>
    </div>
  )
}

export default Home