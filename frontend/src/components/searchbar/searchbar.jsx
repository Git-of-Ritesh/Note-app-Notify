import React from 'react'
import {SlMagnifier} from 'react-icons/sl'

const searchbar = ({isCreateOpen}) => {
  return (
    <div className={`flex justify-end space-x-2 h-12 pr-4 p-1  bg-white border-slate-400 border rounded-3xl drop-shadow-md shadow-xl ${isCreateOpen ? 'w-96' : 'w-1/2'}`}>
      <SlMagnifier className='size-5 mt-2 ' />
      <input className='w-7/12 ' type='text' placeholder='Search notes' />
    </div>
  )
}

export default searchbar