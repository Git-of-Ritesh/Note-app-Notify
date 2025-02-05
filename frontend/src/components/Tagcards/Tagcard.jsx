import React from 'react'

const Tagcard = ({isSelected}) => {
  return (
    <div className={`px-2 w-fit rounded-md ${isSelected? "bg-white text-black" : "bg-[#6C6B6B] text-white" }`}>#Work</div>
  )
}

export default Tagcard