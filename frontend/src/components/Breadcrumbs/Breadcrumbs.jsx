import { FiChevronRight } from "react-icons/fi";

const Breadcrumbs = ({ selectedNote, renderTabs }) => {

  return (
    <nav className="text-sm flex items-center space-x-2 text-gray-600">

      <h1 className="text-gray-500">{renderTabs()}</h1>
      
      {selectedNote && (
        <>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-800">{selectedNote.title}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
