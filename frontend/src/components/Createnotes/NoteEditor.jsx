import { useState, useEffect, useRef } from "react";
import { FiBold, FiItalic, FiUnderline, FiList, FiTrash, FiSave, FiX, FiChevronRight } from "react-icons/fi";
import axios from "axios"
import { FiPlus } from "react-icons/fi"
import { FiChevronDown, FiSidebar, FiMaximize2, FiMinimize2, FiLink2, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight, FiTable } from "react-icons/fi";
import { PiHighlighterFill, PiColumnsDuotone, PiRectangleDuotone, PiTextAa, PiDotsThreeCircleVertical } from "react-icons/pi";
import { TiPinOutline, TiPin } from "react-icons/ti";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import TextEditor from "../TextEditor/TextEditor";
import { BsBlockquoteLeft, BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import { VscHorizontalRule } from "react-icons/vsc";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { RiCodeSSlashFill } from "react-icons/ri";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { TbTableOff, TbTableRow, TbTableColumn, TbRowRemove, TbColumnRemove } from "react-icons/tb";
import { AiOutlineMergeCells, AiOutlineSplitCells } from "react-icons/ai";
import { LuHeading } from "react-icons/lu";
import { CiBoxList, CiViewTable } from "react-icons/ci";
import { toast } from "react-toastify";




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
  const [headerButtonOpen, setHeaderButtonOpen] = useState(false);
  const [listButtonOpen, setListButtonOpen] = useState(false);
  const [alignButtonOpen, setAlignButtonOpen] = useState(false);
  const [toolButtonOpen, setToolButtonOpen] = useState(false);
  const [optionButtonOpen, setOptionButtonOpen] = useState(false);
  const [aaButtonOpen, setAaButtonOpen] = useState(false);
  const [mobileOptionButtonOpen, setMobileOptionButtonOpen] = useState(false);
  const [mobileTableOpen, setMobileTableOpen] = useState(false);
  const dropdownRef = useRef(null);
  const NoteCreatedNotify = () => toast('Note Creted 📋', {
    className: "w-[350px] rounded-2xl bg-gray-100/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
    hideProgressBar: true,
    autoClose: 800,
  })

  const NoteEditedNotify = () => toast('Note Edited 📋', {
    className: "w-[350px] rounded-2xl bg-gray-100/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
    hideProgressBar: true,
    autoClose: 800,
  })

  const NoteDeletedNotify = () => toast('Note Deleted ⚰️', {
    className: "w-[350px] rounded-2xl bg-white/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
    hideProgressBar: true,
    autoClose: 800,
  })

  const NoteTrashNotify = () => toast('Note Moved to trash 🗑️', {
    className: "w-[350px] rounded-2xl bg-white/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
    hideProgressBar: true,
    autoClose: 800,
  })

  const NotePinnedNotify = () => toast('Note is Pinned 📌', {
    className: "w-[350px] rounded-2xl bg-white/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
    hideProgressBar: true,
    autoClose: 800,
  })

  const NoteUnpinnedNotify = () => toast('Note is Unpinned 📌', {
    className: "w-[350px] rounded-2xl bg-white/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
    hideProgressBar: true,
    autoClose: 800,
  })

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
    if (activeTab === 'all') {
      return <p>All Notes</p>;
    }
    else if (activeTab === 'pinned') {
      return <p>Pinned Notes</p>
    }
    else if (activeTab === 'trash') {
      return <p>Trash Notes</p>
    }
    else {
      return <p>All Notes</p>
    }
  }

  // Bold toggle
  const toggleHandleBold = () => {
    editorRef.current?.toggleBold();
    setIsBold(editorRef.current?.isActive('bold'));
  }

  // toggle Italic
  const toggleHandleItalic = () => {
    editorRef.current?.toggleItalic();
    setIsItalic(editorRef.current?.isActive('italic'));
  }


  // tongle pin
  const togglePin = () => {
    setIsPinned((prev) => {
      const newPinState = !prev;
      isPinned ? NoteUnpinnedNotify() : NotePinnedNotify();
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
      const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
      const res = await axios.put(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/move-to-trash/${selectedNote._id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      await getAllNotes();
      NoteTrashNotify()
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
      const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
      const res = await axios.delete(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/delete-note/${selectedNote._id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})

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
      NoteDeletedNotify();
    }
  };

  // edit note
  const editNote = async () => {
    try {
      const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
      const res = await axios.post(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/edit-note/${selectedNote._id}`, { title, content, tags, isPinned }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      getAllNotes()
      onClose()
      NoteEditedNotify()

    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  // add note
  const addNote = async () => {
    try {
      const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
      const res = await axios.post(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/note/add-note`, { title, content, tags, isPinned }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        return
      }

      getAllNotes()
      onClose()
      NoteCreatedNotify()

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
    <div className="flex flex-col w-full h-dvh sm:h-screen bg-white  rounded-3xl">

      {/* Top section of editor */}
      <div className="flex justify-between items-center border-b">

        {/* Notepage open/close button & Breadcrumbs */}
        <div className="flex items-center gap-x-3 px-4 py-4">
          <button className="hidden sm:block hover:bg-gray-200 rounded-md p-1" onClick={noteClose}><FiSidebar /></button>
          <div className="sm:border-l px-3">
            <Breadcrumbs selectedNote={selectedNote} confirmTab={confirmTab} />
          </div>
        </div>

        <div className="flex px-2">
          {/* maximaize button */}
          <button onClick={() => setMaximaize(!maximaize)} className="hidden sm:block p-2 rounded-md text-gray-950 hover:bg-gray-200">{maximaize ? <FiMinimize2 /> : <FiMaximize2 />}</button>

          {/* mobile option button */}
          <button onClick={() => setMobileOptionButtonOpen((prev) => !prev)} className={`block sm:hidden relative`}><PiDotsThreeCircleVertical className={`size-6 ${mobileOptionButtonOpen ? "text-gray-400" : ""}`} />
            {mobileOptionButtonOpen && (
              <div className="absolute z-50 flex-col -right-[140%] top-full mt-1 bg-white border border-gray-400 shadow-md rounded-lg p-2 ">
                <button className="flex gap-x-2 items-center px-2 py-1 gap-2 text-sm font-light text-blue-600 rounded-md "
                  onClick={selectedNote ? editNote : addNote}  ><FiSave className="size-4" /> {selectedNote ? "Update" : "Save"}</button>
                <hr className="my-1" />
                <button className="flex gap-x-2 items-center px-2 py-1 w-full gap-2 text-sm font-light rounded-md" onClick= {togglePin}>
                  {isPinned ? <TiPin className="size-5" /> : <TiPinOutline className="size-5" />}
                  Pin</button>
                <hr className="my-1" />
                <button className="flex gap-x-2 px-2 py-1 text-sm font-light text-red-500 rounded-md " onClick={() => (activeTab === 'trash' ? confirmDelete() : trashNote())}  ><FiTrash className="size-4" />Trash</button>
              </div>
            )}
          </button>

          {/* Close Button */}
          <button onClick={onClose} className=" p-2 rounded-md text-gray-950 sm:hover:bg-gray-200">
            <FiX className="size-5 sm:size-4" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-around sm:justify-between border-b px-3 py-2 ">

        <div className="hidden sm:flex gap-2">

          <button onClick={toggleHandleBold} className={`hidden sm:block p-2 rounded-md hover:bg-gray-200 ${isBold ? "bg-gray-300" : ""}`} ><FiBold className="size-4" /></button>

          <button onClick={toggleHandleItalic} className={`hidden sm:block p-2 rounded-md hover:bg-gray-200 ${isItalic ? "bg-gray-300" : ""}`}><FiItalic className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleUnderline()} className="hidden sm:block p-2 rounded-md hover:bg-gray-200"><FiUnderline className="size-4" /></button>

          <button onClick={() => setHeaderButtonOpen(!headerButtonOpen)} className="relative hidden sm:block group p-2 rounded-md hover:bg-gray-200"><LuHeading className="size-4" />
            {headerButtonOpen && (
              <div className="absolute top-full left-0 mt-3 flex flex-col bg-white shadow-md rounded-lg transition-opacity duration-200 border border-gray-300 p-1 z-10 ">

                <button onClick={() => editorRef.current?.toggleHeadingL1()} className="p-1  text-2xl rounded-md hover:bg-gray-200">Heading</button>

                <hr className="my-1" />

                <button onClick={() => editorRef.current?.toggleHeadingL2()} className="p-1 text-xl rounded-md hover:bg-gray-200">Heading</button>
                <hr className="my-1" />

                <button onClick={() => editorRef.current?.toggleHeadingL3()} className="p-1 text-lg rounded-md hover:bg-gray-200">Heading</button>

              </div>
            )}
          </button>

          <button onClick={() => setListButtonOpen(!listButtonOpen)} className="relative hidden sm:block group p-2 rounded-md hover:bg-gray-200" ><FiList className="size-4" />
            {listButtonOpen && (
              <div className="absolute top-full left-0 mt-3 flex-col w-36 bg-white shadow-md rounded-lg transition-opacity duration-200 border border-gray-300 p-1 z-10 ">
                <button onClick={() => editorRef.current?.toggleBulletList()} className="flex items-center text-sm w-full gap-x-1 p-1 rounded-md hover:bg-gray-200"><FiList className="size-4" />Bulleted list</button>
                <hr className="my-1" />

                <button onClick={() => editorRef.current?.toggleOrderedList()} className="flex items-center text-sm w-full gap-x-1 p-1 rounded-md hover:bg-gray-200"><MdOutlineFormatListNumbered className="size-4" />Ordered list</button>
              </div>
            )}
          </button>

          <button onClick={() => setAlignButtonOpen(!alignButtonOpen)} className="relative hidden sm:block group p-2 rounded-md hover:bg-gray-200"><FiAlignCenter className="size-4" />
            {alignButtonOpen && (
              <div className="absolute top-full left-0 mt-3 flex-col bg-white shadow-md rounded-lg transition-opacity duration-200 border border-gray-300 p-1 z-10">
                <button onClick={() => editorRef.current?.setTextAlignLeft()} className="flex w-full text-sm items-center gap-x-2 p-1 rounded-md hover:bg-gray-200"><FiAlignLeft className="size-4" />Left</button>
                <hr className="my-1" />

                <button onClick={() => editorRef.current?.setTextAlignCenter()} className="flex items-center text-sm gap-x-2 p-1 rounded-md hover:bg-gray-200"><FiAlignCenter className="size-4" />Center</button>
                <hr className="my-1" />

                <button onClick={() => editorRef.current?.setTextAlignRight()} className="flex w-full text-sm items-center gap-x-2 p-1 rounded-md hover:bg-gray-200"><FiAlignRight className="size-4" />Right</button>
              </div>
            )}
          </button>

          <button ref={dropdownRef} onClick={() => setIsTableOpen(!isTableOpen)} className="relative hidden sm:block group p-2 rounded-md hover:bg-gray-200"><FiTable className="size-4" />

            {isTableOpen && (
              <div className="absolute top-full left-0 w-44 mt-3 flex flex-col bg-white shadow-md rounded-lg transition-opacity duration-200 border border-gray-300 p-1 z-10">

                {/* add table */}
                <button onClick={() => editorRef.current?.insertTable()} className="py-1 px-2 text-sm text-left text-blue-500 rounded-md hover:bg-gray-200">Add table</button>
                <hr className="my-1" />

                {/* insert row */}
                <div className="flex items-center justify-between text-sm px-2">Row
                  <div>
                    <button onClick={() => editorRef.current?.addRowAfter()} className="p-2 rounded-md hover:bg-blue-100"><FiPlus className="size-4" /></button>

                    {/* delete row */}
                    <button onClick={() => editorRef.current?.deleteRow()} className="p-2 rounded-md hover:bg-red-100"><FiTrash className="size-4" /></button>
                  </div>
                </div>
                <hr className="my-1" />

                {/* insert coloum */}
                <div className="flex items-center justify-between text-sm px-2" >Column
                  <div>
                    <button onClick={() => editorRef.current?.addColumnAfter()} className="p-2 rounded-md hover:bg-blue-100"><FiPlus className="size-4" /></button>

                    {/* delete coloum */}
                    <button onClick={() => editorRef.current?.deleteColumn()} className="p-2 rounded-md hover:bg-red-100"><FiTrash className="size-4" /></button>
                  </div>
                </div>
                <hr className="my-1" />

                {/* merge cell */}
                <button onClick={() => editorRef.current?.mergeCells()} className="py-1 px-2 text-sm text-left rounded-md hover:bg-gray-200">Merge cells</button>
                <hr className="my-1" />

                {/* split cell */}
                <button onClick={() => editorRef.current?.splitCell()} className="py-1 px-2 text-sm text-left rounded-md hover:bg-gray-200">Split cells</button>
                <hr className="my-1" />

                {/* toggle header coloum */}
                <button onClick={() => editorRef.current?.toggleHeaderColumn()} className="py-1 px-2 text-sm text-left rounded-md hover:bg-gray-200">Header column</button>
                <hr className="my-1" />

                {/* header cell */}
                <button onClick={() => editorRef.current?.toggleHeaderCell()} className="py-1 px-2 text-sm text-left rounded-md hover:bg-gray-200">Header cells</button>
                <hr className="my-1" />

                {/* delete table */}
                <button onClick={() => editorRef.current?.deleteTable()} className="py-1 px-2 text-sm text-left text-red-500 rounded-md hover:bg-gray-200">Delete table</button>

              </div>
            )}
          </button>


          <button onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editorRef.current?.setLink(url);
          }} className="hidden sm:block p-2 rounded-md hover:bg-gray-200"><FiLink2 className="size-4" /></button>

          <button onClick={() => { console.log("toggled"), editorRef.current?.toggleHighlight() }} className="hidden sm:block p-2 rounded-md hover:bg-gray-200"><PiHighlighterFill className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleBlockquote()} className="hidden sm:block p-1 rounded-md hover:bg-gray-200"><BsBlockquoteLeft className="size-5" /></button>

          <button onClick={() => editorRef.current?.setHorizontalRule()} className="hidden sm:block p-1 rounded-md hover:bg-gray-200"><VscHorizontalRule className="size-5" /></button>

          <button onClick={() => editorRef.current?.toggleCodeBlock()} className="hidden sm:block p-2 rounded-md hover:bg-gray-200"><RiCodeSSlashFill className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleStrike()} className="hidden sm:block p-2 rounded-md hover:bg-gray-200"><AiOutlineStrikethrough className="size-4" /></button>

          <button onClick={() => editorRef.current?.addImage()} className="hidden sm:block p-2 rounded-md hover:bg-gray-200"><FiImage className="size-4" /></button>

          <button onClick={() => editorRef.current?.toggleTaskList()} className="hidden sm:block p-1  rounded-md hover:bg-gray-200"><GoTasklist className="size-5" /></button>

        </div>

        {/* mobile all buttons */}
        <button onClick={() => setAaButtonOpen(!aaButtonOpen)} className="block sm:hidden relative" ><PiTextAa className="size-5" />

          {aaButtonOpen && (
            <div className="absolute z-50 flex-col space-y-2 -left-[150%] top-full mt-5 bg-white border border-gray-300 shadow-md rounded-lg p-2 ">

              <div className="flex">
                <button onClick={() => editorRef.current?.toggleHeadingL1()} className="px-3 rounded-md text-2xl">Heading</button>

                <button onClick={() => editorRef.current?.toggleHeadingL2()} className="px-3 rounded-md text-xl">Body</button>

                <button onClick={() => editorRef.current?.toggleHeadingL3()} className="px-3 rounded-md text-lg">text</button>
              </div>

              <div className="flex justify-between">

                <div className="bg-gray-200 rounded-md">
                  <button onClick={toggleHandleBold} className={`py-2 px-3  border-r border-gray-400  ${isBold ? "bg-gray-300" : ""}`} ><FiBold className="size-4" /></button>

                  <button onClick={toggleHandleItalic} className={`py-2 px-3 border-r border-gray-400  ${isItalic ? "bg-gray-300" : ""}`}><FiItalic className="size-4" /></button>

                  <button onClick={() => editorRef.current?.toggleUnderline()} className="py-2 px-3 rounded-md "><FiUnderline className="size-4" /></button>
                </div>

                <button onClick={() => editorRef.current?.toggleBulletList()} className="p-2 rounded-md bg-gray-200"><FiList className="size-4" /></button>

                <div className="bg-gray-200 rounded-md">
                  <button onClick={() => { console.log("toggled"), editorRef.current?.toggleHighlight() }} className="p-2 border-r border-gray-400 "><PiHighlighterFill className="size-4" /></button>

                  <button onClick={() => editorRef.current?.toggleBlockquote()} className="p-2 "><BsBlockquoteLeft className="size-4" /></button>
                </div>

              </div>

              <div className="flex justify-between">

                <div className="bg-gray-200 rounded-md">
                  <button onClick={() => editorRef.current?.setTextAlignLeft()} className="py-2 px-3 border-r border-gray-400 "><FiAlignLeft className="size-4" /></button>

                  <button onClick={() => editorRef.current?.setTextAlignCenter()} className="py-2 px-3 border-r border-gray-400 "><FiAlignCenter className="size-4" /></button>

                  <button onClick={() => editorRef.current?.setTextAlignRight()} className="py-2 px-3 rounded-md "><FiAlignRight className="size-4" /></button>
                </div>

                <button onClick={() => editorRef.current?.toggleOrderedList()} className="p-2 rounded-md bg-gray-200"><MdOutlineFormatListNumbered className="size-4" /></button>

                <div className="bg-gray-200 rounded-md">
                  <button onClick={() => editorRef.current?.toggleStrike()} className="p-2 border-r border-gray-400 "><AiOutlineStrikethrough className="size-4" /></button>

                  <button onClick={() => editorRef.current?.setHorizontalRule()} className="p-2 "><VscHorizontalRule className="size-4" /></button>
                </div>

              </div>

            </div>
          )}
        </button>

        {/* mobile check box button */}
        <button onClick={() => editorRef.current?.toggleTaskList()} className="block sm:hidden" ><CiBoxList className="size-6" /></button>

        {/* mobile table button */}
        <button onClick={() => setMobileTableOpen(!mobileTableOpen)} className="block sm:hidden relative"><CiViewTable className="size-6" />

          {mobileTableOpen && (
            <div className="absolute flex flex-col z-50 space-y-1 w-44 top-full left-0 mt-4 border p-1 rounded-md shadow-md  bg-white ">

              <button onClick={() => editorRef.current?.insertTable()} className="p-2 text-left text-blue-500">Add Table</button>

              <div className="flex justify-between px-2">Row
                <div className="flex bg-gray-200 rounded-md">
                  <button onClick={() => editorRef.current?.addRowAfter()} className="p-2 border-r border-gray-400 "><FiPlus /></button>
                  <button onClick={() => editorRef.current?.deleteRow()} className="p-2"><FiX /></button>

                </div>
              </div>

              <div className="flex justify-between px-2 ">Coloum
                <div className="flex  bg-gray-200 rounded-md ">
                  <button onClick={() => editorRef.current?.addColumnAfter()} className="p-2 border-r border-gray-400 "><FiPlus /></button>

                  <button onClick={() => editorRef.current?.deleteColumn()} className="p-2 "><FiX /></button>
                </div>
              </div>

              <button onClick={() => editorRef.current?.toggleHeaderColumn()} className="p-2 text-left">Header column</button>

              <button onClick={() => editorRef.current?.toggleHeaderCell()} className="p-2 text-left">Header cell</button>

              <button onClick={() => editorRef.current?.deleteTable()} className="p-2 text-left text-red-600">Delete table</button>

            </div>
          )}
        </button>

        <button onClick={() => editorRef.current?.toggleCodeBlock()} className="sm:hidden flex items-center gap-x-2 rounded-md hover:bg-gray-200"><RiCodeSSlashFill className="size-5 text-gray-600" style={{ strokeWidth: 0.1 }}/></button>

        <button onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editorRef.current?.setLink(url);
          }} className="sm:hidden block rounded-md hover:bg-gray-200"><FiLink2 className="size-5" style={{strokeWidth: 1.4}} /></button>

        <button onClick={() => editorRef.current?.addImage()} className="sm:hidden flex items-center gap-x-2 rounded-md hover:bg-gray-200"><FiImage className="size-5" style={{strokeWidth: 1.2}} /></button>

        <div className="hidden sm:flex gap-2">
          <button onClick={() => setOptionButtonOpen(!optionButtonOpen)} className={` relative flex gap-x-2 text-sm border justify-center items-center py-1 px-3 rounded-md 
            ${optionButtonOpen ? ' border-gray-300 ' : 'border-gray-400'}`}><FiChevronRight className={`size-4 ${optionButtonOpen ? 'rotate-90' : ''}`} />Options
            {optionButtonOpen && (
              <div className={`absolute top-full w-24 left-0 mt-4 flex flex-col bg-white shadow-md rounded-lg  border  border-gray-300 p-1 z-10 transition-transform duration-500 origin-top ${optionButtonOpen ? 'opacity-100 scale-100 visible' : 'invisible scale-0'
                }`}>
                <button className="flex gap-x-2 items-center px-2 py-1 gap-2 text-sm font-light rounded-md hover:bg-blue-100"
                  onClick={selectedNote ? editNote : addNote}  ><FiSave className="size-4" /> {selectedNote ? "Update" : "Save"}</button>
                <hr className="my-1" />
                <button className="flex gap-x-2 items-center px-2 py-1 gap-2 text-sm font-light rounded-md  hover:bg-gray-200" onClick={togglePin}>
                  {isPinned ? <TiPin className="size-5" /> : <TiPinOutline className="size-5" />}
                  Pin</button>
                <hr className="my-1" />
                <button className="flex gap-x-2 px-2 py-1 text-sm font-light rounded-md hover:bg-red-200" onClick={() => (activeTab === 'trash' ? confirmDelete() : trashNote())}  ><FiTrash className="size-4" />Trash</button>
              </div>
            )}
          </button>
        </div>
      </div>


      {/* Editor space */}
      <div className={`flex flex-col ${maximaize ? "px-8" : "px-5 sm:px-52"} overflow-y-auto `}>

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
          <div className={`w-full flex-grow pb-5 sm:pb-0 `}>
            <TextEditor ref={editorRef} content={content} onChange={setContent} />
          </div>
        </div>

      </div>
    </div >
  );
};


export default NoteEditor;