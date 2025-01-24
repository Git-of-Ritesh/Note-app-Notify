import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/CreateNote'

const Home = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
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