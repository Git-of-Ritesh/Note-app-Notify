import React from 'react'
import {SlMagnifier} from 'react-icons/sl'

const searchbar = () => {
  return (
    <div className="flex items-center gap-5 h-9 px-2 py-1 border mb-3  bg-white rounded-lg shadow-inner ">
      <SlMagnifier className='size-5' />
      <input className='w-full focus:outline-none' type='text' placeholder='Search notes' />
    </div>
  )
}

export default searchbar