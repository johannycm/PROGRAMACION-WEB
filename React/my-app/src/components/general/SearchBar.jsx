import React from "react";

function SearchBar({ onSearch }) {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Buscar películas..."
        onChange={handleSearch}
        className="w-3/4 p-2 border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
