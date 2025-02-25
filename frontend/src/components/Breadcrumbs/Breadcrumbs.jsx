import { FiChevronRight } from "react-icons/fi";

const Breadcrumbs = ({ selectedNote, confirmTab }) => {

  return (
    <nav className="text-xs sm:text-sm flex items-center space-x-2 text-gray-600">

      <h1 className=" text-gray-500">{confirmTab}</h1>

      {selectedNote && (
        <>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-800 sm:hidden">{selectedNote.title.length > 22 ? selectedNote.title.slice(0, 22) + '...' : selectedNote.title}</span>
          <span className="text-gray-800 hidden sm:block">{selectedNote.title}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
