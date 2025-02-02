import { useState, useRef } from "react";
import { FiBold, FiItalic, FiUnderline,  FiList, FiTrash, FiSave, FiX } from "react-icons/fi";

const NoteEditor = ({ onClose }) => {

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-3xl ">

      <div className="flex justify-between">

        {/* Title Input */}
        <input
          type="text"
          className="w-full text-2xl font-bold p-2 border-b border-gray-300 focus:outline-none"
          placeholder="Enter title..."
        />

        {/* Close Button */}
        <button onClick={onClose} className=" p-2 rounded-md text-gray-500 hover:bg-gray-200">
          <FiX className="size-5" />
        </button>

      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b pb-2 mb-4 mt-2">
        <div className="flex gap-2">
          <button  className="p-2 rounded-md hover:bg-gray-200"><FiBold className="size-5" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiItalic className="size-5" /></button>
          <button  className="p-2 rounded-md hover:bg-gray-200"><FiUnderline className="size-5" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiList className="size-5" /></button>
        </div>
        <div className="flex gap-2">
          <button  className="p-2 rounded-md text-gray-500 hover:bg-red-200"><FiTrash className="size-5" /></button>
          <button  className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500"><FiSave className="size-5" /></button>
        </div>
      </div>

      {/* Editable Content Area */}
      <div
        className="w-full h-full flex-grow p-4 text-gray-800 focus:outline-none border border-gray-300 rounded-2xl overflow-y-auto  shadow-inner">
        <textarea
          className="w-full h-full p-2  outline-none resize-none"
          placeholder="Your text here"
          rows="1"
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
