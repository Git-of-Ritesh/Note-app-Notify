import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/NoteEditor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const { currentUser, loading, errorDispatch } = useSelector((state) => state.user)

  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
        setAllNotes(res.data.note || [])
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex bg-[#FFECD1] px-4 pt-4 flex-col h-screen'>
      <div className='flex h-screen gap-3 overflow-hidden'>
        <div className='pb-4'>
          <Sidebar userInfo={userInfo} />
        </div>

        <div>
          <Notespage allNotes={allNotes} onNewNote={() => setIsCreateOpen(true)} isCreateOpen={isCreateOpen} />
        </div>

        <div className={`w-full pb-4 transition-all ${isCreateOpen ? 'block' : 'hidden'}`}>
          <CreateNote onClose={() => setIsCreateOpen(false)} />
        </div>
      </div>
    </div>
  )
}

export default Home