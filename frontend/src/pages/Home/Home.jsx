import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
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
    <div className='flex bg-[#FFECD1] px-4 pt-4 flex-col h-screen'>
      <div className='flex h-screen gap-3 overflow-hidden'>
        <div className='pb-4'>
          <Sidebar userInfo={userInfo} />
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