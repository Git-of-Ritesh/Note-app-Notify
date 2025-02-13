import { useState, useEffect, useRef } from "react";
import { FiBold, FiItalic, FiUnderline, FiList, FiTrash, FiSave, FiX } from "react-icons/fi";
import axios from "axios"
import { FiPlus } from "react-icons/fi"
import { FiChevronDown, FiSidebar, FiMaximize2, FiMinimize2, FiLink2 } from "react-icons/fi";
import { TiPinOutline, TiPin } from "react-icons/ti";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";



const NoteEditor = ({ onClose, getAllNotes, selectedNote, noteClose }) => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [inputTag, setInputTag] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [error, setError] = useState(null)
  const [maximaize, setMaximaize] = useState(false)


  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags || []);
      setIsPinned(selectedNote.isPinned || false);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
      setIsPinned(false)
    }
  }, [selectedNote]);


  // tongle pin
  const togglePin = () => {
    setIsPinned((prev) => {
      const newPinState = !prev;
      console.log("Toggled isPinned:", newPinState);  // ✅ Log the new state here
      return newPinState;
    });
  };

  // add tag
  const handleAddTag = () => {
    if (inputTag.trim() !== " " && !tags.includes(inputTag.trim())) {
      setTags([...tags, inputTag.trim()])
      setInputTag("")
    }
  }

  // delete tag
  const handleDeleteTag = (index) => {
    const updateTags = tags.filter((_, i) => i !== index)
    setTags(updateTags)
  }

  //delete note
  const deleteNote = async () => {

    if (!selectedNote?._id) {
      console.error("Error: Note ID is missing!");
      setError("Note ID is missing!");
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:3000/api/note/delete-note/${selectedNote._id}`, { withCredentials: true })

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

  //consfirm delete
  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote();
    }
  };

  // edit note
  const editNote = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/note/edit-note/${selectedNote._id}`, { title, content, tags, isPinned }, { withCredentials: true })

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
      const res = await axios.post("http://localhost:3000/api/note/add-note", { title, content, tags, isPinned }, { withCredentials: true })

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      getAllNotes()
      onClose()

      setTitle("");
      setContent("");
      setIsPinned(false);
      setTags([]);


    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-white  rounded-3xl pb-4 ">

      <div className="flex justify-between items-center border-b">
        <div className="flex items-center gap-x-3 px-4 py-4">
          <button className="hover:bg-gray-200 rounded-md p-1" onClick={noteClose}><FiSidebar /></button>
          <div className="border-l px-3">
            <Breadcrumbs selectedNote={selectedNote} />
          </div>
        </div>
        <div className="px-2">
          {/* maximaize button */}
          <button onClick={() => setMaximaize(!maximaize)} className="p-2 rounded-md text-gray-950 hover:bg-gray-200">{maximaize ? <FiMinimize2 /> : <FiMaximize2 />}</button>
          {/* Close Button */}
          <button onClick={onClose} className=" p-2 rounded-md text-gray-950 hover:bg-gray-200">
            <FiX className="size-4" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b px-2 py-2 ">
        <div className="flex gap-2">
          <button className="p-2 rounded-md hover:bg-gray-200"><FiBold className="size-4" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiItalic className="size-4" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiUnderline className="size-4" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiList className="size-4" /></button>
          <button className="p-2 rounded-md hover:bg-gray-200"><FiLink2 className="size-4" /></button>
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded-md hover:bg-gray-200" onClick={togglePin}>
            {isPinned ? <TiPin className="size-5" /> : <TiPinOutline className="size-5" />}
          </button>
          <button className="px-2 py-1 rounded-md hover:bg-gray-200" onClick={confirmDelete} ><FiTrash className="size-4" /></button>
          <button className="flex items-center px-2 py-1 gap-2 text-sm font-light rounded-md text-white bg-gray-950"
            onClick={selectedNote ? editNote : addNote}  ><FiSave className="size-4" /> {selectedNote ? "Update" : "Save"}</button>
        </div>
      </div>

      <div className={`flex py-3 ${maximaize ? "px-3" : "px-52"}`}>
        {/* Title Input */}
        <input
          type="text"
          className="w-full text-3xl font-bold focus:outline-none"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* tag and category */}
      <div className={`flex py-3 gap-2 ${maximaize ? "px-3" : "px-52"}`}>
        <div className="flex items-center border py-1 px-2 rounded-md">
          <input className="focus:outline-none text-sm"
            type="text" placeholder="Add tags..."
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)} />
          <button onClick={handleAddTag}><FiPlus /></button>
        </div>
      </div>

      {/* Display Added Tags */}
      <div className={`flex flex-wrap gap-2 ${maximaize ? "px-3" : "px-52"}`}>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-gray-200 py-1 px-2 rounded-md">
            <span className="text-sm font-normal">{tag}</span>
            <button onClick={() => handleDeleteTag(index)} className="ml-2 text-black"><FiX className="size-4" /></button>
          </div>
        ))}
      </div>

      {/* Editable Content Area */}
      <div
        className="w-full h-full flex-grow text-gray-700 focus:outline-none overflow-y-auto ">

        <textarea
          className={`w-full h-full py-3 font-normal outline-none resize-none ${maximaize ? "px-3" : "px-52"}`}
        placeholder="Your text here"
        rows="1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ></textarea>

    </div>
    </div >
  );
};


export default NoteEditor;
