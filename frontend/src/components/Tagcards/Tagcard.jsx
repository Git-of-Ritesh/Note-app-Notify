import React from 'react'

const Tagcard = ({ tags, isSelected }) => {
  
  return (
      <div className="flex flex-wrap gap-2">
          {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                  <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium ${isSelected ? "bg-white text-black" : "bg-gray-300 text-gray-700"}`}>
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