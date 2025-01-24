import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/CreateNote'

const Home = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex h-screen overflow-hidden'>
        <div>
          <Sidebar />
        </div>

        <div>
          <Notespage />
        </div>

        <div>
          <CreateNote />
        </div>
      </div>
    </div>
  )
}

export default Home