import React from 'react'
import { HiOutlineTemplate } from "react-icons/hi"
import { TbFileImport } from "react-icons/tb"
import { RiDeleteBin5Line } from "react-icons/ri"
import { BiSupport } from "react-icons/bi"
import { PiNewspaper } from "react-icons/pi"
import { MdOutlinePrivacyTip } from "react-icons/md";

const Sidebar = () => {
    return (
        <aside className="mt-3 h-full w-56 pb-4 flex flex-col justify-between">
            <div className="py-4 px-6 ">
                <a className="flex items-center gap-2 mb-2 font-semibold text-gray-700"><HiOutlineTemplate className='size-5'/>Templates</a>
                <a className="flex items-center gap-2 mb-2 font-semibold text-gray-700"><TbFileImport className='size-5' />Import</a>
                <a className="flex items-center gap-2 mb-2 font-semibold text-gray-700"><RiDeleteBin5Line className='size-5'/>Trash</a>
            </div>

            <div>
                <div className="mt-8 px-6 font-bold text-gray-500">Recently viewed</div>
                <ul className="mt-2 space-y-1 px-6">
                    {Array(5)
                        .fill("Projects of web")
                        .map((item, index) => (
                            <li key={index} className="text-gray-700 text-sm">
                                {item}
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <div className="py-4 px-6 ">
                    <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700"><BiSupport className='size-5' />Support</div>
                    <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700"><PiNewspaper className='size-5'/>What’s new</div>
                    <div className="flex items-center gap-2 font-semibold text-gray-700"><MdOutlinePrivacyTip className='size-5' />Privacy Policy</div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar