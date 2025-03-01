import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Notespage from '../../components/Notespage/Notespage'
import CreateNote from '../../components/Createnotes/NoteEditor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../../assets/logo/logo4.png'
import { Slide, ToastContainer, Zoom} from 'react-toastify'

const Home = () => {

  const { currentUser, loading, errorDispatch } = useSelector((state) => state.user) // used for current user detail

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteOpen, setNoteOpen] = useState(true);
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);


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
      setUserInfo(currentUser?.user)
      getAllNotes()
    }
  }, [])

  const getAllNotes = async () => {
    try {
        const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage

        const res = await axios.get(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (res.data.success === false) {
            console.log(res.data);
        } else {
            setAllNotes(res.data.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }

    } catch (error) {
        console.log('Error fetching notes:', error.message);
    }
};


  //get trash notes
  const getTrashNotes = async () => {
    try {
      const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage

      const res = await axios.get(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/trash`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        });

      if (res.data.success === false) {
        console.log(res.data)
      }
      else {
        setAllNotes(res.data.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        // setAllNotes(res.data.note || [])
      }

    } catch (error) {
      console.log(error)
    }
  }

  // pinned notes
  const getPinnedNotes = async () => {
    try {

      const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
      const res = await axios.get(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/pinned`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        });

      if (res.data.success === false) {
        console.log(res.data)
      }
      else {
        setAllNotes(res.data.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        // setAllNotes(res.data.note || [])
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-white w-screen h-dvh sm:h-screen'>
      <ToastContainer
      position='top-center'
      transition={Slide}
      />
      <div className='flex w-full h-full overflow-hidden'>

        <div className={`transform transition-transform duration-300 absolute sm:relative sm:left-auto left-0 h-full ${openSidebarMobile ? 'z-50  translate-x-0' : '-translate-x-full '} sm:translate-x-0 sm:block`}>
          <Sidebar getAllNotes={getAllNotes} getTrashNotes={getTrashNotes} userInfo={userInfo} getPinnedNotes={getPinnedNotes} activeTab={activeTab} setActiveTab={setActiveTab} openSidebarMobile={openSidebarMobile} />
        </div>

        {openSidebarMobile && <div onClick={() => setOpenSidebarMobile(false)}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 sm:hidden">
        </div>}

        <div className={`transition-all  duration-[0.4s] ease-in-out ${noteOpen ? "max-w-screen sm:max-w-[400px]" : "max-w-[0px]"}`}>
          <Notespage allNotes={allNotes} onNewNote={() => handleOpenEditor()} onEditNote={handleOpenEditor} isCreateOpen={isCreateOpen} getAllNotes={getAllNotes} getTrashNotes={getTrashNotes} closeEditor={() => { setIsCreateOpen(false) }} activeTab={activeTab} noteOpen={noteOpen} setOpenSidebarMobile={setOpenSidebarMobile} />
        </div>

        <div className={`w-full h-full p-7  transition-all ${isCreateOpen ? 'sm:hidden' : 'hidden sm:block'}`}>
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

        <div className={`transition-all duration-300 ease-in-out z-50 ${isCreateOpen ? 'translate-x-0 sm:block' : 'translate-x-full sm:hidden'} fixed top-0 right-0 w-full sm:static sm:translate-x-0 sm:w-full sm:h-full sm:shadow-none sm:transition-none`}
        >
          <CreateNote onClose={() => { setIsCreateOpen(false); setSelectedNote(null); setNoteOpen(true); }} getAllNotes={getAllNotes} selectedNote={selectedNote} noteClose={() => { setNoteOpen(!noteOpen) }} activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}

export default Home