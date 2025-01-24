import React from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { RiSaveLine } from "react-icons/ri"
import { RxCross2 } from "react-icons/rx"
import { MdOutlineDeleteOutline } from "react-icons/md"

const CreateNote = ({ value, onChange, onClose }) => {
    const toolbarOptions = [['bold', 'italic', 'underline', 'strike', 'link', 'image'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['clean'], ['code-block'], [{ 'header': '1' }, { 'header': '2' }], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'direction': 'rtl' }], [{ 'size': ['small', false, 'large', 'huge'] }], [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }], [{ 'align': [] }]];

    const modules = {
        toolbar: toolbarOptions
    };
    return (
        <div className='h-screen flex flex-col pl-2'>
            <header className='flex items-center justify-between w-full my-6 gap-4'>
                <button className='flex items-center gap-1 bg-my-grey p-2 px-4 shadow-md drop-shadow-lg rounded-2xl'><RiSaveLine />Save</button>

                <div className='flex items-center gap-2'>
                    <button className='flex items-center '><MdOutlineDeleteOutline className='size-6' /></button>
                    <button onClick={() => { console.log("Close button clicked!"); onClose(); }}><RxCross2 className='size-5' /></button>
                </div>

            </header>

            <input className='text-3xl font-bold my-3 outline-none border-none bg-transparent p-0 focus:ring-0' type="text" placeholder='New Title' autoFocus />

            <div className='flex-1 overflow-hidden'>
                <ReactQuill
                    modules={modules}
                    value={value}
                    onChange={onChange}
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}

export default CreateNote