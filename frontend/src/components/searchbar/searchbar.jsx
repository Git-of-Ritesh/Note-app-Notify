import React from 'react'
import {SlMagnifier} from 'react-icons/sl'

const searchbar = () => {
  return (
    <div className='flex justify-end space-x-2 w-full h-12 pr-4 p-1  bg-white border-slate-400 border rounded-3xl drop-shadow-md shadow-xl'>
      <SlMagnifier className='size-5 mt-2 ' />
      <input className='w-7/12 ' type='text' placeholder='Search notes' />
    </div>
  )
}

export default searchbar