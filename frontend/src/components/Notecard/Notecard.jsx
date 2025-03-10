import React, { useState } from 'react'
import moment from 'moment'
import { AiOutlineDelete } from "react-icons/ai";
import Tagcard from "../Tagcards/Tagcard"
import { TiPinOutline, TiPin } from "react-icons/ti";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { TbRestore } from "react-icons/tb";

const Notecard = ({ title, content, date, tags, isPinned, onClick, onTrash, onDelete, onRestore, activeTab }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const plainText = content.replace(/<[^>]+>/g, "");


    return (
        <div className='sm:w-80 bg-gray-50 w-dvw min-w-0 h-fit border-b group' onClick={onClick}>

            <div className="flex justify-between flex-col sm:hover:bg-gray-100 w-full h-40 p-4">

                <div className='flex flex-col gap-2'>
                    <h1 className="flex items-center justify-between font-normal text-gray-950">{title.length > 24 ? title.slice(0, 24) + '...' : title}
                        <div className='flex items-center gap-x-4'><button>{isPinned ? <TiPin className='size-5' /> : ""}</button>
                            <div className='relative'>
                                <div>
                                    <button className='opacity-0 group-hover:opacity-100' onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }} ><PiDotsThreeOutlineLight /></button>
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute right-0 w-28 gap-1 p-1 bg-white border shadow-md rounded-md">
                                        {(activeTab === 'pinned' || activeTab === 'all') && (
                                            <button className='flex w-full font-light gap-x-2 text-sm items-center p-1 rounded-md hover:bg-gray-100' onClick={(e) => { e.stopPropagation(); onTrash(); }} ><AiOutlineDelete />Trash</button>
                                        )}

                                        {activeTab === 'trash' && (
                                            <>
                                                <button className='flex w-full font-light gap-x-2 text-sm items-center p-1 rounded-md hover:bg-gray-100' onClick={(e) => { e.stopPropagation(); onDelete(); }} ><AiOutlineDelete />Delete</button>
                                                <button className='flex w-full font-light gap-x-2 text-sm items-center p-1 rounded-md hover:bg-gray-100' onClick={(e) => { e.stopPropagation(); onRestore(); }} ><TbRestore />Restore</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </h1>


                    <p className="break-words text-xs text-gray-600">
                        {plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText}
                    </p>
                </div>


                <div className='flex justify-between items-center '>
                    <Tagcard tags={tags} />
                    <h3 className="text-xs font-light text-gray-600">{
                    moment().diff(moment(date), 'seconds') < 10
                        ? "Now"
                        : moment().isSame(moment(date), 'day')
                            ? moment(date).fromNow()
                            : moment().diff(moment(date), 'hours') < 24
                                ? "Yesterday"
                                : moment(date).format("MMMM D, YYYY")
                    }</h3>
                </div>

            </div>
        </div>
    )
}

export default Notecard