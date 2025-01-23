import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar'
import Notespage from '../../components/Notespage/Notespage'

const Home = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex h-screen'>
        <div>
        <Sidebar />
        </div>     

        <div>
        <Notespage />
        </div> 

      </div>
    </div>
  )
}

export default Home