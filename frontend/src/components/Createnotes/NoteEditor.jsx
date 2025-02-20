import { useState, useEffect, useRef } from "react";
import { FiBold, FiItalic, FiUnderline, FiList, FiTrash, FiSave, FiX } from "react-icons/fi";
import axios from "axios"
import { FiPlus } from "react-icons/fi"
import { FiChevronDown, FiSidebar, FiMaximize2, FiMinimize2, FiLink2, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight, FiTable } from "react-icons/fi";
import { PiHighlighterFill, PiColumnsDuotone, PiRectangleDuotone } from "react-icons/pi";
import { TiPinOutline, TiPin } from "react-icons/ti";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import TextEditor from "../TextEditor/TextEditor";
import { BsBlockquoteLeft, BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import { VscHorizontalRule } from "react-icons/vsc";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { RiCodeSSlashFill } from "react-icons/ri";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { TbTableOff, TbTableRow, TbTableColumn, TbRowRemove, TbColumnRemove   } from "react-icons/tb";
import { AiOutlineMergeCells, AiOutlineSplitCells } from "react-icons/ai";




const NoteEditor = ({ onClose, getAllNotes, selectedNote, noteClose, activeTab }) => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [inputTag, setInputTag] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [error, setError] = useState(null)
  const [maximaize, setMaximaize] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const editorRef = useRef(null);

  const [isTableOpen, setIsTableOpen] = useState(false);
  const dropdownRef = useRef(null);

  //drop down of tables
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTableOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "<p></p>"); // Ensure content is set properly
      setTags(selectedNote.tags || []);
      setIsPinned(selectedNote.isPinned || false);
      handleConfirmTab();
    } else {
      setTitle("");
      setContent("<p></p>");
      setTags([]);
      setIsPinned(false);
    }
  }, [selectedNote]);

  // rendering tabs
  const [confirmTab, setConfirmTab] = useState("")

  // handle confirm tab
  const handleConfirmTab = () => {
    setConfirmTab(renderTabs())
  }

   // Rendering tabs
   const renderTabs = () => {
    if(activeTab === 'all'){
      return <p>All Notes</p>; 
    }
    else if(activeTab === 'pinned'){
      return <p>Pinned Notes</p>
    }
    else if(activeTab === 'trash'){
      return <p>Trash Notes</p>
    }
    else {
      return <p>All Notes</p>
    }
  }

  // Bold toggle
  const toggleHandleBold = () => { editorRef.current?.toggleBold(); 
    setIsBold(editorRef.current?.isActive('bold'));
  }

  // toggle Italic
  const toggleHandleItalic = () => { editorRef.current?.toggleItalic(); 
    setIsItalic(editorRef.current?.isActive('italic'));
  }


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

  //trash note
  const trashNote = async () => {
      if (!selectedNote?._id) {
        console.error("Error: Note ID is missing!");
        setError("Note ID is missing!");
        return;
      }
  
      try {
        const res = await axios.put(`http://localhost:3000/api/note/move-to-trash/${selectedNote._id}`,{}, { withCredentials: true })
  
        if (res.data.success === false) {
          console.log(res.data.message)
          setError(res.data.message)
          return
        }
  
        await getAllNotes(); 
        onClose()
  
      } catch (error) {
        console.log(error.message)
        setError(error.message)
      }
    }



  // delete note
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
    <div className="flex flex-col w-full h-screen bg-white  rounded-3xl ">

      <div className="flex justify-between items-center border-b">
        <div className="flex items-center gap-x-3 px-4 py-4">
          <button className="hover:bg-gray-200 rounded-md p-1" onClick={noteClose}><FiSidebar /></button>
          <div className="border-l px-3">
            <Breadcrumbs selectedNote={selectedNote} confirmTab={confirmTab} />
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
          <button onClick={toggleHandleBold} className={`p-2 rounded-md hover:bg-gray-200 ${isBold? "bg-gray-300" : ""}`} ><FiBold className="size-4" /></button>

          <button onClick={toggleHandleItalic} className={`p-2 rounded-md hover:bg-gray-200 ${isItalic ? "bg-gray-300" : ""}`}><FiItalic className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleUnderline()} className="p-2 rounded-md hover:bg-gray-200"><FiUnderline className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleBulletList()} className="p-2 rounded-md hover:bg-gray-200"><FiList className="size-4" /></button>

          <button onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editorRef.current?.setLink(url);
          }} className="p-2 rounded-md hover:bg-gray-200"><FiLink2 className="size-4" /></button>

          <button onClick={() => { console.log("toggled"), editorRef.current?.toggleHighlight() }} className="p-2 rounded-md hover:bg-gray-200"><PiHighlighterFill className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleBlockquote()} className="p-2 rounded-md hover:bg-gray-200"><BsBlockquoteLeft className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleHeadingL1()} className="p-2 rounded-md hover:bg-gray-200"><BsTypeH1 className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleHeadingL2()} className="p-2 rounded-md hover:bg-gray-200"><BsTypeH2 className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleHeadingL3()} className="p-2 rounded-md hover:bg-gray-200"><BsTypeH3 className="size-4" /></button>

          <button onClick={() => editorRef.current?.setHorizontalRule()} className="p-2 rounded-md hover:bg-gray-200"><VscHorizontalRule className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleOrderedList()} className="p-2 rounded-md hover:bg-gray-200"><MdOutlineFormatListNumbered className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleCodeBlock()} className="p-2 rounded-md hover:bg-gray-200"><RiCodeSSlashFill className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleStrike()} className="p-2 rounded-md hover:bg-gray-200"><AiOutlineStrikethrough className="size-4" /></button>

          <button onClick={() => editorRef.current?.addImage()} className="p-2 rounded-md hover:bg-gray-200"><FiImage className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleTaskList()} className="p-2 rounded-md hover:bg-gray-200"><GoTasklist className="size-4" /></button>

          <button onClick={() => editorRef.current?.setTextAlignLeft()} className="p-2 rounded-md hover:bg-gray-200"><FiAlignLeft className="size-4" /></button>

          <button onClick={() => editorRef.current?.setTextAlignCenter()} className="p-2 rounded-md hover:bg-gray-200"><FiAlignCenter className="size-4" /></button>

          <button onClick={() => editorRef.current?.setTextAlignRight()} className="p-2 rounded-md hover:bg-gray-200"><FiAlignRight className="size-4" /></button>

          <button ref={dropdownRef}  onClick={() => setIsTableOpen(!isTableOpen)} className="relative group p-2 rounded-md hover:bg-gray-200"><FiTable className="size-4" />

          {isTableOpen && (
          <div className="absolute top-full -left-40 mt-2 flex bg-white shadow-md rounded-lg transition-opacity duration-200 border border-gray-300 p-1 z-10">

            {/* add table */}
            <button onClick={() => editorRef.current?.insertTable()} className="p-2 rounded-md hover:bg-gray-200"><FiTable className="size-4" /></button>

            {/* insert row */}
            <button onClick={() => editorRef.current?.addRowAfter()} className="p-2 rounded-md hover:bg-gray-200"><TbTableRow className="size-4" /></button>

            {/* delete row */}
            <button onClick={() => editorRef.current?.deleteRow()} className="p-2 rounded-md hover:bg-gray-200"><TbRowRemove className="size-4" /></button>

            {/* insert coloum */}
            <button onClick={() => editorRef.current?.addColumnAfter()} className="p-2 rounded-md hover:bg-gray-200"><TbTableColumn className="size-4" /></button>

            {/* delete coloum */}
            <button onClick={() => editorRef.current?.deleteColumn()} className="p-2 rounded-md hover:bg-gray-200"><TbColumnRemove className="size-4" /></button>

            {/* merge cell */} 
            <button onClick={() => editorRef.current?.mergeCells()} className="p-2 rounded-md hover:bg-gray-200"><AiOutlineMergeCells className="size-4" /></button>

            {/* split cell */}
            <button onClick={() => editorRef.current?.splitCell()} className="p-2 rounded-md hover:bg-gray-200"><AiOutlineSplitCells className="size-4" /></button>

            {/* toggle header coloum */}
            <button onClick={() => editorRef.current?.toggleHeaderColumn()} className="p-2 rounded-md hover:bg-gray-200"><PiColumnsDuotone className="size-4" /></button>

            {/* header cell */}
            <button onClick={() => editorRef.current?.toggleHeaderCell()} className="p-2 rounded-md hover:bg-gray-200"><PiRectangleDuotone className="size-4" /></button>

            {/* delete table */}
            <button onClick={() => editorRef.current?.deleteTable()} className="p-2 rounded-md hover:bg-gray-200"><TbTableOff className="size-4" /></button>

          </div>
          )}
          </button>

          
        </div>

        <div className="flex gap-2">
          <button className="px-2 py-1 rounded-md hover:bg-gray-200" onClick={togglePin}>
            {isPinned ? <TiPin className="size-5" /> : <TiPinOutline className="size-5" />}
          </button>
          <button className="px-2 py-1 rounded-md hover:bg-gray-200" onClick={()=> (activeTab === 'trash' ? confirmDelete() : trashNote())}  ><FiTrash className="size-4" /></button>
          <button className="flex items-center px-2 py-1 gap-2 text-sm font-light rounded-md text-white bg-gray-950"
            onClick={selectedNote ? editNote : addNote}  ><FiSave className="size-4" /> {selectedNote ? "Update" : "Save"}</button>
        </div>
      </div>


      {/* Editor space */}
      <div className={`flex flex-col ${maximaize ? "px-3" : "px-52"} overflow-y-auto `}>

        <div className={`flex py-3 mt-9 `}>
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
        <div className={`flex py-3 gap-2 `}>
          <div className="flex items-center border py-1 px-2 rounded-md">
            <input className="focus:outline-none text-sm"
              type="text" placeholder="Add tags..."
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)} />
            <button onClick={handleAddTag}><FiPlus /></button>
          </div>
        </div>

        {/* Display Added Tags */}
        <div className={`flex flex-wrap gap-2 `}>
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center bg-gray-200 py-1 px-2 rounded-md">
              <span className="text-sm font-normal">{tag}</span>
              <button onClick={() => handleDeleteTag(index)} className="ml-2 text-black"><FiX className="size-4" /></button>
            </div>
          ))}
        </div>

        {/* Editable Content Area */}
        <div
          className="w-full h-full flex-grow text-gray-700  ">
          <div className={`w-full flex-grow `}>
            <TextEditor ref={editorRef} content={content} onChange={setContent} />
          </div>
        </div>

      </div>
    </div >
  );
};


export default NoteEditor;