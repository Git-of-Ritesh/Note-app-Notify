import React from 'react'
import { HiOutlineTemplate } from "react-icons/hi"
import { TbFileImport } from "react-icons/tb"
import { RiDeleteBin5Line } from "react-icons/ri"
import { BiSupport } from "react-icons/bi"
import { PiNewspaper } from "react-icons/pi"
import { MdOutlinePrivacyTip } from "react-icons/md";

const Sidebar = () => {
    return (
        <aside className="mt-3 h-full w-60 pb-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 py-2 px-6 font-bold text-gray-700"><HiOutlineTemplate />Templates</div>
                <div className="flex items-center gap-2 py-2 px-6 font-bold text-gray-700"><TbFileImport />Import</div>
                <div className="flex items-center gap-2 py-2 px-6 font-bold text-gray-700"><RiDeleteBin5Line />Trash</div>
            </div>

            <div>
                <div className="mt-8 px-6 font-bold text-gray-500 text-sm">Recently viewed</div>
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
                    <div className="flex items-center gap-2 mb-2 text-gray-700"><BiSupport />Support</div>
                    <div className="flex items-center gap-2 mb-2 text-gray-700"><PiNewspaper />What’s new</div>
                    <div className="flex items-center gap-2 text-gray-700"><MdOutlinePrivacyTip />Privacy Policy</div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar