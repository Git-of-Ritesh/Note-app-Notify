import React from 'react'

const Tagcard = ({ tags, isSelected }) => {

  return (
      <div className="flex items-center overflow-x-auto gap-2">
          {tags && tags.length > 0 ? (
               tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className={`flex px-2 py-1 rounded-md text-xs font-normal ${isSelected ? "bg-white text-black" : "bg-gray-200 text-gray-700"}`}>
                      {tag}
                  </span>
              ))
          ) : (
              <span className="text-gray-400 text-sm">No tags</span> // Handle empty case
          )}
      </div>
  );
};

export default Tagcard;