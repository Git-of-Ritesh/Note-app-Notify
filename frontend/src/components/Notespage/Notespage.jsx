import React from 'react'
import { FiPlus } from "react-icons/fi"

const Notespage = () => {
  return (
    <div className='w-7/12'>
        <div className='flex gap-28 mt-5'>
            <h1 className='font-instumrntalSans font-bold text-4xl ml-3'>Notes</h1>
            <button className='flex items-center gap-2 shadow-md drop-shadow-lg bg-my-yellow text-white font-bold py-2 px-4 rounded-2xl'><FiPlus />New Note</button>
        </div>

        <div>
            <div className='flex flex-col bg-my-grey w-fit rounded-3xl p-3 mt-3'>
                <h1>Project of web</h1>
                <p>Here is the para you want to write it in here is dispalyed here w whis is the world is her</p>
                <h3>10 min</h3>
            </div>

        </div>
    </div>
  )
}

export default Notespage