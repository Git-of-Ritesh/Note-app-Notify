import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/CreateNote'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {currentUser, loading, errorDispatch} = useSelector((state) => state.user)

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser == null) {
      navigate('/Login')
    }else{
      setUserInfo(currentUser?.rest)
    }
  })

  return (
    <div className='flex flex-col h-screen'>
      <Navbar userInfo={userInfo}/>
      <div className='flex h-screen overflow-hidden'>
        <div>
          <Sidebar />
        </div>

        <div>
          <Notespage onNewNote={() => setIsCreateOpen(true)} />
        </div>

        <div className={`w-full transition-all ${isCreateOpen ? 'block' : 'hidden'}`}>
          <CreateNote onClose={() => setIsCreateOpen(false) }/>
        </div>
      </div>
    </div>
  )
}

export default Home