import { useState, useEffect } from "react";
import { FiBold, FiItalic, FiUnderline, FiList, FiTrash, FiSave, FiX } from "react-icons/fi";
import axios from "axios"

const NoteEditor = ({ onClose, getAllNotes, selectedNote }) => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  //delete note
  const deleteNote = async () => {}

  // edit note
  const editNote = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/note/edit-note/${selectedNote._id}`, { title, content }, { withCredentials: true })

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      getAllNotes()
      onClose()

    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  // add note
  const addNote = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/note/add-note", { title, content }, { withCredentials: true })

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      getAllNotes()
      onClose()


    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

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
          <button className="flex items-center py-2 px-3 gap-2 rounded-xl text-white bg-my-yellow hover:bg-yellow-500"
            onClick={selectedNote ? editNote : addNote}  ><FiSave className="size-5" /> {selectedNote ? "Update" : "Save"}</button>
        </div>
      </div>

      <div className="flex justify-between px-3 py-3">

        {/* Title Input */}
        <input
          type="text"
          className="w-full text-2xl font-bold focus:outline-none"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
