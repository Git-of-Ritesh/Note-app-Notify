import React from 'react'
import moment from 'moment'

const Notecard = ({title, content, date, onClick , isSelected}) => {
    return (
        <div className='h-fit' onClick={onClick}>
            <div className={`flex justify-between flex-col w-96 h-36 rounded-3xl p-4 mt-3 ${isSelected? "bg-my-yellow" : "bg-white"} `}>
                <h1 className={`font-bold ${isSelected? "text-white" : "text-black"}`}>{title}</h1>
                <p className={`text-sm/4 ${isSelected? "text-white" : "text-[#6F6F6F]"}`}>{content?.slice(0, 150)}</p>
                <h3 className={`text-sm font-semibold ${isSelected? "text-white" : "text-[#6F6F6F]"}`}>{moment(date).format('L')}</h3>
            </div>
        </div>
    )
}

export default Notecard