import React from 'react'

const Notecard = ({title, content, date, isPinned}) => {
    return (
        <div>
            <div className='flex justify-between flex-col bg-my-grey w-full h-36 rounded-3xl p-4 mt-3'>
                <h1 className='font-bold'>{title}</h1>
                <p className='text-sm opacity-65'>{content?.slice(0, 150)}</p>
                <h3 className='text-sm font-semibold opacity-80'>{date}</h3>
            </div>
        </div>
    )
}

export default Notecard