import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/NoteEditor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../../assets/logo/logo4.png'

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
  const [activeTab, setActiveTab] = useState('all')

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
      const res = await axios.get(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/all`, { withCredentials: true })

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

//get trash notes
  const getTrashNotes = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/trash`, { withCredentials: true })

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
  const getPinnedNotes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/pinned`, { withCredentials: true })

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

  return (
    <div className='bg-gray-50 w-screen h-screen'>
      <div className='flex w-full h-full overflow-hidden'>
        <div>
          <Sidebar getAllNotes={getAllNotes} getTrashNotes={getTrashNotes} userInfo={userInfo} getPinnedNotes={getPinnedNotes} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className={`transition-all duration-[0.4s] ease-in-out ${noteOpen ? "max-w-[400px]" : "max-w-[0px]"}`}>
          <Notespage allNotes={allNotes} onNewNote={() => handleOpenEditor()} onEditNote={handleOpenEditor} isCreateOpen={isCreateOpen} getAllNotes={getAllNotes} getTrashNotes={getTrashNotes} closeEditor={() => { setIsCreateOpen(false) }} activeTab={activeTab} noteOpen={noteOpen} />
        </div>

        <div className={`w-full h-full p-7 transition-all ${isCreateOpen ? 'hidden' : 'block'}`}>
          <div className='flex flex-col h-full justify-center items-center '>

            <div className='flex justify-center items-center size-28 rounded-xl shadow-lg drop-shadow-lg border'>
              <div className='flex justify-center items-center size-20 rounded-xl shadow-xl drop-shadow-lg border'>
                <img className='size-14 rounded-xl shadow-xl drop-shadow-lg ' src={logo} alt="" />
              </div>
            </div>

            <h1 className='font-semibold text-4xl mt-6'>Think, Memorize and Write</h1>
            <h3 className='font-medium text-3xl mt-3 text-gray-500'>all in one place</h3>
          </div>
        </div>

        <div className={`w-full pb-0 transition-all ${isCreateOpen ? 'block' : 'hidden'}`}>
          <CreateNote onClose={() => { setIsCreateOpen(false); setSelectedNote(null); }} getAllNotes={getAllNotes} selectedNote={selectedNote} noteClose={() => { setNoteOpen(!noteOpen) }} activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}

export default Home