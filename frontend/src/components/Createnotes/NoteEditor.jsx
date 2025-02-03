import { useState, useRef } from "react";
import { FiBold, FiItalic, FiUnderline, FiList, FiTrash, FiSave, FiX } from "react-icons/fi";

const NoteEditor = ({ onClose }) => {

  return (
    <div className="flex flex-col w-full h-full bg-white  rounded-3xl ">

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b px-2 py-3 ">
        <div className="flex gap-2">
          <button className="p-2 rounded-md hover:bg-gray-200"><FiBold className="size-5" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiItalic className="size-5" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiUnderline className="size-5" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiList className="size-5" /></button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center py-2 px-3 gap-2 rounded-xl border border-[#7D7B7B] text-[#4B4A4A] hover:bg-red-200"><FiTrash className="size-5" />Delete</button>
          <button className="flex items-center py-2 px-3 gap-2 rounded-xl text-white bg-my-yellow hover:bg-yellow-500"><FiSave className="size-5" />Save</button>
        </div>
      </div>

      <div className="flex justify-between px-3 py-3">

        {/* Title Input */}
        <input
          type="text"
          className="w-full text-2xl font-bold focus:outline-none"
          placeholder="Enter title..."
        />

        {/* Close Button */}
        <button onClick={onClose} className=" p-2 rounded-md text-gray-500 hover:bg-gray-200">
          <FiX className="size-5" />
        </button>

      </div>

      {/* Editable Content Area */}
      <div
        className="w-full h-full flex-grow  text-gray-800 focus:outline-none rounded-2xl overflow-y-auto ">
        <textarea
          className="w-full h-full p-3  outline-none resize-none"
          placeholder="Your text here"
          rows="1"
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
