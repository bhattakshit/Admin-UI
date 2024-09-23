import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../Store/slice'; // Make sure to create this action

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value)); // Dispatch the search query to the store
  };

  return (
    <div className='w-full bg-blue-800 text-center rounded-md mb-2'>
      <input
        type="search"
        placeholder="Search by name, email or role"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-300"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
